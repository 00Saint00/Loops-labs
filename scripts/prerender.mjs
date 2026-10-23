// Runs after both Vite builds (see "build" in package.json). Renders each page to static
// HTML so visitors and search engines get real content before any JavaScript runs;
// React then hydrates it in the browser.
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { render } from '../dist-server/entry-server.js'

const SITE = 'https://loops-labs.vercel.app'

const PAGES = [
  {
    url: '/',
    file: 'index.html',
    title: "Maro's Loop Lab — Handcrafted Crochet, Made in Lagos",
    description:
      'Handmade crochet dresses, cardigans and accessories, made to order in Lagos and delivered across Nigeria. No fast fashion — just yarn, skill and a whole lot of heart.',
  },
  {
    url: '/about',
    file: 'about.html',
    title: "About Maro — Maro's Loop Lab",
    description:
      "Meet Maro, the Lagos crochet maker behind Maro's Loop Lab. Every dress, cardigan and hat is designed and hand-crocheted by Maro, one stitch at a time.",
  },
  {
    url: '/gallery',
    file: 'gallery.html',
    title: "The Collection — Maro's Loop Lab",
    description:
      'Browse handmade crochet dresses, granny-square cardigans, polos, swimwear and hats. Every piece is made to order in Lagos — tap one to request it.',
  },
  {
    url: '/contact',
    file: 'contact.html',
    title: "Request a Piece — Maro's Loop Lab",
    description:
      'Order a handmade crochet piece or a custom design from Maro in Lagos. Send your colours, size and ideas by WhatsApp or email. Delivery across Nigeria.',
  },
]

// src/main.tsx only imports the React bundle (boot-*.js) after first paint; preload it so
// it downloads in parallel and is ready to run the moment it's asked for.
const boot = (await readdir('dist/assets')).find((f) => /^boot-.*\.js$/.test(f))
const template = (await readFile('dist/index.html', 'utf8')).replace(
  '</head>',
  `  <link rel="modulepreload" crossorigin href="/assets/${boot}">\n  </head>`,
)

// Unknown URLs (404s) still need the plain app shell, not the pre-rendered home page.
await writeFile('dist/spa.html', template)

for (const page of PAGES) {
  const appHtml = await render(page.url)
  const pageUrl = SITE + page.url
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*/, `$1${page.description}`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*/, `$1${page.description}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${page.title}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${pageUrl}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${pageUrl}`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  await writeFile(`dist/${page.file}`, html)
  console.log(`prerendered ${page.url} -> dist/${page.file}`)
}

await rm('dist-server', { recursive: true })
