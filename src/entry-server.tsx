// Build-time only: renders a route to HTML so scripts/prerender.mjs can bake it into
// dist/. Runs in Node at build time, never in the browser.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export async function render(url: string): Promise<string> {
  const app = () => (
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  )
  // prerender() waits for the lazy page modules to load. Its own output isn't used: it
  // moves large sections into hidden placeholders revealed by an inline script on the next
  // animation frame, which never comes in a tab that isn't drawing, leaving the page dead.
  // With the modules now loaded, renderToString() gives plain, complete HTML.
  await prerender(app())
  return renderToString(app())
}
