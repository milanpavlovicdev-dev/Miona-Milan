import os
import glob

folder_path = 'M&M'

jpg_files = glob.glob(os.path.join(folder_path, '*.jpg'))

jpg_files.sort()

print(f"Pronađeno {len(jpg_files)} .jpg fajlova")

js_code = "const galleryPhotos = [\n"

for file_path in jpg_files:
    normalized_path = file_path.replace('\\', '/')
    js_code += f"    '{normalized_path}',\n"

js_code = js_code.rstrip(',\n') + '\n'

js_code += "];\n"

print("\n" + "="*80)
print("JAVASCRIPT KOD ZA script-galerija.js:")
print("="*80 + "\n")
print(js_code)

with open('gallery_photos.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("\nJavaScript kod je sačuvan u 'gallery_photos.js'")
