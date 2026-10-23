// Sends an event to Google Analytics. gtag() is set up in index.html; it queues events
// until Google's script loads, and is absent on localhost so dev clicks aren't counted.
// Never pass personal details (names, emails, phone numbers) — Google forbids it.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: string, params?: Record<string, string>) {
  window.gtag?.('event', event, params)
}
