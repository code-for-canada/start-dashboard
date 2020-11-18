import React from 'react'
import PropTypes from 'prop-types'

import NavBar from 'components/common/NavBar'
import Footer from 'components/common/Footer'

const DefaultLayout = ({ children }) => {
  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
DefaultLayout.propTypes = {
  children: PropTypes.node
}

export default DefaultLayout
