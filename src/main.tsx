import './index.css'

let started = false
const start = () => {
  if (started) return
  started = true
  import('./boot')
}

// A pre-rendered page is already complete HTML, so let the browser paint it before
// React loads and hydrates; otherwise the first paint waits for all of React to run.
// Browsers don't fire animation frames for tabs that aren't drawing (e.g. opened in the
// background), so the timer makes sure the page still becomes interactive.
if (document.getElementById('root')!.hasChildNodes()) {
  requestAnimationFrame(() => setTimeout(start))
  setTimeout(start, 300)
} else {
  start()
}
