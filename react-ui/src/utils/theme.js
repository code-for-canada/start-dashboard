import { createMuiTheme } from '@material-ui/core/styles'

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
      fontWeight: 'normal',
      marginBottom: '0.5em'
    },
    h2: {
      fontWeight: 'normal',
      marginBottom: '0.5em'
    },
    h3: {
      fontWeight: 'normal',
      marginBottom: '0.5em'
    }
  }
})

export default theme
