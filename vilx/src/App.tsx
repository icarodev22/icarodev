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
        <span className="display footer__sign">
          <em>VILX,</em> bola outra
        </span>
        <span className="mono">
          © {new Date().getFullYear()} {artist.name} · {artist.origin}
        </span>
      </footer>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
