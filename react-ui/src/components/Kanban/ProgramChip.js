import React from 'react'
import { Chip } from '@material-ui/core'

const COLOR_PARTNERSHIP = '#004b84'
const COLOR_OUTSIDE_BOX = '#a41632'
const COLOR_START_SUPPORT = '#037f2f'
const COLOR_OTHER = '#cfb51c'

const ProgramChip = props => {
  const labelColors = {
    'Partnership Program': COLOR_PARTNERSHIP,
    'Outside the Box': COLOR_OUTSIDE_BOX,
    'StART Support': COLOR_START_SUPPORT,
    'Other': COLOR_OTHER
  }

  const style = {
    backgroundColor: labelColors[props.label],
    color: '#ffffff'
  }

  return (
    <Chip
      {...props}
      size="small"
      style={labelColors[props.label] && style}
    />
  )
}

export default ProgramChip
