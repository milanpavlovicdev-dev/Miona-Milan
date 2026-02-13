import math, re

robinson_table = [
    (0,  1.0000, 0.0000), (5,  0.9986, 0.0620), (10, 0.9954, 0.1240),
    (15, 0.9900, 0.1860), (20, 0.9822, 0.2480), (25, 0.9730, 0.3100),
    (30, 0.9600, 0.3720), (35, 0.9427, 0.4340), (40, 0.9216, 0.4958),
    (45, 0.8962, 0.5571), (50, 0.8679, 0.6176), (55, 0.8350, 0.6769),
    (60, 0.7986, 0.7346), (65, 0.7597, 0.7903), (70, 0.7186, 0.8435),
    (75, 0.6732, 0.8936), (80, 0.6213, 0.9394), (85, 0.5722, 0.9761),
    (90, 0.5322, 1.0000),
]

def robinson_interp(lat_deg):
    abs_lat = abs(lat_deg)
    if abs_lat >= 90: return robinson_table[-1][1], robinson_table[-1][2]
    for i in range(len(robinson_table) - 1):
        if robinson_table[i][0] <= abs_lat <= robinson_table[i+1][0]:
            t = (abs_lat - robinson_table[i][0]) / (robinson_table[i+1][0] - robinson_table[i][0])
            plen = robinson_table[i][1] + t * (robinson_table[i+1][1] - robinson_table[i][1])
            pdfe = robinson_table[i][2] + t * (robinson_table[i+1][2] - robinson_table[i][2])
            return plen, pdfe
    return 1.0, 0.0

def robinson_xy(lat, lon, xc, yc, sx, sy):
    plen, pdfe = robinson_interp(lat)
    lon_rad = lon * math.pi / 180
    x = xc + sx * plen * lon_rad
    y = yc - sy * pdfe * (1 if lat >= 0 else -1)
    return x, y

with open(r"c:\Users\Natalija\Desktop\Milan Website\world-map.svg", 'r', encoding='utf-8') as f:
    svg = f.read()

def trace_relative_path(d):
    coords = []
    m = re.match(r'M([\d.]+)\s+([\d.]+)', d)
    if not m: return coords
    cx, cy = float(m.group(1)), float(m.group(2))
    coords.append((cx, cy))
    rest = d[m.end():]
    rest = re.sub(r'[lLzZ]', ' ', rest)
    tokens = re.findall(r'-?[\d.]+', rest)
    for i in range(0, len(tokens)-1, 2):
        dx, dy = float(tokens[i]), float(tokens[i+1])
        cx += dx
        cy += dy
        coords.append((cx, cy))
    return coords

serbia_match = re.search(r'<path[^>]+d="([^"]+)"[^>]*id="RS"', svg)
if serbia_match:
    serbia_coords = trace_relative_path(serbia_match.group(1))
    xs = [c[0] for c in serbia_coords]
    ys = [c[1] for c in serbia_coords]
    print(f"Serbia SVG bbox: x=[{min(xs):.1f}, {max(xs):.1f}], y=[{min(ys):.1f}, {max(ys):.1f}]")

ghana_match = re.search(r'<path[^>]+d="([^"]+)"[^>]*id="GH"', svg)
if ghana_match:
    ghana_coords = trace_relative_path(ghana_match.group(1))
    gxs = [c[0] for c in ghana_coords]
    gys = [c[1] for c in ghana_coords]
    print(f"Ghana SVG bbox: x=[{min(gxs):.1f}, {max(gxs):.1f}], y=[{min(gys):.1f}, {max(gys):.1f}]")

ec_match = re.search(r'<path[^>]+d="([^"]+)"[^>]*id="EC"', svg)
if ec_match:
    ec_coords = trace_relative_path(ec_match.group(1))
    exs = [c[0] for c in ec_coords]
    eys = [c[1] for c in ec_coords]
    print(f"Ecuador SVG bbox: x=[{min(exs):.1f}, {max(exs):.1f}], y=[{min(eys):.1f}, {max(eys):.1f}]")

def get_abs_bbox(svg, search_str):
    coords = []
    for m in re.finditer(r'<path[^>]*' + re.escape(search_str) + r'[^>]*d="(M\s+[\d][\d\s.]+Z)"', svg):
        nums = re.findall(r'[\d.]+', m.group(1))
        for i in range(0, len(nums)-1, 2):
            x, y = float(nums[i]), float(nums[i+1])
            if 0 < x < 2100 and 0 < y < 900:
                coords.append((x, y))
    return coords

aus_coords = get_abs_bbox(svg, 'class="Australia"')
if aus_coords:
    axs = [c[0] for c in aus_coords]
    ays = [c[1] for c in aus_coords]
    print(f"Australia SVG bbox: x=[{min(axs):.1f}, {max(axs):.1f}], y=[{min(ays):.1f}, {max(ays):.1f}]")

arg_coords = get_abs_bbox(svg, 'class="Argentina"')
if arg_coords:
    axs = [c[0] for c in arg_coords]
    ays = [c[1] for c in arg_coords]
    print(f"Argentina SVG bbox: x=[{min(axs):.1f}, {max(axs):.1f}], y=[{min(ays):.1f}, {max(ays):.1f}]")

print("\n=== Refined Calibration ===")

ref_points = [
    (51.5, 1.0, 993.9, 169.1),
    (58.6, -3.2, 972.6, 129.5),
    (50.1, -5.7, 958.0, 181.1),
    (54.6, -5.9, 956.7, 158.2),
    (36.4, 22.5, 1098.0, 268.0),
    (38.0, 15.7, 1052.1, 260.4),
    (35.5, 139.8, 1710.0, 273.7),
    (83.0, -73.0, 896.3, 1.4),
]

def lstsq_2param(x_vals, y_vals):
    n = len(x_vals)
    sx = sum(x_vals)
    sy = sum(y_vals)
    sxx = sum(xi*xi for xi in x_vals)
    sxy = sum(xi*yi for xi, yi in zip(x_vals, y_vals))
    denom = n * sxx - sx * sx
    b = (n * sxy - sx * sy) / denom
    a = (sy - b * sx) / n
    return a, b

fx = [robinson_interp(lat)[0] * lon * math.pi / 180 for lat, lon, sx, sy in ref_points]
sx_vals = [sx for lat, lon, sx, sy in ref_points]
xc, Sx = lstsq_2param(fx, sx_vals)

fy = [-robinson_interp(lat)[1] * (1 if lat >= 0 else -1) for lat, lon, sx, sy in ref_points]
sy_vals = [sy for lat, lon, sx, sy in ref_points]
yc, Sy = lstsq_2param(fy, sy_vals)

print(f"xc = {xc:.2f}, Sx = {Sx:.2f}")
print(f"yc = {yc:.2f}, Sy = {Sy:.2f}")

print(f"\n{'Point':>40} {'Actual':>15} {'Predicted':>15} {'Error':>8}")
print("-" * 82)
for lat, lon, sx_a, sy_a in ref_points:
    px, py = robinson_xy(lat, lon, xc, yc, Sx, Sy)
    err = math.sqrt((px-sx_a)**2 + (py-sy_a)**2)
    print(f"({lat:.1f}N, {lon:.1f}E)".rjust(40) + f" ({sx_a:7.1f},{sy_a:6.1f}) ({px:7.1f},{py:6.1f}) {err:7.1f}")

print("\n=== Cross-verification ===")
countries_check = [
    ("Belgrade", 44.8, 20.5, serbia_coords if serbia_match else [], "Serbia"),
    ("Athens", 37.98, 23.73, get_abs_bbox(svg, 'class="Greece"'), "Greece"),
    ("Rome", 41.9, 12.5, get_abs_bbox(svg, 'class="Italy"'), "Italy"),
    ("Larnaka", 34.92, 33.63, get_abs_bbox(svg, 'class="Cyprus"'), "Cyprus"),
    ("Tokyo", 35.68, 139.69, get_abs_bbox(svg, 'class="Japan"'), "Japan"),
    ("Tromso", 69.65, 18.96, get_abs_bbox(svg, 'class="Norway"'), "Norway"),
]

for city, lat, lon, coords, country in countries_check:
    px, py = robinson_xy(lat, lon, xc, yc, Sx, Sy)
    if coords:
        cxs = [c[0] for c in coords]
        cys = [c[1] for c in coords]
        in_x = min(cxs)-3 <= px <= max(cxs)+3
        in_y = min(cys)-3 <= py <= max(cys)+3
        status = "OK" if (in_x and in_y) else "MISS"
        print(f"  {city:12s} ({px:.1f}, {py:.1f}) in {country} x=[{min(cxs):.0f},{max(cxs):.0f}] y=[{min(cys):.0f},{max(cys):.0f}] -> {status}")

print("\n" + "="*60)
print("FINAL CITY COORDINATES (Refined)")
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
    ("Tromsoe", 69.65, 18.96),
    ("Bergen", 60.39, 5.32),
]

print("\nconst cityMarkers = [")
for name, lat, lon in cities:
    x, y = robinson_xy(lat, lon, xc, yc, Sx, Sy)
    anchor = 'start'
    if name in ['Beograd', 'Novi Sad', 'Solun', 'Venecija', 'Firenca', 'Osaka', 'Limasol', 'Bergen']:
        anchor = 'end'
    print(f"  {{ name: '{name}', x: {x:.1f}, y: {y:.1f}, anchor: '{anchor}' }},")
print("];")

print(f"\n{'City':<12} {'Lat':>7} {'Lon':>8} {'SVG_X':>8} {'SVG_Y':>8}")
print("-" * 48)
for name, lat, lon in cities:
    x, y = robinson_xy(lat, lon, xc, yc, Sx, Sy)
    print(f"{name:<12} {lat:>7.2f} {lon:>8.2f} {x:>8.1f} {y:>8.1f}")
