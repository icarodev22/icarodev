import { Nav } from './components/Nav'
import { Intro } from './components/intro/Intro'
import { Historia } from './sections/Historia'
import { Lancamentos } from './sections/Lancamentos'
import { Shows } from './sections/Shows'
import { Contato } from './sections/Contato'
import { useReveal } from './hooks/useReveal'
import { useParallax } from './hooks/useParallax'
import { artist } from './content'

export default function App() {
  useReveal()
  useParallax()
  return (
    <>
      <a className="skip" href="#historia">
        Pular abertura
      </a>
      <Nav />
      <main id="top">
        <Intro />
        <Historia />
        <Lancamentos />
        <Shows />
        <Contato />
      </main>
      <footer className="footer">
        <p className="footer__sign">
          VILX, <span className="serif">bola outra</span>
        </p>
        <p className="t-meta">
          © {new Date().getFullYear()} {artist.name} · {artist.origin}
        </p>
      </footer>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
