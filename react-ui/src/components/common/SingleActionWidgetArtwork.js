import React from 'react'
import PropTypes from 'prop-types'
import SingleActionWidget from 'components/SingleActionWidget'

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
