import './index.css'

const start = () => import('./boot')

// A pre-rendered page is already complete HTML, so let the browser paint it before
// React loads and hydrates; otherwise the first paint waits for all of React to run.
if (document.getElementById('root')!.hasChildNodes()) {
  requestAnimationFrame(() => setTimeout(start))
} else {
  start()
}
