import React from 'react'
import PropTypes from 'prop-types'
import PanelControlBlockItem from 'components/PanelControlBlockItem'

const PanelControlBlock = props => {
  const { panels = [] } = props

  return (
    <div id="panel-control-block">
      <h4 className="my-3">All views</h4>
      <table className="table table-sm small">
        <tbody>
          {panels.map((panel, index) => (
            <PanelControlBlockItem
              {...props}
              {...panel}
              index={index}
              key={panel.id}
              isFirstItem={index === 0}
              isLastItem={index === panels.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
PanelControlBlock.propTypes = {
  panels: PropTypes.arrayOf([
    PropTypes.object
  ])
}

export default PanelControlBlock
