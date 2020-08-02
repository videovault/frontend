import React from 'react'
import { render } from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { blue,red, amber } from '@material-ui/core/colors'
import App from './Components/App'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: blue.A400,
      light: amber[200],
      dark: amber[700]
    },
    type: 'light'
  },
  spacing: {
    unit: 10
  }
})

render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)
