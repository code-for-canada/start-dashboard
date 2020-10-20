import React, { useState } from 'react'
import UnfoldLess from '@material-ui/icons/UnfoldLess'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import Edit from '@material-ui/icons/Edit'

const Panel = ({
  title,
  editLink,
  editText,
  isVisible,
  isSmall,
  index,
  children,
  toggleVisibility,
  toggleSize
}) => {
  return (
    <div
      className={`panel my-3 ${isVisible ? 'open' : 'closed'} ${
        isSmall ? 'col-lg-6' : 'col-lg-12'
      }`}>
      <div className="header d-flex justify-content-between p-1 align-items-center">
        <div className="d-flex">
          <h2 className="mb-0 mx-3">{title}</h2>
          <a
            className="d-none d-md-block"
            href={editLink}
            target="_blank"
            rel="noopener noreferrer">
            {editText}
          </a>
        </div>
        <div className="d-flex">
          <a
            className="d-block d-md-none btn"
            href={editLink}
            target="_blank"
            rel="noopener noreferrer">
            <Edit />
          </a>
          <button
            className="d-none d-lg-block btn"
            onClick={() => toggleSize(index)}>
            {isSmall ? (
              <UnfoldMore style={{ transform: 'rotate(90deg)' }} />
            ) : (
              <UnfoldLess style={{ transform: 'rotate(90deg)' }} />
            )}
          </button>
          <button className="btn" onClick={() => toggleVisibility(index)}>
            {isVisible ? <UnfoldLess /> : <UnfoldMore />}
          </button>
        </div>
      </div>
      <div className="body">{children}</div>
    </div>
  )
}

Panel.defaultProps = {
  isVisible: true,
  isSmall: false,
  editText: 'Edit in Airtable',
  editLink:
    'https://airtable.com/tbl5ApSEOzPpe4fwp/viw2swQLeJ9xwU82F?blocks=hide'
}

export default Panel
