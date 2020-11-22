import React from 'react'
import PropTypes from 'prop-types'
import MoveUpButton from 'components/common/MoveUpButton'
import MoveDownButton from 'components/common/MoveDownButton'
import ShowHideButton from 'components/common/ShowHideButton'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    padding: theme.spacing(1)
  }
}))

const PanelControlBlockItem = ({
  title,
  index,
  isVisible = false,
  isFirstItem = false,
  isLastItem = false,
  toggleVisibility,
  moveUp,
  moveDown
}) => {
  const classes = useStyles()
  return (
    <>
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
              className={classes.button}
              isVisible={isVisible}
              onClick={() => toggleVisibility(index)}
            />
            <MoveUpButton
              className={classes.button}
              disabled={isFirstItem}
              onClick={() => moveUp(index)}
            />
            <MoveDownButton
              className={classes.button}
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
