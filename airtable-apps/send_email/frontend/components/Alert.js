import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Text, Button, Box, colors } from '@airtable/blocks/ui'

const Alert = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <Box
      paddingY={2}
      paddingX={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={3}
      backgroundColor={colors.CYAN_LIGHT_2}
      borderRadius="3px"
    >
      {typeof(alert) === 'string' ? (
        <Text>{ alert }</Text>
      ) : (
        alert
      )}
      <Button onClick={ onClose }
        variant="secondary"
        size="small"
        icon="x"
        aria-label="Close"
        alignSelf="flex-start"
      >
      </Button>
    </Box>
  )
}
Alert.propTypes = {
  alert: PropTypes.string.isRequired,
  onClose: PropTypes.func
}

export default Alert
