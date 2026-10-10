import { BACKGROUNDS, BASE_SKINS, OUTFITS, MOUTHS, EYES, HAIR_STYLES, ACCESSORIES } from '../data/traitData';

// Global memory cache for HTMLImageElements
const imageCache = new Map();

/**
 * Gets or creates a cached HTMLImageElement for a given URL with version hash
 */
export function getCachedImage(url) {
  if (!url) return null;
  
  // Append cache buster version param for pristine restored base skins & calibrated eyes
  const versionedUrl = url.includes('?') ? url : `${url}?v=10.0`;

  if (imageCache.has(versionedUrl)) {
    return imageCache.get(versionedUrl);
  }

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = versionedUrl;
  imageCache.set(versionedUrl, img);
  return img;
}

/**
 * Loads a single image returning a promise
 */
export function loadImageAsync(url) {
  if (!url) return Promise.resolve(null);
  
  const cached = getCachedImage(url);
  if (cached.complete && cached.naturalWidth > 0) {
    return Promise.resolve(cached);
  }

  return new Promise((resolve) => {
    cached.onload = () => resolve(cached);
    cached.onerror = () => {
      console.warn(`Failed to load asset: ${url}`);
      resolve(null);
    };
  });
}

/**
 * Loads a list of image URLs in parallel and returns loaded elements in order
 */
export async function loadImagesBatch(urls) {
  return Promise.all(urls.map(url => loadImageAsync(url)));
}

/**
 * Background preloader for all trait assets in the app
 */
export function preloadAllAssets() {
  const allTraits = [
    ...BACKGROUNDS,
    ...BASE_SKINS,
    ...OUTFITS,
    ...MOUTHS,
    ...EYES,
    ...HAIR_STYLES,
    ...ACCESSORIES
  ];

  allTraits.forEach(trait => {
    if (trait.file) {
      getCachedImage(trait.file);
    }
  });
}
