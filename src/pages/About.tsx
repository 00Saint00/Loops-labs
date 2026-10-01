import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const VALUES = [
  { icon: '🧶', title: 'Individuality', desc: 'No two pieces alike — ever. Your piece is made for you, and only you.' },
  { icon: '♻️', title: 'Sustainability', desc: 'Slow, thoughtful creation in a world of mass production. Made to order, never to waste.' },
  { icon: '🧵', title: 'Timeless Craftsmanship', desc: 'Techniques passed down through generations, in every single stitch.' },
  { icon: '🎨', title: 'Creativity', desc: 'Every piece is an experiment — playful colour, bold texture, a sprinkle of magic.' },
  { icon: '💎', title: 'Quality', desc: 'Yarns that last, finishes that hold. Your piece should outlive the trend cycle.' },
  { icon: '💡', title: 'Innovation', desc: 'The Lab in Loop Lab — we never stop trying new ideas, so we never run out of inspiration.' },
]

const TIMELINE = [
  { year: '2023', title: 'Back to the hook', desc: 'Rediscovered crochet as a creative outlet during a particularly challenging period. Made my first adult-size beanie, a bikini piece, and various tops and sweaters.' },
  { year: '2024', title: 'First paid order', desc: 'A friend from Twitter had seen some of the pieces I\'d made and asked if he could buy one. That was the moment I realised I could actually turn this passion into a business — and enjoy what I do.' },
  { year: '2025', title: "Maro's Loop Lab was born", desc: 'Launched the Instagram and TikTok pages, took on custom orders, and started shipping interstate for the first time.' },
  { year: 'Today', title: '50+ pieces and counting', desc: "Customers from all over Nigeria. Every single piece still made by my own two hands — and I wouldn't have it any other way." },
]

export default function About() {
  useDocumentTitle("About Maro — Maro's Loop Lab")

  return (
    <>
      <section className="grid grid-cols-2 items-start max-md:grid-cols-1">
        <div className="relative aspect-[4/5] overflow-hidden bg-rose-lt md:sticky md:top-14 md:aspect-auto md:h-[calc(100svh-3.5rem)] md:max-h-[880px] md:min-h-[560px]">
          <img
            src="/images/products/heritage-maxi-dress.jpg"
            alt="Maro wearing one of her handmade granny-square cardigans"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 block h-full w-full object-cover object-[50%_30%] brightness-90"
          />
        </div>
        <div className="flex flex-col justify-center px-16 py-16 max-md:px-8 max-md:py-12 md:min-h-[min(calc(100svh-3.5rem),880px)]">
          <div className="mb-4 text-left text-[0.7rem] font-semibold tracking-[0.2em] text-rose uppercase">
            The woman behind the loop
          </div>
          <h1 className="mb-6 font-display text-[2.8rem] leading-[1.2] text-walnut">
            Hi, I'm <em className="font-fun text-coral not-italic">Maro.</em>
          </h1>
          <p className="mb-4 max-w-[520px] text-base leading-[1.85] text-muted">
            At Maro's Loop Lab, we celebrate the art of bespoke craftsmanship — one-of-a-kind
            crochet pieces tailored to reflect <strong className="font-medium text-walnut">your</strong>{' '}
            individuality. Inspired by the legacy of specialized artisans, we honor the beauty of
            slow, thoughtful creation in a world of mass production.
          </p>
          <p className="mb-4 max-w-[520px] text-base leading-[1.85] text-muted">
            My journey with crochet began back in secondary school, when I first discovered the
            craft and fell in love with creating things with my own hands. Life took me in
            different directions for years, and my hooks got put aside — but the love for it
            never truly left.
          </p>
          <p className="mb-4 max-w-[520px] text-base leading-[1.85] text-muted">
            In 2023, my cousin asked if I still knew how to crochet. That simple question brought
            back a part of me I'd almost forgotten. I picked up a hook again, and with it came all
            the passion, creativity and love for the craft I'd once known.
          </p>
          <p className="mb-4 max-w-[520px] text-base leading-[1.85] text-muted">
            What started as something I learned as a teenager has become something much deeper —{' '}
            <strong className="font-medium text-walnut">
              a creative journey that's grown into the business and dream I'm building today
            </strong>
            .
          </p>
          <div className="mt-6 font-display text-[1.4rem] text-rose italic">— Maro</div>
        </div>
      </section>

      <section className="bg-off px-8 py-20">
        <Reveal className="pt-0 pb-10 text-center">
          <div className="mb-3 text-[0.7rem] font-semibold tracking-[0.2em] text-rose uppercase">
            What I believe in
          </div>
          <h2 className="font-display text-[2.2rem] text-walnut">
            The <em className="font-fun text-coral not-italic">Loop Lab</em> way
          </h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-[900px] grid-cols-3 gap-8 max-md:grid-cols-1">
          {VALUES.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 80}
              className="rounded-xl border border-linen bg-parch p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-lt text-[1.3rem]" aria-hidden="true">
                {v.icon}
              </div>
              <h3 className="mb-2 font-display text-[1.05rem] font-medium text-walnut">
                {v.title}
              </h3>
              <div className="text-[0.9rem] leading-[1.7] text-muted">{v.desc}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[700px] px-8 pt-16 pb-8">
        <Reveal className="pb-10 text-left">
          <div className="mb-3 text-[0.7rem] font-semibold tracking-[0.2em] text-rose uppercase">
            The journey
          </div>
          <h2 className="font-display text-[2.2rem] text-walnut">
            How we <em className="font-fun text-coral not-italic">got here</em>
          </h2>
        </Reveal>
        <div className="mx-auto max-w-[700px] py-8">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.year} delay={i * 80} className="relative mb-10 flex gap-8 last:mb-0">
              {i < TIMELINE.length - 1 && (
                <div className="absolute top-[42px] bottom-[-2.5rem] left-[19px] w-px bg-linen" />
              )}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[2.5px] border-rose bg-rose-lt">
                <div className="h-2.5 w-2.5 rounded-full bg-rose" />
              </div>
              <div>
                <div className="mb-1 text-[0.7rem] font-semibold tracking-[0.15em] text-rose uppercase">
                  {item.year}
                </div>
                <h3 className="mb-1 font-display text-[1.1rem] font-medium text-walnut">
                  {item.title}
                </h3>
                <div className="text-[0.92rem] leading-[1.7] text-muted">
                  {item.desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="bg-[color-mix(in_srgb,var(--color-rose-lt)_38%,var(--color-parch)_62%)] px-8 py-20 text-center">
        <h2 className="mb-4 font-display text-[2.2rem] text-walnut">
          Want to own a piece of the loop?
        </h2>
        <p className="mx-auto mb-8 max-w-[440px] text-[1.05rem] leading-[1.7] text-muted">
          Browse the gallery, find something you love, and send me a message. I'd love to make
          something for you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/gallery"
            className="inline-block rounded-full bg-rose px-7 py-3 text-[0.9rem] font-semibold tracking-[0.08em] text-parch uppercase transition-colors hover:bg-rose-deep"
          >
            See the collection
          </Link>
          <Link
            to="/contact"
            className="inline-block rounded-full border-[1.5px] border-linen px-7 py-3 text-[0.9rem] font-semibold tracking-[0.08em] text-walnut uppercase transition-colors hover:border-rose hover:text-rose"
          >
            Get in touch
          </Link>
        </div>
      </Reveal>

      <Footer />
    </>
  )
}
