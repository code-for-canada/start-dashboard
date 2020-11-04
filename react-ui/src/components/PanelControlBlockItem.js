import React from 'react'
import PropTypes from 'prop-types'
import MoveUpButton from 'components/MoveUpButton'
import MoveDownButton from 'components/MoveDownButton'
import ShowHideButton from 'components/ShowHideButton'

const PanelControlBlockItem = props => {
  const {
    title,
    index,
    isVisible = false,
    isFirstItem = false,
    isLastItem = false,
    toggleVisibility,
    moveUp,
    moveDown
  } = props

  return (
    <>
      <style type="text/css">
        {`
        .btn-group-micro > .btn {
          padding: 0.1rem 0.25rem;
        }
        `}
      </style>
      <tr>
        <td className="align-middle">
          <nobr>{title}</nobr>
        </td>
        <td>
          <div
            className="btn-group btn-group-micro"
            role="group"
            aria-label={`Actions on view: ${title}`}>
            <ShowHideButton
              isVisible={isVisible}
              onClick={() => toggleVisibility(index)}
            />
            <MoveUpButton
              disabled={isFirstItem}
              onClick={() => moveUp(index)}
            />
            <MoveDownButton
              disabled={isLastItem}
              onClick={() => moveDown(index)}
            />
          </div>
        </td>
      </tr>
    </>
  )
}
PanelControlBlockItem.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number,
  isVisible: PropTypes.bool,
  isFirstItem: PropTypes.bool,
  isLastItem: PropTypes.bool,
  toggleVisibility: PropTypes.func,
  moveUp: PropTypes.func,
  moveDown: PropTypes.func
}

export default PanelControlBlockItem
