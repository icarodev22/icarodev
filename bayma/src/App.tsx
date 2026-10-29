import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Historia } from './sections/Historia'
import { Shows } from './sections/Shows'
import { Galeria } from './sections/Galeria'
import { Contato } from './sections/Contato'
import { useReveal } from './hooks/useReveal'
import { useParallax } from './hooks/useParallax'

export default function App() {
  useReveal()
  useParallax()
  return (
    <>
      <a className="skip" href="#historia">
        Pular para o conteúdo
      </a>
      <Nav />
      <main>
        <Hero />
        <Historia />
        <Shows />
        <Galeria />
        <Contato />
      </main>
      <Footer />
    </>
  )
}
