import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import NavBar from 'components/common/NavBar'
import Footer from 'components/common/Footer'

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.background.default,
    flex: '1 1 auto'
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
}))

const DefaultLayout = ({ children }) => {
  const classes = useStyles()
  return (
    <div id="app" className={classes.app}>
      <NavBar />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  )
}
DefaultLayout.propTypes = {
  children: PropTypes.node
}

export default DefaultLayout
