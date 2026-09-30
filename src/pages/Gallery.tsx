import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'

interface GalleryItem {
  x: number
  y: number
  w: number
  h: number
  cat: string
  title: string
  tag: string
  desc: string
  img: string
}

const ITEMS: GalleryItem[] = [
  { x: 180, y: 180, w: 180, h: 240, cat: 'dresses', title: 'Ivory Halter Dress', tag: 'Dresses', desc: 'Open-stitch crochet mini dress in undyed cotton, tied at the bust with a self-fabric bow. Fully lined, made to measure.', img: '/images/products/ivory-halter-dress.jpg' },
  { x: 750, y: 120, w: 192, h: 252, cat: 'tops', title: 'Ocean Breeze Cardigan', tag: 'Tops & Cardigans', desc: 'Granny-square cardigan in shades of blue, white and black. Open front, kimono sleeves — a statement layer for cooler evenings.', img: '/images/products/ocean-breeze-cardigan.jpg' },
  { x: 1350, y: 300, w: 228, h: 300, cat: 'dresses', title: 'Heritage Maxi Dress', tag: 'Dresses', desc: 'Floor-length granny-square dress in cream, blush and berry. Every square hand-joined — no two dresses ever match exactly.', img: '/images/products/heritage-maxi-dress-studio.jpg' },
  { x: 1080, y: 690, w: 180, h: 240, cat: 'dresses', title: 'Violet Fringe Dress', tag: 'Dresses', desc: 'Fitted knit dress in deep violet with a hand-knotted fringe hem. Sleeveless, lined, made to order.', img: '/images/products/violet-fringe-dress.jpg' },
  { x: 220, y: 1125, w: 192, h: 252, cat: 'tops', title: 'Violet Bloom Cardigan', tag: 'Tops & Cardigans', desc: 'Granny-square cardigan in violet, lilac and cream. Relaxed kimono fit, endlessly cosy.', img: '/images/products/violet-bloom-cardigan.jpg' },
  { x: 1560, y: 930, w: 168, h: 240, cat: 'tops', title: 'Sunset Polo', tag: 'Tops & Cardigans', desc: 'Open-stitch crochet polo in hot pink. Breathable, relaxed fit — as easy over swimwear as it is with tailored trousers.', img: '/images/products/sunset-polo.jpg' },
  { x: 810, y: 1080, w: 192, h: 252, cat: 'tops', title: 'Cherry Blossom Cardigan', tag: 'Tops & Cardigans', desc: 'Granny-square cardigan in cherry red, pink and cream. Dramatic bell sleeves, ribbed cuffs, endlessly photogenic.', img: '/images/products/cherry-blossom-cardigan.jpg' },
  { x: 1950, y: 60, w: 190, h: 252, cat: 'tops', title: 'Colorblock Crew Sweater', tag: 'Tops & Cardigans', desc: 'Chunky knit crewneck in black with blue and cream colour-block panels. Ribbed cuffs and hem, unisex fit.', img: '/images/products/colorblock-sweater.jpg' },
  { x: 2304, y: 500, w: 180, h: 240, cat: 'hats', title: 'Ivory Trim Sun Hat', tag: 'Hats', desc: 'Open-stitch crochet sun hat in undyed cotton with a blue and brown trim border. Wide brim, breathable weave.', img: '/images/products/ivory-sun-hat.jpg' },
  { x: 525, y: 567, w: 220, h: 222, cat: 'swim', title: 'Violet Bloom Bikini', tag: 'Swimwear', desc: 'Two-piece crochet bikini in violet with hand-crocheted flower appliqués. Adjustable ties, fully lined.', img: '/images/products/violet-bikini-set.jpg' },
  { x: 1950, y: 950, w: 190, h: 280, cat: 'tops', title: 'Ivory Stripe Polo Co-ord', tag: 'Tops & Cardigans', desc: 'Open-stitch button-front polo and matching shorts in ivory with a contrast stripe. Sold as a set.', img: '/images/products/ivory-stripe-polo-set.jpg' },
  { x: 2350, y: 1100, w: 180, h: 240, cat: 'hats', title: 'Violet Leaf Bucket Hat', tag: 'Hats', desc: 'Crochet bucket hat in deep violet with a hand-crocheted leaf appliqué. Ruffled brim, one size.', img: '/images/products/violet-leaf-bucket-hat.jpg' },
]

// Reference size the ITEMS coordinates above were designed at. The actual
// rendered plane is this design scaled up/down to fit however large the
// visitor's screen actually is (see layout() below), so the collection
// fills the available width instead of sitting cramped in one corner on
// wide screens, or requiring huge drags on narrow ones. MIN_SCALE stops
// items shrinking to illegible thumbnails on narrow phone screens.
const DESIGN_WIDTH = 2760
const DESIGN_HEIGHT = 1560
const OVERFLOW = 1.15
const MIN_SCALE = 0.55

// Centre of the overall bounding box of every item — NOT a density-weighted
// average of item centres. A plain average skews toward wherever items are
// clustered, which pulls the "middle" of the view off toward one edge when
// items aren't evenly spread; the bounding-box midpoint always keeps the
// full span of the collection symmetric around the viewport.
const ITEMS_BOUNDS = {
  minX: Math.min(...ITEMS.map((i) => i.x)),
  maxX: Math.max(...ITEMS.map((i) => i.x + i.w)),
  minY: Math.min(...ITEMS.map((i) => i.y)),
  maxY: Math.max(...ITEMS.map((i) => i.y + i.h)),
}
const ITEMS_CENTER = {
  x: (ITEMS_BOUNDS.minX + ITEMS_BOUNDS.maxX) / 2,
  y: (ITEMS_BOUNDS.minY + ITEMS_BOUNDS.maxY) / 2,
}

export default function Gallery() {
  useDocumentTitle("The Collection — Maro's Loop Lab")

  const stageRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const modalCloseRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const scaleRef = useRef(1)

  const [dragging, setDragging] = useState(false)
  const [hintFaded, setHintFaded] = useState(false)
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const [directionHint, setDirectionHint] = useState({ show: false, angle: 0 })

  const offset = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0, originX: 0, originY: 0 })
  const dragMoved = useRef(false)
  const interacted = useRef(false)

  const updateDirectionHint = () => {
    const stage = stageRef.current
    if (!stage) return
    const scale = scaleRef.current

    const left = -offset.current.x
    const top = -offset.current.y
    const right = left + stage.clientWidth
    const bottom = top + stage.clientHeight

    const isVisible = ITEMS.some(
      (item) =>
        item.x * scale < right &&
        (item.x + item.w) * scale > left &&
        item.y * scale < bottom &&
        (item.y + item.h) * scale > top,
    )
    if (isVisible) {
      setDirectionHint((h) => (h.show ? { show: false, angle: 0 } : h))
      return
    }

    const cx = left + stage.clientWidth / 2
    const cy = top + stage.clientHeight / 2
    let nearest = ITEMS[0]
    let bestDist = Infinity
    for (const item of ITEMS) {
      const icx = (item.x + item.w / 2) * scale
      const icy = (item.y + item.h / 2) * scale
      const dist = (icx - cx) ** 2 + (icy - cy) ** 2
      if (dist < bestDist) {
        bestDist = dist
        nearest = item
      }
    }
    const angle =
      Math.atan2((nearest.y + nearest.h / 2) * scale - cy, (nearest.x + nearest.w / 2) * scale - cx) *
      (180 / Math.PI)
    setDirectionHint({ show: true, angle })
  }

  useLayoutEffect(() => {
    const stage = stageRef.current
    const plane = planeRef.current
    if (!stage || !plane) return

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

    const apply = () => {
      const minX = Math.min(stage.clientWidth - plane.offsetWidth, 0)
      const minY = Math.min(stage.clientHeight - plane.offsetHeight, 0)
      offset.current.x = clamp(offset.current.x, minX, 0)
      offset.current.y = clamp(offset.current.y, minY, 0)
      plane.style.transform = `translate(${offset.current.x}px, ${offset.current.y}px)`
      updateDirectionHint()
    }

    const layout = () => {
      const scale = Math.max(MIN_SCALE, (stage.clientWidth * OVERFLOW) / DESIGN_WIDTH)
      scaleRef.current = scale
      plane.style.width = `${DESIGN_WIDTH * scale}px`
      plane.style.height = `${DESIGN_HEIGHT * scale}px`
      ITEMS.forEach((item, i) => {
        const el = itemRefs.current[i]
        if (!el) return
        el.style.left = `${item.x * scale}px`
        el.style.top = `${item.y * scale}px`
        el.style.width = `${item.w * scale}px`
        el.style.height = `${item.h * scale}px`
      })
    }

    const center = () => {
      const scale = scaleRef.current
      offset.current.x = stage.clientWidth / 2 - ITEMS_CENTER.x * scale
      offset.current.y = stage.clientHeight / 2 - ITEMS_CENTER.y * scale
      apply()
    }

    layout()
    center()

    const handleLoad = () => {
      if (!interacted.current) center()
    }
    const handlePointerDown = (e: PointerEvent) => {
      setDragging(true)
      interacted.current = true
      dragMoved.current = false
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        originX: offset.current.x,
        originY: offset.current.y,
      }
    }
    const handleDragStart = (e: DragEvent) => e.preventDefault()
    const handleResize = () => {
      layout()
      apply()
    }

    stage.addEventListener('dragstart', handleDragStart)
    stage.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('load', handleLoad)
    window.addEventListener('resize', handleResize)

    return () => {
      stage.removeEventListener('dragstart', handleDragStart)
      stage.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!dragging) return
    const plane = planeRef.current
    const stage = stageRef.current
    if (!plane || !stage) return

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
    const apply = () => {
      const minX = Math.min(stage.clientWidth - plane.offsetWidth, 0)
      const minY = Math.min(stage.clientHeight - plane.offsetHeight, 0)
      offset.current.x = clamp(offset.current.x, minX, 0)
      offset.current.y = clamp(offset.current.y, minY, 0)
      plane.style.transform = `translate(${offset.current.x}px, ${offset.current.y}px)`
      updateDirectionHint()
    }

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        dragMoved.current = true
        setHintFaded(true)
      }
      offset.current.x = dragStart.current.originX + dx
      offset.current.y = dragStart.current.originY + dy
      apply()
    }
    const endDrag = () => setDragging(false)

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointercancel', endDrag)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointercancel', endDrag)
    }
  }, [dragging])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (selected) {
      previouslyFocused.current = document.activeElement as HTMLElement | null
      modalCloseRef.current?.focus()
    } else {
      previouslyFocused.current?.focus()
    }
  }, [selected])

  const openItem = (item: GalleryItem) => {
    if (dragMoved.current) return
    setSelected(item)
  }

  return (
    <>
      <section
        ref={stageRef}
        inert={Boolean(selected)}
        className={`relative h-screen touch-none overflow-hidden bg-parch select-none ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div className="pointer-events-none absolute top-22 left-10 z-[2] select-none max-md:left-5">
          <div className="mb-3 text-[0.7rem] font-semibold tracking-[0.2em] text-rose uppercase">
            The Collection
          </div>
          <h1 className="font-display text-[2.4rem] text-walnut max-md:text-[1.9rem]">
            Drag to <em className="font-fun text-coral not-italic">explore</em>
          </h1>
        </div>

        <div ref={planeRef} className="absolute top-0 left-0 will-change-transform">
          {ITEMS.map((item, i) => (
            <button
              key={item.title}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              type="button"
              onClick={() => openItem(item)}
              data-cat={item.cat}
              className="group absolute cursor-pointer overflow-hidden rounded-lg text-left"
              style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
            >
              <img
                src={item.img}
                alt={`${item.title} — ${item.tag}`}
                loading="lazy"
                draggable={false}
                className="block h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
              />
              <div className="absolute bottom-2.5 left-2.5 rounded-full bg-[color-mix(in_srgb,var(--color-walnut)_80%,transparent)] px-3 py-1.5 text-[0.66rem] tracking-[0.08em] text-parch uppercase opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100">
                {item.title}
              </div>
            </button>
          ))}
        </div>

        <div
          ref={hintRef}
          className={`pointer-events-none absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--color-walnut)_85%,transparent)] px-5 py-2.5 text-[0.68rem] tracking-[0.15em] whitespace-nowrap text-parch uppercase transition-opacity duration-400 select-none ${
            hintFaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Drag to explore · tap a piece to view
        </div>

        <div
          className={`pointer-events-none absolute top-1/2 left-1/2 z-[3] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-opacity duration-300 select-none ${
            directionHint.show ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="font-display text-[2.6rem] text-rose transition-transform duration-200"
            style={{ transform: `rotate(${directionHint.angle}deg)` }}
          >
            →
          </div>
          <div className="rounded-full bg-[color-mix(in_srgb,var(--color-walnut)_85%,transparent)] px-4 py-2 text-[0.66rem] tracking-[0.15em] whitespace-nowrap text-parch uppercase">
            Drag this way
          </div>
        </div>
      </section>

      <div
        role="dialog"
        aria-modal="true"
        aria-label={selected?.title}
        className={`fixed inset-0 z-[500] items-center justify-center bg-[rgba(30,18,10,0.88)] p-6 ${
          selected ? 'flex' : 'hidden'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null)
        }}
      >
        {selected && (
          <div className="relative w-full max-w-[480px]">
            <div className="flex max-h-[90vh] w-full max-w-[480px] flex-col overflow-y-auto rounded-2xl bg-parch">
              <button
                ref={modalCloseRef}
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-parch/90 text-base text-muted hover:text-walnut"
              >
                ✕
              </button>
              <div className="flex max-h-[55vh] w-full items-center justify-center rounded-t-2xl bg-off">
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="max-h-[55vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="px-8 py-7">
                <div className="mb-1.5 text-[0.7rem] font-semibold tracking-[0.15em] text-rose uppercase">
                  {selected.tag}
                </div>
                <div className="mb-2.5 font-display text-[1.4rem] text-walnut">
                  {selected.title}
                </div>
                <div className="mb-5 text-[0.88rem] leading-[1.75] font-light text-muted">
                  {selected.desc}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/contact?piece=${encodeURIComponent(selected.title)}&tag=${encodeURIComponent(selected.tag)}&cat=${encodeURIComponent(selected.cat)}&img=${encodeURIComponent(selected.img)}`}
                    className="inline-block rounded-full bg-rose px-7 py-3 text-[0.82rem] font-semibold tracking-[0.08em] text-parch uppercase transition-colors hover:bg-rose-deep"
                  >
                    Request this piece
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="inline-block rounded-full border-[1.5px] border-linen px-7 py-3 text-[0.82rem] font-semibold tracking-[0.08em] text-walnut uppercase transition-colors hover:border-rose hover:text-rose"
                  >
                    Back to gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
