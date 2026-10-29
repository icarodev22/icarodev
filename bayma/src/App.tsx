import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Identidade } from './sections/Identidade'
import { Galeria } from './sections/Galeria'
import { Contato } from './sections/Contato'
import { useReveal } from './hooks/useReveal'
import { useParallax } from './hooks/useParallax'

export default function App() {
  useReveal()
  useParallax()
  return (
    <>
      <a className="skip" href="#identidade">
        Pular para o conteúdo
      </a>
      <Nav />
      <main>
        <Hero />
        <Identidade />
        <Galeria />
        <Contato />
      </main>
      <Footer />
    </>
  )
}
