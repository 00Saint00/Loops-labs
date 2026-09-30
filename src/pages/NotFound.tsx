import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle("Page Not Found — Maro's Loop Lab")

  return (
    <>
      <section className="flex min-h-[420px] flex-col items-center justify-center px-8 py-20 text-center">
        <div className="mb-5 text-[0.7rem] font-semibold tracking-[0.2em] text-rose uppercase">
          404 · Page not found
        </div>
        <h1 className="mb-6 font-display text-[3.4rem] leading-[1.1] text-walnut max-md:text-[2.4rem]">
          This loop
          <br />
          got <em className="font-fun text-coral not-italic">dropped.</em>
        </h1>
        <p className="mb-10 max-w-[400px] text-base leading-[1.8] font-light text-muted">
          The page you're looking for has unravelled somewhere along the way. Let's get you back
          to something handmade.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-block rounded-full bg-rose px-7 py-3 text-[0.82rem] font-semibold tracking-[0.08em] text-parch uppercase transition-colors hover:bg-rose-deep"
          >
            Back to home
          </Link>
          <Link
            to="/gallery"
            className="inline-block rounded-full border-[1.5px] border-linen px-7 py-3 text-[0.82rem] font-semibold tracking-[0.08em] text-walnut uppercase transition-colors hover:border-rose hover:text-rose"
          >
            Browse the collection
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
