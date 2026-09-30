import { useEffect, useRef, useState } from 'react'
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
  { x: 300, y: 300, w: 300, h: 400, cat: 'dresses', title: 'Ivory Halter Dress', tag: 'Dresses', desc: 'Open-stitch crochet mini dress in undyed cotton, tied at the bust with a self-fabric bow. Fully lined, made to measure.', img: '/images/products/ivory-halter-dress.jpg' },
  { x: 1250, y: 200, w: 320, h: 420, cat: 'tops', title: 'Ocean Breeze Cardigan', tag: 'Tops & Cardigans', desc: 'Granny-square cardigan in shades of blue, white and black. Open front, kimono sleeves — a statement layer for cooler evenings.', img: '/images/products/ocean-breeze-cardigan.jpg' },
  { x: 2250, y: 500, w: 380, h: 500, cat: 'dresses', title: 'Heritage Maxi Dress', tag: 'Dresses', desc: 'Floor-length granny-square dress in cream, blush and berry. Every square hand-joined — no two dresses ever match exactly.', img: '/images/products/heritage-maxi-dress-studio.jpg' },
  { x: 1800, y: 1150, w: 300, h: 400, cat: 'dresses', title: 'Violet Fringe Dress', tag: 'Dresses', desc: 'Fitted knit dress in deep violet with a hand-knotted fringe hem. Sleeveless, lined, made to order.', img: '/images/products/violet-fringe-dress.jpg' },
  { x: 3650, y: 1150, w: 320, h: 420, cat: 'tops', title: 'Violet Bloom Cardigan', tag: 'Tops & Cardigans', desc: 'Granny-square cardigan in violet, lilac and cream. Relaxed kimono fit, endlessly cosy.', img: '/images/products/violet-bloom-cardigan.jpg' },
  { x: 2600, y: 1550, w: 280, h: 400, cat: 'tops', title: 'Sunset Polo', tag: 'Tops & Cardigans', desc: 'Open-stitch crochet polo in hot pink. Breathable, relaxed fit — as easy over swimwear as it is with tailored trousers.', img: '/images/products/sunset-polo.jpg' },
  { x: 1350, y: 1800, w: 320, h: 420, cat: 'tops', title: 'Cherry Blossom Cardigan', tag: 'Tops & Cardigans', desc: 'Granny-square cardigan in cherry red, pink and cream. Dramatic bell sleeves, ribbed cuffs, endlessly photogenic.', img: '/images/products/cherry-blossom-cardigan.jpg' },
]

const PLANE_WIDTH = 4600
const PLANE_HEIGHT = 2600

export default function Gallery() {
  useDocumentTitle("The Collection — Maro's Loop Lab")

  const stageRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  const [dragging, setDragging] = useState(false)
  const [hintFaded, setHintFaded] = useState(false)
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  const offset = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0, originX: 0, originY: 0 })
  const dragMoved = useRef(false)
  const interacted = useRef(false)

  useEffect(() => {
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
    }

    const center = () => {
      offset.current.x = (stage.clientWidth - plane.offsetWidth) / 2
      offset.current.y = (stage.clientHeight - plane.offsetHeight) / 2
      apply()
    }

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
    const handleResize = () => apply()

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

  const openItem = (item: GalleryItem) => {
    if (dragMoved.current) return
    setSelected(item)
  }

  return (
    <>
      <section
        ref={stageRef}
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

        <div
          ref={planeRef}
          className="absolute top-0 left-0 will-change-transform"
          style={{ width: PLANE_WIDTH, height: PLANE_HEIGHT }}
        >
          {ITEMS.map((item) => (
            <button
              key={item.title}
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
      </section>

      <div
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
                type="button"
                onClick={() => setSelected(null)}
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
