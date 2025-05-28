# Gallery Images

This folder contains the static images for the website gallery.

## How to manage gallery images:

### Adding new images:
1. Add your images to this `/public/gallery/` folder
2. Use descriptive filenames (e.g., `bachata-class-2024.jpg`, `salsa-social-december.jpg`)
3. Update `/config/gallery.json` with the new image details

### Image requirements:
- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 500x500px minimum for best quality
- **Aspect ratio**: Square images work best (1:1 ratio)
- **File size**: Keep under 500KB for optimal loading

### Recommended image sizes:
- **Main display**: 500x500px
- **Thumbnails**: 250x250px (automatically resized)

### Current images needed:
Replace these placeholder files with actual dance photos:
- `dance-1.jpg` - Main featured image (Bachata classes)
- `dance-2.jpg` - Salsa social dancing
- `dance-3.jpg` - Community/group photos
- `dance-4.jpg` - Professional instruction
- `dance-5.jpg` - Studio/venue photos

### To update the gallery:
1. Add new images to this folder
2. Edit `/config/gallery.json`:
   - Update the `src` path to your new image
   - Update the `caption` with descriptive text
   - Update the `alt` text for accessibility

### Example gallery.json entry:
```json
{
  "id": 6,
  "src": "/gallery/new-event-photo.jpg",
  "caption": "Amazing bachata performance at our High Wycombe studio",
  "alt": "Dancers performing bachata at Latin Shine studio"
}
```

The gallery will automatically update when you modify the JSON file! 