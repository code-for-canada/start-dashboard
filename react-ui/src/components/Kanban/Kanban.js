import React from 'react'
import PropTypes from 'prop-types'
import Board from 'react-trello'
import CustomCard from './CustomCard'

const Kanban = ({ data = {}, onCardClick }) => {
  return (
    <Board
      {...{onCardClick}}
      data={data}
      draggable
      laneDraggable={false}
      hideCardDeleteIcon
      components={{
        Card: CustomCard
      }}
    />
  )
}

Kanban.propTypes = {
  data: PropTypes.object,
  onCardClick: PropTypes.func
}

export default Kanban
