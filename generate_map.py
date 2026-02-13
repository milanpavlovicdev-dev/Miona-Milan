"""
Generate high-quality world map SVG from Natural Earth 50m GeoJSON data.
Uses Robinson projection calibrated to match existing city coordinates.
"""
import urllib.request
import ssl
import json
import math
import os
import sys

ssl_ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

GEOJSON_URL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson"
GEOJSON_FILE = "ne_50m.geojson"
OUTPUT_FILE = "map-data.js"
BACKUP_FILE = "map-data-backup.js"
SIMPLIFICATION_TOLERANCE = 0.35  # SVG pixels
MIN_POLYGON_AREA = 0.01  # SVG square pixels - skip tiny polygons

CX, SX, CY, SY = 986.59, 1017.16, 500.65, 517.14

ROB_TABLE = [
    (0,1.0,0.0),(5,0.9986,0.062),(10,0.9954,0.124),
    (15,0.99,0.186),(20,0.9822,0.248),(25,0.973,0.31),
    (30,0.96,0.372),(35,0.9427,0.434),(40,0.9216,0.4958),
    (45,0.8962,0.5571),(50,0.8679,0.6176),(55,0.835,0.6769),
    (60,0.7986,0.7346),(65,0.7597,0.7903),(70,0.7186,0.8435),
    (75,0.6732,0.8936),(80,0.6213,0.9394),(85,0.5722,0.9761),
    (90,0.5322,1.0),
]

NAME_MAP = {
    "United States of America": "United States",
    "Russia": "Russian Federation",
    "Czechia": "Czech Republic",
    "eSwatini": "Swaziland",
    "Côte d'Ivoire": "Ivory Coast",
    "Democratic Republic of the Congo": "Dem. Rep. Congo",
    "Republic of the Congo": "Congo",
    "Republic of Serbia": "Serbia",
    "The Bahamas": "Bahamas",
    "Bosnia and Herz.": "Bosnia and Herzegovina",
    "Dominican Rep.": "Dominican Republic",
    "Central African Rep.": "Central African Republic",
    "S. Sudan": "South Sudan",
    "Solomon Is.": "Solomon Islands",
    "Dem. Rep. Congo": "Democratic Republic of the Congo",
    "Falkland Is.": "Falkland Islands",
    "Fr. S. Antarctic Lands": "French Southern and Antarctic Lands",
    "N. Cyprus": "Northern Cyprus",
    "Timor-Leste": "East Timor",
}

def interp_robinson(abs_lat):
    abs_lat = min(abs_lat, 90)
    for i in range(len(ROB_TABLE) - 1):
        l0, p0, d0 = ROB_TABLE[i]
        l1, p1, d1 = ROB_TABLE[i + 1]
        if abs_lat <= l1:
            t = (abs_lat - l0) / (l1 - l0)
            return p0 + t * (p1 - p0), d0 + t * (d1 - d0)
    return ROB_TABLE[-1][1], ROB_TABLE[-1][2]

def project(lon, lat):
    lat = max(-89.99, min(89.99, lat))
    plen, pdfe = interp_robinson(abs(lat))
    x = CX + SX * plen * lon / 180.0
    sign = 1 if lat >= 0 else -1
    y = CY - SY * pdfe * sign
    return x, y

def point_line_dist(p, a, b):
    dx, dy = b[0] - a[0], b[1] - a[1]
    if dx == 0 and dy == 0:
        return math.hypot(p[0] - a[0], p[1] - a[1])
    t = max(0, min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)))
    return math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))

def dp_simplify(pts, tol):
    if len(pts) <= 2:
        return pts
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = point_line_dist(pts[i], pts[0], pts[-1])
        if d > dmax:
            dmax, idx = d, i
    if dmax > tol:
        left = dp_simplify(pts[:idx + 1], tol)
        right = dp_simplify(pts[idx:], tol)
        return left[:-1] + right
    return [pts[0], pts[-1]]

def polygon_svg_area(pts):
    """Signed area of projected polygon in SVG coords."""
    n = len(pts)
    a = 0
    for i in range(n):
        j = (i + 1) % n
        a += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]
    return abs(a) / 2

def ring_to_path(ring_coords, tolerance):
    """Convert a GeoJSON ring to projected, simplified SVG path points."""
    projected = []
    for coord in ring_coords:
        lon, lat = coord[0], coord[1]
        x, y = project(lon, lat)
        projected.append((x, y))

    if len(projected) > 3:
        projected = dp_simplify(projected, tolerance)

    return projected

def detect_antimeridian_crossing(ring_coords):
    """Check if a ring crosses the antimeridian (lon jump > 180)."""
    for i in range(len(ring_coords) - 1):
        if abs(ring_coords[i][0] - ring_coords[i + 1][0]) > 180:
            return True
    return False

def split_at_antimeridian(ring_coords):
    """Split a ring that crosses the antimeridian into segments."""
    segments = []
    current = [ring_coords[0]]
    for i in range(1, len(ring_coords)):
        lon_prev = ring_coords[i - 1][0]
        lon_curr = ring_coords[i][0]
        if abs(lon_prev - lon_curr) > 180:
            if len(current) >= 3:
                segments.append(current)
            current = [ring_coords[i]]
        else:
            current.append(ring_coords[i])
    if len(current) >= 3:
        segments.append(current)
    return segments

def points_to_d(pts):
    """Convert point list to SVG path d string."""
    if len(pts) < 3:
        return ""
    parts = [f'M{pts[0][0]:.1f},{pts[0][1]:.1f}']
    for x, y in pts[1:]:
        parts.append(f'L{x:.1f},{y:.1f}')
    parts.append('Z')
    return ''.join(parts)

print("=" * 60)
print("Natural Earth 50m → Robinson SVG Converter")
print("=" * 60)

print("\n[1/5] Downloading Natural Earth 50m data...")
if os.path.exists(GEOJSON_FILE):
    print(f"  Using cached file ({os.path.getsize(GEOJSON_FILE) // 1024} KB)")
else:
    try:
        req = urllib.request.urlopen(GEOJSON_URL, context=ssl_ctx)
        with open(GEOJSON_FILE, 'wb') as out:
            out.write(req.read())
        size_kb = os.path.getsize(GEOJSON_FILE) // 1024
        print(f"  Downloaded {size_kb} KB")
    except Exception as e:
        print(f"  ERROR: Download failed: {e}")
        print("  Trying alternative URL...")
        try:
            alt_url = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson"
            req = urllib.request.urlopen(alt_url, context=ssl_ctx)
            with open(GEOJSON_FILE, 'wb') as out:
                out.write(req.read())
            size_kb = os.path.getsize(GEOJSON_FILE) // 1024
            print(f"  Downloaded {size_kb} KB (alternative)")
        except Exception as e2:
            print(f"  ERROR: Both downloads failed. {e2}")
            sys.exit(1)

print("\n[2/5] Parsing GeoJSON...")
with open(GEOJSON_FILE, encoding='utf-8') as f:
    data = json.load(f)

features = data['features']
print(f"  {len(features)} features found")

print("\n[3/5] Processing countries...")
countries = {}

PREFERRED_NAMES = {
    'CY': 'Cyprus',
    'SO': 'Somalia',
    'FR': 'France',
}

for feature in features:
    props = feature['properties']
    
    iso = props.get('ISO_A2_EH', props.get('ISO_A2', '-99'))
    if iso == '-99':
        iso = props.get('ISO_A2', '-99')
    if iso == '-99':
        a3 = props.get('ADM0_A3', '')
        if a3 == 'KOS':
            iso = 'XK'
        elif a3 == 'SDS':
            iso = 'SS'
        elif a3 == 'SAH':
            iso = 'EH'
        elif a3 == 'SOL':
            iso = 'SO'  # Somaliland → Somalia
        elif a3 == 'CYN':
            iso = 'CY'  # N. Cyprus → merge with Cyprus visually
        else:
            iso = a3 if a3 else 'XX'

    name = props.get('NAME', props.get('ADMIN', 'Unknown'))
    name = NAME_MAP.get(name, name)

    if iso == 'AQ':
        continue

    if iso not in countries:
        countries[iso] = {'name': name, 'iso': iso, 'paths': []}
    elif iso in PREFERRED_NAMES:
        countries[iso]['name'] = PREFERRED_NAMES[iso]
    elif 'Northern' not in name and 'N.' not in name:
        countries[iso]['name'] = name

    geom = feature['geometry']
    if geom['type'] == 'Polygon':
        polygons = [geom['coordinates']]
    elif geom['type'] == 'MultiPolygon':
        polygons = geom['coordinates']
    else:
        continue

    for poly in polygons:
        countries[iso]['paths'].append(poly)

print(f"  {len(countries)} countries/territories")

print("\n[4/5] Generating SVG...")
svg_elements = []
total_input_pts = 0
total_output_pts = 0
skipped_tiny = 0

for iso, country in sorted(countries.items()):
    name = country['name']
    paths = country['paths']
    first_path_done = False

    for poly in paths:
        d_parts = []

        for ring_idx, ring in enumerate(poly):
            total_input_pts += len(ring)

            if detect_antimeridian_crossing(ring):
                segments = split_at_antimeridian(ring)
                for seg in segments:
                    projected = [project(c[0], c[1]) for c in seg]
                    if len(projected) >= 3:
                        simplified = dp_simplify(projected, SIMPLIFICATION_TOLERANCE)
                        total_output_pts += len(simplified)
                        area = polygon_svg_area(simplified)
                        if area < MIN_POLYGON_AREA and ring_idx == 0:
                            skipped_tiny += 1
                            continue
                        d_parts.append(points_to_d(simplified))
            else:
                projected = [project(c[0], c[1]) for c in ring]
                if len(projected) >= 3:
                    simplified = dp_simplify(projected, SIMPLIFICATION_TOLERANCE)
                    total_output_pts += len(simplified)
                    area = polygon_svg_area(simplified)
                    if area < MIN_POLYGON_AREA and ring_idx == 0:
                        skipped_tiny += 1
                        continue
                    d_parts.append(points_to_d(simplified))

        if not d_parts:
            continue

        d = ''.join(d_parts)

        d = d.replace('`', '\\`')
        name_escaped = name.replace('"', '&quot;').replace("'", "&#39;")

        if not first_path_done:
            svg_elements.append(f'<path id="{iso}" class="{name_escaped}" d="{d}"/>')
            first_path_done = True
        else:
            svg_elements.append(f'<path class="{name_escaped}" d="{d}"/>')

print(f"  Input points:  {total_input_pts:,}")
print(f"  Output points: {total_output_pts:,} ({100*total_output_pts/max(1,total_input_pts):.1f}%)")
print(f"  SVG elements:  {len(svg_elements)}")
print(f"  Skipped tiny:  {skipped_tiny}")

svg_header = '<svg baseProfile="tiny" fill="#ececec" height="857" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width=".2" version="1.2" viewBox="0 0 2000 857" width="2000" xmlns="http://www.w3.org/2000/svg">'
svg_body = '\n'.join(svg_elements)
svg_footer = '</svg>'
svg_content = f'{svg_header}\n{svg_body}\n{svg_footer}'

print("\n[5/5] Writing map-data.js...")

if os.path.exists(OUTPUT_FILE):
    import shutil
    shutil.copy2(OUTPUT_FILE, BACKUP_FILE)
    print(f"  Backed up to {BACKUP_FILE}")

js_content = f'const WORLD_MAP_SVG = `\n{svg_content}\n`;\n'
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(js_content)

file_size = os.path.getsize(OUTPUT_FILE)
print(f"  Output: {file_size:,} bytes ({file_size // 1024} KB)")

if os.path.exists(BACKUP_FILE):
    old_size = os.path.getsize(BACKUP_FILE)
    print(f"  Previous: {old_size:,} bytes ({old_size // 1024} KB)")
    print(f"  Size change: {(file_size - old_size) / 1024:+.0f} KB")

print("\n" + "=" * 60)
print("VERIFICATION")
print("=" * 60)

required_ids = ['RS', 'XK', 'HU', 'AT', 'SI', 'SK', 'CZ', 'NL', 'EE', 'PT', 'ES', 'BR', 
                'HR', 'MK', 'ME', 'BA', 'TZ', 'EG', 'AE', 'KR', 'RO', 'MV']
required_classes = ['Greece', 'Japan', 'United States', 'United Kingdom', 'Russian Federation',
                    'Norway', 'France', 'Malta', 'Cyprus', 'Italy', 'Turkey']

for cid in required_ids:
    found = f'id="{cid}"' in js_content
    print(f"  {'✓' if found else '✗'} #{cid}")

for cls in required_classes:
    found = f'class="{cls}"' in js_content
    print(f"  {'✓' if found else '✗'} .{cls}")

if os.path.exists(GEOJSON_FILE):
    os.remove(GEOJSON_FILE)
    print(f"\n  Cleaned up {GEOJSON_FILE}")

print("\nDone!")
