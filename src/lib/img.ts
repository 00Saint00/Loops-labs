// Product photos are served as the WebP copies made by scripts/optimise-images.mjs.
// Pass the original .jpg path; get back src + srcSet for a responsive <img>.
export function responsive(jpg: string) {
  const base = jpg.replace(/\.jpg$/, '')
  return {
    src: `${base}-960.webp`,
    srcSet: `${base}-480.webp 480w, ${base}-960.webp 960w`,
  }
}
