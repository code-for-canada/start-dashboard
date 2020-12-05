import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import App from 'app'
import Auth0ProviderWithHistory from 'components/Auth0ProviderWithHistory'
import theme from 'utils/theme'

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
)
