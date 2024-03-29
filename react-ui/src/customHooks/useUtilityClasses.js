import { makeStyles } from '@material-ui/core/styles'

const useUtilityClasses = makeStyles(theme => ({
  bgWhite: {
    backgroundColor: theme.palette.background.paper
  },
  shadow: {
    boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)'
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  horizListSpacing: {
    marginRight: theme.spacing(1)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  }
}))

export default useUtilityClasses
