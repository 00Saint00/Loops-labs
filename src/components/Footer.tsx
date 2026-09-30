import { EMAIL, INSTAGRAM_URL, WHATSAPP_NUMBER } from '../lib/contact'

interface FooterProps {
  showEmail?: boolean
}

export default function Footer({ showEmail = false }: FooterProps) {
  return (
    <>
      <footer className="grid grid-cols-[2fr_1fr_1fr] gap-12 bg-walnut px-10 pt-12 pb-8 max-md:grid-cols-1 max-md:gap-8">
        <div>
          <div className="mb-3 font-display text-[1.1rem] text-parch">
            Maro's <span className="text-coral italic">Loop Lab</span>
          </div>
          <div className="max-w-[260px] text-[0.82rem] leading-[1.7] font-light text-parch/65">
            Handcrafted crochet &amp; knitwear, made in Lagos. Delivered nationwide with love.
          </div>
        </div>
        <div>
          <h5 className="mb-4 text-[0.72rem] font-semibold tracking-[0.15em] text-rose-lt/55 uppercase">
            Pages
          </h5>
          <ul className="space-y-[0.6rem]">
            <li>
              <a href="/" className="text-[0.82rem] font-light text-parch/65 hover:text-parch">
                Home
              </a>
            </li>
            <li>
              <a
                href="/gallery"
                className="text-[0.82rem] font-light text-parch/65 hover:text-parch"
              >
                Gallery
              </a>
            </li>
            <li>
              <a href="/about" className="text-[0.82rem] font-light text-parch/65 hover:text-parch">
                About Maro
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-[0.82rem] font-light text-parch/65 hover:text-parch"
              >
                Request a piece
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 text-[0.72rem] font-semibold tracking-[0.15em] text-rose-lt/55 uppercase">
            Connect
          </h5>
          <ul className="space-y-[0.6rem]">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.82rem] font-light text-parch/65 hover:text-parch"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.82rem] font-light text-parch/65 hover:text-parch"
              >
                WhatsApp
              </a>
            </li>
            {showEmail && (
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-[0.82rem] font-light text-parch/65 hover:text-parch"
                >
                  {EMAIL}
                </a>
              </li>
            )}
          </ul>
        </div>
      </footer>
      <div className="border-t border-rose-lt/18 bg-walnut px-10 py-4 text-center text-[0.72rem] tracking-[0.06em] text-parch/45">
        © 2025 Maro's Loop Lab · A story in every loop · Made with love in Lagos
      </div>
    </>
  )
}
