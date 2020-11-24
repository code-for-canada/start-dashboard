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
    margin: theme.spacing(3)
  }
}))

export default useUtilityClasses
