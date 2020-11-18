import { Box, Icon, Text } from '@airtable/blocks/ui'
import React from 'react'
import HintedLink from './HintedLink'

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
      <Box marginBottom={2}>
        <Text>
          To be sent:
          {' '}
          <span style={{fontWeight: 700}}>{totalCount - emailMissingCount}</span> rows
          {emailMissingCount > 0 &&
            <span>{', '}{emailMissingCount} missing email(s)</span>
          }
        </Text>
      </Box>
      <Box marginBottom={2}>
        <Text marginBottom={2}>
          Selected template:
          <HintedLink hint="Redirects to Mailjet. Login required." icon="edit" href={templateEditLink}>Edit</HintedLink>
          <HintedLink hint="Redirects to Mailjet. Login required." icon="show1" href={templatePreviewLink}>View/Test</HintedLink>
        </Text>
      </Box>
      <Text size="large" marginBottom={2}>Template variables:</Text>
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
