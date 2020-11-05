import React from 'react'
import { Chip } from '@material-ui/core'

const COLOR_PARTNERSHIP = '#004b84'
const COLOR_OUTSIDE_BOX = '#a41632'
const COLOR_START_SUPPORT = '#037f2f'
const COLOR_OTHER = '#cfb51c'

const ProgramChip = props => {
  const labelColors = {
    'partnership program': COLOR_PARTNERSHIP,
    'outside the box': COLOR_OUTSIDE_BOX,
    'start support': COLOR_START_SUPPORT,
    'other': COLOR_OTHER
  }

  const lookupKey = props.label.toLowerCase()

  const labelStyle = {
    backgroundColor: labelColors[lookupKey],
    color: '#ffffff'
  }

  return (
    <Chip
      {...props}
      size="small"
      style={labelColors[lookupKey] && labelStyle}
    />
  )
}

export default ProgramChip
