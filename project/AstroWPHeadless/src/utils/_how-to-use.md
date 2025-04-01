# How To Use:

---
##  replaceImages.ts:
- contains 
  - `optimizeImages( htmlString, settings )`
  - `generateOptimizedImage( url, settings )`
- pass in `settings` to both functions
  - `url` is added to settings object as `src` inside `generateOptimizedImage()`
- all functions are async

```ts 
const optimizeImagesettings = { format: 'avif', inferSize: true };
const content = await optimizeImages(content, optimizeImagesettings);
```

## generateOptimizeImages()
- uses `getImage()` to generate an optimized image
- returns it so we can use the .src of the image inside <img> tags

## optimizeImages()
- uses an replaceAsync function to check for img tags inside an html string
- generates an optimized image using the src of the img tag
- returns an html string with the `optimizedImage.src` as `src`
  - also uses the img alt tage and sets some responsive loading and lazy.
---


