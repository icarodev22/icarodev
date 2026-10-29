import { Footer } from '../components/Footer'
import { InstagramIcon } from '../components/icons'
import { VideoPlayer } from '../components/VideoPlayer'
import { contacts } from '../content'
import { logo } from '../media'
import { videos } from '../videos'
import './videos.css'

/**
 * Página dedicada aos vídeos de shows (/videos/). Mostra apenas os vídeos e
 * o rodapé; o retorno leva ao topo da página principal.
 */
export function VideosPage() {
  return (
    <>
      <header className="vhead">
        <a href="/" className="vhead__logo" aria-label="BAYMA, página inicial">
          <img src={logo.white} width={logo.width} height={logo.height} alt="" />
        </a>
        <a href="/" className="btn btn--light btn--caps vhead__back">
          VOLTAR AO INÍCIO
        </a>
      </header>

      <main className="videos">
        <h1 className="title videos__title">
          Vídeos <span>de shows</span>
        </h1>

        {videos.length > 0 ? (
          <ul className="videos__list">
            {videos.map((v) => (
              <li key={v.type === 'file' ? v.src : v.id} className={v.height > v.width ? 'is-vertical' : ''}>
                <VideoPlayer video={v} />
                <p className="videos__name">{v.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="videos__empty">
            <p>Nenhum vídeo publicado ainda.</p>
            <a className="btn btn--ghost" href={contacts.instagram.href} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              {contacts.instagram.display}
            </a>
          </div>
        )}
      </main>

      <Footer home="/" />
    </>
  )
}
