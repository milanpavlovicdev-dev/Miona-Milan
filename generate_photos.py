import os

folder = 'M&M'
files = sorted([f for f in os.listdir(folder) if f.lower().endswith(('.jpg', '.jpeg'))])

js_code = 'const galleryPhotos = [\n'
for i, f in enumerate(files):
    js_code += f"    'M&M/{f}'"
    if i < len(files) - 1:
        js_code += ','
    js_code += '\n'

js_code += '];'

with open('gallery_photos.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f'Ukupno fajlova: {len(files)}')
print('Fajl gallery_photos.js je kreiran!')
