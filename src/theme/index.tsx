import { useMemo } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'

import shape from './shape'
import palette from './palette'
import typography from './typography'
import breakpoints from './breakpoints'

import shadows, { customShadows } from './shadows'
import ComponentsOverrides from './overrides'

interface Props {
  children: JSX.Element
}

export default function ThemeConfig(props: Props) {
  const { children } = props

  const themeOptions = useMemo(() => ({
    breakpoints,
    palette,
    shape,
    typography,
    shadows,
    customShadows,
  }), [])

  const theme = createTheme(themeOptions)
  theme.components = ComponentsOverrides(theme)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
