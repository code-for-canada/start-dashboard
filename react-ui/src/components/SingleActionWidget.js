import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Box, Container } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const SingleActionWidget = ({label = '', options = [], optionLabelKey = 'name', getOptionLabel, onClick, buttonLabel = 'Perform Action' }) => {
  const [ selected, setSelected ] = React.useState(null)
  const [ isLoading, setIsLoading ] = React.useState(false)

  const isNoSelection = () => !selected

  const renderInput = (params) => (
    <TextField
      {...params}
      label={label}
      variant="outlined"
    />
  )

  getOptionLabel = getOptionLabel ? getOptionLabel : (o) => o[optionLabelKey]

  const handleChange = (e, value) => {
    setSelected(value)
  }

  const clearInput = () => {
    setSelected(null)
  }

  const handleClick = (e) => {
    setIsLoading(true)
    setTimeout(() => {
      onClick(selected)
      setIsLoading(false)
      clearInput()
    }, 2000)
  }

  return (
    <Container>
    <Box display="flex" alignItems="center">
      <Box marginRight={2} width="100%">
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          renderInput={renderInput}
          onChange={handleChange}
          value={selected}
        />
      </Box>
      <Button
        color="primary"
        variant="contained"
        onClick={handleClick}
        disabled={isLoading || isNoSelection()}
      >
        {buttonLabel}
      </Button>
    </Box>
    </Container>
  )
}

SingleActionWidget.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  optionLabelKey: PropTypes.string,
  getOptionLabel: PropTypes.func,
  onClick: PropTypes.func
}

export default SingleActionWidget
