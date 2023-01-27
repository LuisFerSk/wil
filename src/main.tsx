import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.module.css'
import { HashRouter } from 'react-router-dom'
import ThemeConfig from 'theme'
import { BreakpointsInterface, CustomPaletteInterface, CustomShadowsInterface, ShapeInterface } from 'interfaces'

declare module '@mui/material/styles' {
  interface Theme {
    palette: CustomPaletteInterface
    breakpoints: BreakpointsInterface
    shape: ShapeInterface
    customShadows: CustomShadowsInterface
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeConfig>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeConfig>
  </React.StrictMode>
)
