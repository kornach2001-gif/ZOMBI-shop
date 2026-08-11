/** Base path for GitHub Pages and local assets. */
export const BASE = import.meta.env.BASE_URL

export function asset(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${BASE}${clean}`
}
