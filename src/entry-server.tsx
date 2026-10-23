// Build-time only: renders a route to HTML so scripts/prerender.mjs can bake it into
// dist/. prerender() (unlike renderToString) waits for the lazy-loaded pages.
// Runs in Node at build time, never in the browser.
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return new Response(prelude).text()
}
