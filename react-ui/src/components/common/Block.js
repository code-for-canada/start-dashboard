import React from 'react'
import PropTypes from 'prop-types'

const Block = ({ children, style }) => (
  <div className="panel outlined bg-white p-4" style={style}>
    {children}
  </div>
)

const BlockTitle = ({ title }) => <h2 className="mb-4">{title}</h2>

Block.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

BlockTitle.propTypes = {
  title: PropTypes.string
}

export { Block, BlockTitle }
