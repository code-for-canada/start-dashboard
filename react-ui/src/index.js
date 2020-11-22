import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import App from 'app'
import Auth0ProviderWithHistory from 'components/Auth0ProviderWithHistory'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004b84'
    },
    secondary: {
      main: '#b72941'
    }
  },
  typography: {
    fontFamily: ['Helvetica', 'Arial', 'Roboto', 'sans-serif'],
    h1: {
      fontWeight: 'normal'
    },
    h2: {
      fontWeight: 'normal'
    },
    h3: {
      fontWeight: 'normal'
    }
  }
})

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
)
