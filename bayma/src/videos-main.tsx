import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { VideosPage } from './pages/VideosPage'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideosPage />
  </StrictMode>,
)
