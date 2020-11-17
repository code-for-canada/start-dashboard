import { Box, Icon, Link, Text, Tooltip, Heading } from '@airtable/blocks/ui'
import React from 'react'

const SendInfoBox = ({ tableData = [], templateVars = [], templateEditLink = '#', templatePreviewLink = '#' }) => {
  const totalCount = tableData.length
  const emailMissingCount = tableData.filter((row) => !row.email).length

  return (
    <Box
      border="thick"
      borderRadius="large"
      padding={2}
      backgroundColor="lightGray1"
    >
      <Box>
        <Text marginBottom={1}>
          To be sent:
          {' '}
          <span style={{fontWeight: 700}}>{totalCount - emailMissingCount}</span> rows
          {emailMissingCount > 0 &&
            <span>{', '}{emailMissingCount} row(s) missing email address</span>
          }
        </Text>
      </Box>
      <Box>
        <Text marginBottom={1}>
          Selected Template:
          <Link href={templateEditLink} icon="edit" marginLeft={2}>Edit</Link>
          <Link href={templatePreviewLink} icon="show1" marginLeft={2}>Preview</Link>
        </Text>
      </Box>
      <Text size="large" marginBottom={1}>Template Variables:</Text>
      {templateVars.length === 0 && <Text textColor="gray" marginLeft={4}>(none)</Text>}
      {templateVars.map((v, i) => (
        v.isColMissing
          ? <Box display="flex">
              <Icon name="warning" size={16} fillColor="IndianRed" marginX={2} />
              <Text fontWeight={600} marginRight={1}>{v.name}</Text>
              <Text textColor="gray">(missing column)</Text>
            </Box>
          : <Box display="flex">
              <Icon name="check" size={16} fillColor="gray" marginX={2} />
              <Text textColor="gray">{v.name}</Text>
            </Box>
      ))}
    </Box>
  )
}

SendInfoBox.propTypes = {
}

export default SendInfoBox
