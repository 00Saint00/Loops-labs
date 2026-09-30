import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'

function CountUp({ end, duration = 1400 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const played = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const animate = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min(Math.max((now - start) / duration, 0), 1)
        const eased = 1 - (1 - progress) ** 3
        setValue(Math.round(eased * end))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true
          animate()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{value}+</span>
}

const FEATURED = [
  {
    title: 'Heritage Maxi Dress',
    tag: 'Dresses',
    img: '/images/products/heritage-maxi-dress-studio.jpg',
    tall: true,
  },
  {
    title: 'Ivory Halter Dress',
    tag: 'Dresses',
    img: '/images/products/ivory-halter-dress.jpg',
  },
  {
    title: 'Cherry Blossom Cardigan',
    tag: 'Tops & Cardigans',
    img: '/images/products/cherry-blossom-cardigan.jpg',
  },
  {
    title: 'Violet Fringe Dress',
    tag: 'Dresses',
    img: '/images/products/violet-fringe-dress.jpg',
  },
  {
    title: 'Berry Blossom Cardigan',
    tag: 'Tops & Cardigans',
    img: '/images/products/berry-blossom-cardigan.jpg',
  },
]

const PROCESS_STEPS = [
  { title: 'Browse & choose', desc: 'Find a piece you love in the gallery — or describe your dream item.' },
  { title: 'Send a request', desc: 'Fill out the contact form with colours, size, and any custom details.' },
  { title: 'We confirm & create', desc: 'Maro gets to work — most pieces take 1–2 weeks to complete.' },
  { title: 'Receive with love', desc: 'Your piece is packaged and delivered anywhere in Nigeria.' },
]

const TESTIMONIALS = [
  {
    text: '"Ordered a custom cardigan and it arrived in 12 days looking exactly like we planned. The quality is better than anything I\'ve bought in a store."',
    author: 'Zara M. — Abuja',
  },
  {
    text: '"Maro\'s maxi dress is a conversation starter every single time I wear mine out. Three of my friends have ordered one since."',
    author: 'Adaeze O. — Lagos',
  },
  {
    text: '"I wanted something unique for my birthday shoot and Maro delivered. The dress was so beautiful people thought it was imported. Highly recommend."',
    author: 'Kemi T. — Port Harcourt',
  },
]

export default function Home() {
  useDocumentTitle("Maro's Loop Lab — Handcrafted Crochet, Made in Lagos")

  return (
    <>
      <section className="grid grid-cols-2 max-md:grid-cols-1">
        <div className="flex flex-col justify-center px-14 pt-20 pb-16 max-md:px-6 max-md:py-12">
          <div className="mb-5 text-[0.7rem] font-semibold tracking-[0.2em] text-rose uppercase">
            Handcrafted in Lagos · Made to order
          </div>
          <h1 className="mb-6 font-display text-[3.6rem] leading-[1.1] text-walnut max-md:text-[2.6rem]">
            Woven with
            <br />
            love, worn
            <br />
            with <em className="font-fun text-coral not-italic">pride.</em>
          </h1>
          <p className="mb-10 max-w-[400px] text-base leading-[1.8] font-light text-muted">
            Every piece from Maro's Loop Lab is handcrafted to order — no fast fashion, no
            shortcuts. Just yarn, skill, and a whole lot of heart.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/gallery"
              className="inline-block rounded-full bg-rose px-7 py-3 text-[0.82rem] font-semibold tracking-[0.08em] text-parch uppercase transition-colors hover:bg-rose-deep"
            >
              Browse the collection
            </Link>
            <Link
              to="/contact"
              className="inline-block rounded-full border-[1.5px] border-linen px-7 py-3 text-[0.82rem] font-semibold tracking-[0.08em] text-walnut uppercase transition-colors hover:border-rose hover:text-rose"
            >
              Request a custom piece
            </Link>
          </div>
        </div>
        <div
          className="relative overflow-hidden max-md:aspect-[3/4]"
          style={{ backgroundColor: '#53301a', aspectRatio: '3 / 4' }}
        >
          <img
            src="/images/products/ocean-breeze-cardigan.jpg"
            alt="A handmade Maro's Loop Lab granny-square cardigan"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 block h-full w-full object-cover brightness-[0.92]"
          />
          <div className="absolute bottom-10 left-8 max-w-[200px] rounded-xl bg-parch px-5 py-4">
            <div className="font-display text-[2rem] leading-none text-rose">
              <CountUp end={30} />
            </div>
            <div className="mt-1 text-[0.72rem] leading-[1.4] font-medium text-muted">
              happy customers across Nigeria &amp; beyond
            </div>
          </div>
        </div>
      </section>

      <Reveal className="grid grid-cols-3 border-y border-linen">
        {[
          ['50+', 'Pieces made'],
          ['100%', 'Handmade, always'],
          ['3+', 'Years of craft'],
        ].map(([num, label], i) => (
          <div
            key={label}
            className={`px-6 py-8 text-center ${i < 2 ? 'border-r border-linen max-md:border-b max-md:border-r-0' : ''}`}
          >
            <div className="font-display text-[2.2rem] text-walnut">{num}</div>
            <div className="mt-1 text-[0.72rem] font-medium tracking-[0.12em] text-muted uppercase">
              {label}
            </div>
          </div>
        ))}
      </Reveal>

      <section>
        <Reveal className="px-8 pt-16 pb-10 text-center">
          <div className="mb-3 text-[0.7rem] font-semibold tracking-[0.2em] text-rose uppercase">
            Fresh from the loop
          </div>
          <div className="font-display text-[2.2rem] text-walnut">
            Recent <em className="font-fun text-coral not-italic">favourites</em>
          </div>
        </Reveal>
        <div className="mx-auto grid max-w-[1100px] grid-cols-[2fr_1fr_1fr] grid-rows-2 gap-3 px-8 pb-16 max-md:grid-cols-2">
          {FEATURED.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className={item.tall ? 'row-span-2' : ''}>
              <Link
                to="/gallery"
                className="group relative block overflow-hidden rounded-lg"
              >
                <img
                  src={item.img}
                  alt={`${item.title} — ${item.tag}`}
                  loading="lazy"
                  className={`block w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${item.tall ? 'h-[520px]' : 'h-[250px]'}`}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-walnut/65 to-transparent to-50% opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 left-0 translate-y-1 p-[1.1rem] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h4 className="font-display text-[0.95rem] text-parch">{item.title}</h4>
                  <p className="mt-0.5 text-[0.7rem] tracking-[0.06em] text-linen uppercase">
                    {item.tag}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-walnut px-8 py-20 text-center">
        <Reveal>
          <div className="mb-3 text-[0.7rem] font-semibold tracking-[0.2em] text-rose-lt/80 uppercase">
            How it works
          </div>
          <div className="font-display text-[2.2rem] text-parch">
            From request to <em className="font-fun text-rose-lt not-italic">your door</em>
          </div>
        </Reveal>
        <div className="relative mx-auto mt-12 flex max-w-[800px] justify-center max-md:mt-10 max-md:flex-col max-md:gap-10">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 80} className="relative flex-1 px-6">
              {i < PROCESS_STEPS.length - 1 && (
                <div className="absolute top-5 left-1/2 h-px w-full bg-rose-lt/30 max-md:hidden" />
              )}
              <div className="relative z-10 mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-rose-lt font-display text-base text-walnut">
                {i + 1}
              </div>
              <div className="mb-2 text-[0.82rem] font-semibold tracking-[0.08em] text-rose-lt uppercase">
                {step.title}
              </div>
              <div className="text-[0.82rem] leading-[1.6] font-light text-parch/82">
                {step.desc}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-off px-8 py-20">
        <Reveal className="pt-0 pb-10 text-center">
          <div className="mb-3 text-[0.7rem] font-semibold tracking-[0.2em] text-rose uppercase">
            What customers say
          </div>
          <div className="font-display text-[2.2rem] text-walnut">
            Worn &amp; <em className="font-fun text-coral not-italic">loved</em>
          </div>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-[1000px] grid-cols-3 gap-6 max-md:grid-cols-1">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.author}
              delay={i * 80}
              className="rounded-xl border border-linen bg-parch p-7"
            >
              <div className="mb-3 tracking-[2px] text-rose">★★★★★</div>
              <div className="mb-5 text-[0.88rem] leading-[1.75] font-light text-muted italic">
                {t.text}
              </div>
              <div className="text-[0.78rem] font-semibold tracking-[0.06em] text-walnut uppercase">
                {t.author}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="bg-[color-mix(in_srgb,var(--color-rose-lt)_38%,var(--color-parch)_62%)] px-8 py-20 text-center">
        <h2 className="mb-4 font-display text-[2.2rem] text-walnut">Something in mind?</h2>
        <p className="mx-auto mb-8 max-w-[420px] leading-[1.7] font-light text-muted">
          Every piece is made to order — bring your colours, your vision, your occasion. Maro
          will handle the rest.
        </p>
        <Link
          to="/contact"
          className="inline-block rounded-full bg-rose px-7 py-3 text-[0.82rem] font-semibold tracking-[0.08em] text-parch uppercase transition-colors hover:bg-rose-deep"
        >
          Start your request
        </Link>
      </Reveal>

      <Footer showEmail />
    </>
  )
}
