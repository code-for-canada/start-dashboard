import React from 'react'
import SingleActionWidget from 'components/SingleActionWidget'
import PropTypes from 'prop-types'

const SingleActionWidgetArtwork = ({ options = [], onClick, buttonLabel }) => {
  const makeTitleLocationLabel = option =>
    `${option.title} (${option.location})`

  return (
    <SingleActionWidget
      label="Artworks"
      getOptionLabel={makeTitleLocationLabel}
      options={options}
      onClick={onClick}
      buttonLabel={buttonLabel}
    />
  )
}

SingleActionWidgetArtwork.propTypes = {
  options: PropTypes.array,
  onClick: PropTypes.func,
  buttonLabel: PropTypes.string
}

export default SingleActionWidgetArtwork
