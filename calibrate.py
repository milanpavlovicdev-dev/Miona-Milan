import math, re, sys

robinson_table = [
    (0,  1.0000, 0.0000),
    (5,  0.9986, 0.0620),
    (10, 0.9954, 0.1240),
    (15, 0.9900, 0.1860),
    (20, 0.9822, 0.2480),
    (25, 0.9730, 0.3100),
    (30, 0.9600, 0.3720),
    (35, 0.9427, 0.4340),
    (40, 0.9216, 0.4958),
    (45, 0.8962, 0.5571),
    (50, 0.8679, 0.6176),
    (55, 0.8350, 0.6769),
    (60, 0.7986, 0.7346),
    (65, 0.7597, 0.7903),
    (70, 0.7186, 0.8435),
    (75, 0.6732, 0.8936),
    (80, 0.6213, 0.9394),
    (85, 0.5722, 0.9761),
    (90, 0.5322, 1.0000),
]

def robinson_interp(lat_deg):
    """Interpolate Robinson PLEN and PDFE for given latitude in degrees."""
    abs_lat = abs(lat_deg)
    if abs_lat >= 90:
        return robinson_table[-1][1], robinson_table[-1][2]
    for i in range(len(robinson_table) - 1):
        if robinson_table[i][0] <= abs_lat <= robinson_table[i+1][0]:
            t = (abs_lat - robinson_table[i][0]) / (robinson_table[i+1][0] - robinson_table[i][0])
            plen = robinson_table[i][1] + t * (robinson_table[i+1][1] - robinson_table[i][1])
            pdfe = robinson_table[i][2] + t * (robinson_table[i+1][2] - robinson_table[i][2])
            return plen, pdfe
    return 1.0, 0.0

def robinson_xy(lat, lon, x_center, y_center, Sx, Sy):
    """Convert lat/lon to SVG x,y using Robinson projection."""
    plen, pdfe = robinson_interp(lat)
    lon_rad = lon * math.pi / 180
    x = x_center + Sx * plen * lon_rad
    y = y_center - Sy * pdfe * (1 if lat >= 0 else -1)
    return x, y

def parse_path_coords(d):
    """Extract all absolute coordinate pairs from an SVG path d attribute."""
    coords = []
    tokens = re.findall(r'[-+]?\d*\.?\d+', d)
    for i in range(0, len(tokens) - 1, 2):
        try:
            x, y = float(tokens[i]), float(tokens[i+1])
            if 0 < x < 2000 and 0 < y < 900:  # sanity filter
                coords.append((x, y))
        except:
            pass
    return coords

def bbox(coords):
    xs = [c[0] for c in coords]
    ys = [c[1] for c in coords]
    return min(xs), max(xs), min(ys), max(ys)

def centroid(coords):
    n = len(coords)
    return sum(c[0] for c in coords)/n, sum(c[1] for c in coords)/n

svg_path = r"c:\Users\Natalija\Desktop\Milan Website\world-map.svg"
with open(svg_path, 'r', encoding='utf-8') as f:
    svg_content = f.read()

def extract_paths(svg, pattern):
    """Find all paths matching a pattern and return their d attributes."""
    results = []
    for match in re.finditer(pattern, svg):
        start = match.start()
        d_match = re.search(r'd="([^"]+)"', svg[max(0,start-200):start+2000])
        if d_match:
            results.append(d_match.group(1))
    return results

def find_path_d(svg, search_str):
    """Find path elements containing search_str and return their d values."""
    paths = []
    for m in re.finditer(r'<path[^>]*' + re.escape(search_str) + r'[^>]*d="([^"]+)"', svg):
        paths.append(m.group(1))
    for m in re.finditer(r'<path[^>]*d="([^"]+)"[^>]*' + re.escape(search_str), svg):
        paths.append(m.group(1))
    return paths

uk_paths = find_path_d(svg_content, 'class="United Kingdom"')
greece_paths = find_path_d(svg_content, 'class="Greece"')
italy_paths = find_path_d(svg_content, 'class="Italy"')
japan_paths = find_path_d(svg_content, 'class="Japan"')
norway_paths = find_path_d(svg_content, 'class="Norway"')
cyprus_paths = find_path_d(svg_content, 'class="Cyprus"')
serbia_paths = find_path_d(svg_content, 'id="RS"')
ireland_paths = find_path_d(svg_content, 'id="IE"')

print("=== Country paths found ===")
for name, paths in [("UK", uk_paths), ("Greece", greece_paths), ("Italy", italy_paths), 
                     ("Japan", japan_paths), ("Norway", norway_paths), ("Cyprus", cyprus_paths),
                     ("Serbia", serbia_paths), ("Ireland", ireland_paths)]:
    print(f"{name}: {len(paths)} paths")

def parse_absolute_path(d):
    coords = []
    tokens = re.findall(r'[-+]?\d*\.?\d+', d)
    for i in range(0, len(tokens) - 1, 2):
        x, y = float(tokens[i]), float(tokens[i+1])
        if 0 < x < 2100 and 0 < y < 900:
            coords.append((x, y))
    return coords

for name, paths in [("UK", uk_paths), ("Greece", greece_paths), ("Italy", italy_paths),
                    ("Japan", japan_paths), ("Norway", norway_paths), ("Cyprus", cyprus_paths),
                    ("Serbia", serbia_paths), ("Ireland", ireland_paths)]:
    all_coords = []
    for p in paths:
        all_coords.extend(parse_absolute_path(p))
    if all_coords:
        b = bbox(all_coords)
        c = centroid(all_coords)
        print(f"\n{name}:")
        print(f"  BBox: x=[{b[0]:.1f}, {b[1]:.1f}], y=[{b[2]:.1f}, {b[3]:.1f}]")
        print(f"  Centroid: ({c[0]:.1f}, {c[1]:.1f})")
        print(f"  Size: {b[1]-b[0]:.1f} x {b[3]-b[2]:.1f}")

print("\n" + "="*60)
print("CALIBRATION")
print("="*60)

reference_points = [
    (51.5, 0.1, 993.9, 169.1, "SE England near London"),
    (58.5, -3.0, 972.6, 129.5, "N Scotland"),
    (50.1, -5.5, 958.0, 181.1, "SW England"),
    (55.0, -6.0, 956.7, 158.2, "NE Ireland coast"),
    (35.0, 33.1, 1162.5, 277.5, "Cyprus center"),
    (36.4, 22.5, 1098.0, 260.0, "S Peloponnese"),
    (38.1, 15.6, 1052.1, 260.4, "S Italy toe"),
]

def lstsq_2param(x_vals, y_vals):
    """Solve y = a + b*x for a and b using least squares."""
    n = len(x_vals)
    sx = sum(x_vals)
    sy = sum(y_vals)
    sxx = sum(xi*xi for xi in x_vals)
    sxy = sum(xi*yi for xi, yi in zip(x_vals, y_vals))
    denom = n * sxx - sx * sx
    b = (n * sxy - sx * sy) / denom
    a = (sy - b * sx) / n
    return a, b

fx_vals = []
svgx_vals = []
for lat, lon, sx, sy, desc in reference_points:
    plen, pdfe = robinson_interp(lat)
    lon_rad = lon * math.pi / 180
    fx_vals.append(plen * lon_rad)
    svgx_vals.append(sx)

x_center, Sx = lstsq_2param(fx_vals, svgx_vals)
print(f"x_center = {x_center:.2f}")
print(f"Sx = {Sx:.2f}")

fy_vals = []
svgy_vals = []
for lat, lon, sx, sy, desc in reference_points:
    plen, pdfe = robinson_interp(lat)
    fy_vals.append(-pdfe * (1 if lat >= 0 else -1))
    svgy_vals.append(sy)

y_center, Sy = lstsq_2param(fy_vals, svgy_vals)
print(f"y_center = {y_center:.2f}")
print(f"Sy = {Sy:.2f}")

print(f"\n{'Description':<25} {'Actual':>15} {'Predicted':>15} {'Error':>10}")
print("-" * 70)
for lat, lon, sx, sy, desc in reference_points:
    px, py = robinson_xy(lat, lon, x_center, y_center, Sx, Sy)
    err = math.sqrt((px-sx)**2 + (py-sy)**2)
    print(f"{desc:<25} ({sx:7.1f},{sy:6.1f}) ({px:7.1f},{py:6.1f}) {err:7.1f}")

print("\n=== Cross-verification with country bounding boxes ===")

def verify_point(lat, lon, country_paths, country_name, city_name):
    all_coords = []
    for p in country_paths:
        all_coords.extend(parse_absolute_path(p))
    if not all_coords:
        print(f"  No coords for {country_name}")
        return
    b = bbox(all_coords)
    px, py = robinson_xy(lat, lon, x_center, y_center, Sx, Sy)
    in_bbox = b[0]-5 <= px <= b[1]+5 and b[2]-5 <= py <= b[3]+5
    print(f"  {city_name}: ({px:.1f}, {py:.1f}) | {country_name} bbox: x=[{b[0]:.0f},{b[1]:.0f}] y=[{b[2]:.0f},{b[3]:.0f}] | {'IN' if in_bbox else 'OUT'}")

verify_point(44.8, 20.5, serbia_paths, "Serbia", "Belgrade")
verify_point(37.98, 23.73, greece_paths, "Greece", "Athens")
verify_point(41.9, 12.5, italy_paths, "Italy", "Rome")
verify_point(35.0, 33.3, cyprus_paths, "Cyprus", "Cyprus cities")
verify_point(35.68, 139.69, japan_paths, "Japan", "Tokyo")
verify_point(69.65, 18.96, norway_paths, "Norway", "Tromsø")

print("\n" + "="*60)
print("FINAL CITY COORDINATES")
print("="*60)

cities = [
    ("Beograd", 44.8, 20.5),
    ("Novi Sad", 45.25, 19.85),
    ("Atina", 37.98, 23.73),
    ("Solun", 40.64, 22.94),
    ("Larnaka", 34.92, 33.63),
    ("Limasol", 34.68, 33.04),
    ("Rim", 41.9, 12.5),
    ("Venecija", 45.44, 12.34),
    ("Firenca", 43.77, 11.25),
    ("Tokio", 35.68, 139.69),
    ("Kjoto", 35.01, 135.77),
    ("Osaka", 34.69, 135.50),
    ("Tromsø", 69.65, 18.96),
    ("Bergen", 60.39, 5.32),
]

print("\nJavaScript array:\n")
print("const cityMarkers = [")
for name, lat, lon in cities:
    x, y = robinson_xy(lat, lon, x_center, y_center, Sx, Sy)
    anchor = 'start'  # default: text to the right
    if name in ['Beograd', 'Novi Sad', 'Solun']:
        anchor = 'end'  # text to the left for Balkans (crowded)
    elif name in ['Osaka']:
        anchor = 'end'  # text to the left 
    elif name in ['Venecija', 'Firenca']:
        anchor = 'end'  # text to the left for Italy (crowded)
    elif name in ['Limasol']:
        anchor = 'end'
    elif name in ['Bergen']:
        anchor = 'end'
    
    print(f"  {{ name: '{name}', x: {x:.1f}, y: {y:.1f}, anchor: '{anchor}' }},")
print("];")

print(f"\n{'City':<12} {'Lat':>7} {'Lon':>8} {'SVG_X':>8} {'SVG_Y':>8}")
print("-" * 48)
for name, lat, lon in cities:
    x, y = robinson_xy(lat, lon, x_center, y_center, Sx, Sy)
    print(f"{name:<12} {lat:>7.2f} {lon:>8.2f} {x:>8.1f} {y:>8.1f}")
