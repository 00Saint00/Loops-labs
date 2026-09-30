import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../lib/contact'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const SIZE_HINTS: Record<string, string> = {
  dresses: 'e.g. bust, waist, and length preference…',
  tops: 'e.g. chest size and length preference…',
}

const CATEGORY_OPTIONS = [
  { value: '', label: 'Select a category' },
  { value: 'Dress', label: 'Dress' },
  { value: 'Top or Cardigan', label: 'Top or Cardigan' },
  { value: "Something custom — I'll describe below", label: "Something custom — I'll describe below" },
]

export default function Contact() {
  useDocumentTitle("Request a Piece — Maro's Loop Lab")

  const [params] = useSearchParams()
  const piece = params.get('piece')
  const tag = params.get('tag') || ''
  const cat = params.get('cat') || ''
  const img = params.get('img')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')
  const [colour, setColour] = useState('')
  const [size, setSize] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isPrefilled = Boolean(piece)
  const sizeHint = SIZE_HINTS[cat] || 'e.g. size, fit, or measurements you have in mind…'

  const handleSubmit = () => {
    const lines = ["Hello Maro! I'd like to request a piece 🧶"]
    if (isPrefilled && piece) lines.push(`Piece: ${piece}${tag ? ` (${tag})` : ''}`)
    else if (category) lines.push(`Looking for: ${category}`)

    const name = `${firstName} ${lastName}`.trim()
    if (name) lines.push(`Name: ${name}`)
    if (email.trim()) lines.push(`Email: ${email.trim()}`)
    if (phone.trim()) lines.push(`Phone: ${phone.trim()}`)
    if (isPrefilled && colour.trim()) lines.push(`Colour preference: ${colour.trim()}`)
    if (isPrefilled && size.trim()) lines.push(`Size / fit: ${size.trim()}`)
    if (notes.trim()) lines.push(`Details: ${notes.trim()}`)

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener')
    setSubmitted(true)
  }

  return (
    <>
      <section className="grid min-h-[560px] grid-cols-2 max-md:grid-cols-1">
        <div className="flex flex-col justify-center bg-walnut px-14 py-20 max-md:px-8 max-md:py-16">
          <div className="mb-4 text-left text-[0.7rem] font-semibold tracking-[0.2em] text-rose-lt uppercase">
            Get in touch
          </div>
          <h1 className="mb-5 font-display text-[2.6rem] leading-[1.25] text-parch">
            Let's make
            <br />
            something <em className="font-fun text-coral not-italic">beautiful</em>
            <br />
            together.
          </h1>
          <p className="mb-12 max-w-[360px] text-[0.9rem] leading-[1.8] font-light text-linen/70">
            Tell me what you have in mind — colours, occasion, size, or just a mood. I'll come
            back to you within 48 hours to talk it through.
          </p>

          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose/20 text-base">
              📧
            </div>
            <div>
              <div className="mb-1 text-[0.7rem] font-semibold tracking-[0.12em] text-rose-lt uppercase">
                Email
              </div>
              <div className="text-[0.88rem] leading-[1.5] font-light text-linen/85">
                {EMAIL}
              </div>
            </div>
          </div>
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose/20 text-base">
              📱
            </div>
            <div>
              <div className="mb-1 text-[0.7rem] font-semibold tracking-[0.12em] text-rose-lt uppercase">
                WhatsApp
              </div>
              <div className="text-[0.88rem] leading-[1.5] font-light text-linen/85">
                {WHATSAPP_DISPLAY}
                <br />
                <span className="text-[0.75rem] opacity-60">Mon–Sat, 9am–7pm WAT</span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose/20 text-base">
              📍
            </div>
            <div>
              <div className="mb-1 text-[0.7rem] font-semibold tracking-[0.12em] text-rose-lt uppercase">
                Based in
              </div>
              <div className="text-[0.88rem] leading-[1.5] font-light text-linen/85">
                Surulere, Lagos, Nigeria
                <br />
                <span className="text-[0.75rem] opacity-60">Nationwide delivery available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-parch px-14 py-20 max-md:px-8 max-md:py-16">
          <h2 className="mb-2 font-display text-[1.6rem] text-walnut">
            {isPrefilled ? 'Request this piece' : 'Request a piece'}
          </h2>
          <div className="mb-8 text-[0.85rem] leading-[1.6] font-light text-muted">
            {isPrefilled
              ? 'Maro will be in touch within 48 hours to confirm details and availability.'
              : 'Fill in the details below and Maro will be in touch within 48 hours.'}
          </div>

          {!submitted ? (
            <div>
              {isPrefilled && (
                <div className="mb-6 flex items-center gap-4 rounded-lg border-[1.5px] border-rose bg-rose-lt px-4 py-3.5">
                  {img && (
                    <img
                      src={img}
                      alt={piece ?? ''}
                      className="h-[52px] w-[52px] shrink-0 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <div className="mb-0.5 text-[0.65rem] font-semibold tracking-[0.12em] text-rose-deep uppercase">
                      {tag}
                    </div>
                    <div className="font-display text-base text-walnut">{piece}</div>
                  </div>
                  <Link
                    to="/contact"
                    className="ml-auto text-[0.72rem] font-medium whitespace-nowrap text-rose underline underline-offset-2"
                  >
                    Change piece
                  </Link>
                </div>
              )}

              <div className="mb-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div className="flex flex-col">
                  <label className="mb-2 text-[0.72rem] font-semibold tracking-[0.12em] text-muted uppercase">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Amara"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="rounded-lg border-[1.5px] border-linen bg-off px-4 py-3 font-body text-[0.88rem] font-light text-walnut outline-none focus:border-rose"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-[0.72rem] font-semibold tracking-[0.12em] text-muted uppercase">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Okafor"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-lg border-[1.5px] border-linen bg-off px-4 py-3 font-body text-[0.88rem] font-light text-walnut outline-none focus:border-rose"
                  />
                </div>
              </div>

              <div className="mb-4 flex flex-col">
                <label className="mb-2 text-[0.72rem] font-semibold tracking-[0.12em] text-muted uppercase">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="amara@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border-[1.5px] border-linen bg-off px-4 py-3 font-body text-[0.88rem] font-light text-walnut outline-none focus:border-rose"
                />
              </div>

              <div className="mb-4 flex flex-col">
                <label className="mb-2 text-[0.72rem] font-semibold tracking-[0.12em] text-muted uppercase">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-lg border-[1.5px] border-linen bg-off px-4 py-3 font-body text-[0.88rem] font-light text-walnut outline-none focus:border-rose"
                />
              </div>

              {!isPrefilled && (
                <div className="mb-4 flex flex-col">
                  <label className="mb-2 text-[0.72rem] font-semibold tracking-[0.12em] text-muted uppercase">
                    What are you looking for?
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-lg border-[1.5px] border-linen bg-off px-4 py-3 font-body text-[0.88rem] font-light text-walnut outline-none focus:border-rose"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {isPrefilled && (
                <>
                  <div className="my-5 h-px bg-linen" />
                  <div className="mb-4 flex flex-col">
                    <label className="mb-2 text-[0.72rem] font-semibold tracking-[0.12em] text-muted uppercase">
                      Colour preference
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. keep it dusty rose, or try sage green…"
                      value={colour}
                      onChange={(e) => setColour(e.target.value)}
                      className="rounded-lg border-[1.5px] border-linen bg-off px-4 py-3 font-body text-[0.88rem] font-light text-walnut outline-none focus:border-rose"
                    />
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label className="mb-2 text-[0.72rem] font-semibold tracking-[0.12em] text-muted uppercase">
                      Size or fit notes
                    </label>
                    <input
                      type="text"
                      placeholder={sizeHint}
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="rounded-lg border-[1.5px] border-linen bg-off px-4 py-3 font-body text-[0.88rem] font-light text-walnut outline-none focus:border-rose"
                    />
                  </div>
                </>
              )}

              <div className="mb-4 flex flex-col">
                <label className="mb-2 text-[0.72rem] font-semibold tracking-[0.12em] text-muted uppercase">
                  {isPrefilled ? 'Anything else?' : 'Tell me more'}
                </label>
                <textarea
                  rows={4}
                  placeholder={
                    isPrefilled
                      ? 'Any other details — occasion, deadline, special requests…'
                      : 'Colours you love, the occasion, any reference photos you have in mind, sizing…'
                  }
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[110px] resize-y rounded-lg border-[1.5px] border-linen bg-off px-4 py-3 font-body text-[0.88rem] leading-[1.6] font-light text-walnut outline-none focus:border-rose"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="inline-block rounded-full bg-rose px-7 py-3 text-[0.82rem] font-semibold tracking-[0.08em] text-parch uppercase transition-colors hover:bg-rose-deep"
              >
                Send my request
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-sage-lt bg-off p-8 text-center">
              <div className="mb-4 text-[2rem]">🧶</div>
              <h3 className="mb-2 font-display text-[1.3rem] text-walnut">
                Almost there — check WhatsApp!
              </h3>
              <p className="text-[0.85rem] leading-[1.6] font-light text-muted">
                Your request opened in WhatsApp with all the details filled in. Just hit send and
                Maro will reply directly. If nothing opened, allow pop-ups and try again.
              </p>
              <Link
                to="/gallery"
                className="mt-6 inline-block rounded-full border-[1.5px] border-linen px-7 py-3 text-[0.82rem] font-semibold tracking-[0.08em] text-walnut uppercase transition-colors hover:border-rose hover:text-rose"
              >
                Browse the gallery while you wait
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
