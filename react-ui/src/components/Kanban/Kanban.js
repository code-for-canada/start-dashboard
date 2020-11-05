import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Board from 'react-trello'
import MaterialCard from './MaterialCard'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

const DialogTransition = React.forwardRef(function DialogTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Kanban = ({ data = {}, onCardClick, onDataChange, onDragEnd, airtableViewUrl }) => {
  const [ showCard, setShowCard ] = useState(false)
  const [ activeCard, setActiveCard ] = useState({})

  const handleCardClick = (cardId, metadata, laneId) => {
    onCardClick(cardId, metadata, laneId)
    setActiveCard(metadata || {})
    setShowCard(true)
  }

  const handleClose = () => {
    setShowCard(false)
  }

  return (
    <>
      <Board
        onCardClick={handleCardClick}
        onDataChange={onDataChange}
        handleDragEnd={onDragEnd}
        data={data}
        draggable
        laneDraggable={false}
        hideCardDeleteIcon
        components={{
          Card: MaterialCard
        }}
      />
      <Dialog
        onClose={handleClose}
        open={showCard}
        TransitionComponent={DialogTransition}
      >
        <DialogTitle>{activeCard.title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText component="pre">
            {JSON.stringify(activeCard, null, 2)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            airtableViewUrl
              ? <Button
                  href={`${airtableViewUrl}/${activeCard.id}`}
                  target="_blank"
                  startIcon={<OpenInNewIcon />}
                >
                  Edit
                </Button>
              : null
          }
          <Button onClick={handleClose} color="primary" variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

Kanban.propTypes = {
  data: PropTypes.object,
  onCardClick: PropTypes.func,
  onDataChange: PropTypes.func,
  onDragEnd: PropTypes.func
}

export default Kanban
