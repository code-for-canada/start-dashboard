import { Link, Tooltip } from '@airtable/blocks/ui'
import React from 'react'

const HintedLink = ({ hint = '', href = '#', icon, children }) => {
  return (
    <Tooltip content={hint} placementY={Tooltip.placements.BOTTOM} placementX={Tooltip.placements.CENTER}>
      <Link target="_blank" href={href} icon={icon} marginLeft={2}>{children}</Link>
    </Tooltip>
  )
}

export default HintedLink
