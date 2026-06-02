import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyTheme, useUIStore } from '@/stores/ui-store'
import App from '@/app/App'
import '@/styles/globals.css'

const storedTheme = useUIStore.getState().theme
applyTheme(storedTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
