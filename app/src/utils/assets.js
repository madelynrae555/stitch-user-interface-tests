// GitHub Pages serves the site from a folder, so image links need the site's
// base folder in front of them. Vite supplies that folder automatically.
export const assetUrl = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
