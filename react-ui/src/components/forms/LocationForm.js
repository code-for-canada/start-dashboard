import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from 'react-google-maps'
import Geocode from 'react-geocode'
import Autocomplete from 'react-google-autocomplete'
import StatusAlert from 'components/common/StatusAlert'
import { withAuth0 } from '@auth0/auth0-react'
import { TextField, Container, Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { DEFAULT_MAP_CENTER, AIRTABLE_LINKS } from 'utils/constants'
import { createResource } from 'utils/apiHelper'

const styles = {
  container: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  form: {
    paddingTop: '4rem',
    paddingBottom: '1rem'
  },
  button: {
    marginTop: '1rem',
  }
}

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
Geocode.enableDebug()

const SuccessAlert = ({ show, recordId, address, onClose }) => {
  return (
    <StatusAlert show={show} severity="success" onClose={onClose}>
      <p>{`This location (${address}) has been added to the database.`}</p>
      <p>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`${AIRTABLE_LINKS.locationsTable}${recordId}`}>
          Edit on Airtable
        </a>
      </p>
    </StatusAlert>
  )
}
SuccessAlert.propTypes = {
  show: PropTypes.bool,
  recordId: PropTypes.string,
  address: PropTypes.string,
  onClose: PropTypes.func
}

const ErrorAlert = ({ show, error, onClose }) => {
  return (
    <StatusAlert show={show} severity="error" onClose={onClose}>
      <p>There was an error saving this location:</p>
      {error && <code>{JSON.stringify(error)}</code>}
    </StatusAlert>
  )
}

ErrorAlert.propTypes = {
  show: PropTypes.bool,
  error: PropTypes.object,
  onClose: PropTypes.func
}

const AsyncMap = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        google={props.google}
        defaultZoom={props.zoom}
        center={{
          lat: props.mapPosition.lat,
          lng: props.mapPosition.lng
        }}>
        <Autocomplete
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '16px',
            marginTop: '2px'
          }}
          onPlaceSelected={props.onPlaceSelected}
          types={['address']}
          componentRestrictions={{ country: 'ca' }}
        />
        {/* Marker */}
        <Marker
          google={props.google}
          name={'Selected location'}
          draggable={true}
          onDragEnd={props.onMarkerDragEnd}
          position={{
            lat: props.markerPosition.lat,
            lng: props.markerPosition.lng
          }}
        />
        <Marker />
        {/* For Auto complete Search Box */}
      </GoogleMap>
    )
  })
)

class LocationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showErrorAlert: false,
      showSuccessAlert: false,
      address: '',
      city: '',
      area: '',
      state: '',
      intersection: '',
      ward: '',
      propertyDescription: '',
      comments: '',
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    }
  }

  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      response => {
        const address = response.results[0].formatted_address
        const addressArray = response.results[0].address_components
        const city = this.getCity(addressArray)
        const area = this.getArea(addressArray)
        const state = this.getState(addressArray)

        console.log('city', city, area, state)

        this.setState({
          address: address || '',
          area: area || '',
          city: city || '',
          state: state || ''
        })
      },
      error => {
        console.error(error)
      }
    )
  }

  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = addressArray => {
    let city = ''
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        addressArray[i].types[0] === 'administrative_area_level_2'
      ) {
        city = addressArray[i].long_name
        return city
      }
    }
  }

  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = addressArray => {
    let area = ''
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            addressArray[i].types[j] === 'sublocality_level_1' ||
            addressArray[i].types[j] === 'locality'
          ) {
            area = addressArray[i].long_name
            return area
          }
        }
      }
    }
  }

  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = addressArray => {
    let state = ''
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          addressArray[i].types[0] === 'administrative_area_level_1'
        ) {
          state = addressArray[i].long_name
          return state
        }
      }
    }
  }

  /**
   * And function for city,state and address input
   * @param event
   */
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = event => {}

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = event => {
    const newLat = event.latLng.lat()
    const newLng = event.latLng.lng()

    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address
        const addressArray = response.results[0].address_components
        const city = this.getCity(addressArray)
        const area = this.getArea(addressArray)
        const state = this.getState(addressArray)
        this.setState({
          address: address || '',
          area: area || '',
          city: city || '',
          state: state || '',
          lat: newLat,
          lng: newLng,
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          }
        })
      },
      error => {
        console.error(error)
      }
    )
  }

  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = place => {
    console.log('plc', place)
    const address = place.formatted_address
    const addressArray = place.address_components
    const city = this.getCity(addressArray)
    const area = this.getArea(addressArray)
    const state = this.getState(addressArray)
    const latValue = place.geometry.location.lat()
    const lngValue = place.geometry.location.lng()
    // Set these values in the state.
    this.setState({
      address: address || '',
      area: area || '',
      city: city || '',
      state: state || '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      }
    })
  }

  createLocation = async e => {
    e.preventDefault()

    const locationData = {
      fields: {
        address: this.state.address,
        coordinates: `${this.state.markerPosition.lat}, ${this.state.markerPosition.lng}`,
        ward: this.state.ward,
        intersection: this.state.intersection,
        property_description: this.state.propertyDescription,
        comments: this.state.comments
      }
    }

    const { getAccessTokenSilently } = this.props.auth0
    const token = await getAccessTokenSilently({
      audience: 'https://dashboard.streetartoronto.ca/'
    })

    const opts = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(locationData)
    }
    const data = await createResource({ resource: 'location', opts })

    if (data.error) {
      return this.setState({
        showErrorAlert: true,
        error: data.error
      })
    }

    this.setState({
      showSuccessAlert: true,
      recordId: data.recordId
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: this.props.height }} />}
          mapElement={<div style={{ height: `100%` }} />}
          zoom={this.props.zoom}
          mapPosition={this.state.mapPosition}
          markerPosition={this.state.markerPosition}
          onPlaceSelected={this.onPlaceSelected}
          onMarkerDragEnd={this.onMarkerDragEnd}
        />
        <form onSubmit={this.createLocation} className={classes.form}>
          <TextField
            label='Latitude'
            value={this.state.markerPosition.lat}
            onChange={this.onChange}
            type='text'
            name='lat'
            required={true}
            fullWidth={true}
            variant='outlined'
            margin='dense'
            readOnly='readOnly'
          />

          <TextField
            label='Longitude'
            value={this.state.markerPosition.lng}
            onChange={this.onChange}
            type='text'
            name='lng'
            required={true}
            fullWidth={true}
            variant='outlined'
            margin='dense'
            readOnly='readOnly'
          />

          <TextField
            label='Address'
            value={this.state.address}
            onChange={this.onChange}
            name='address'
            required={true}
            fullWidth={true}
            variant='outlined'
            margin='dense'
          />

          <TextField
            label='Area'
            value={this.state.area}
            onChange={this.onChange}
            name='area'
            fullWidth={true}
            variant='outlined'
            margin='dense'
          />

          <TextField
            label='Ward'
            value={this.state.ward}
            onChange={this.onChange}
            name='ward'
            fullWidth={true}
            variant='outlined'
            margin='dense'
          />

          <TextField
            label='Intersection'
            value={this.state.intersection}
            onChange={this.onChange}
            name='intersection'
            fullWidth={true}
            variant='outlined'
            margin='dense'
          />

          <TextField
            label='Property description'
            value={this.state.propertyDescription}
            onChange={this.onChange}
            name='propertyDescription'
            fullWidth={true}
            variant='outlined'
            margin='dense'
          />

          <TextField
            label='Comments'
            value={this.state.comments}
            onChange={this.onChange}
            name='comments'
            fullWidth={true}
            variant='outlined'
            margin='dense'
          />

          <Button type='submit' variant='contained' color='primary' className={classes.button}>
            Create location
          </Button>
        </form>
        <SuccessAlert
          show={this.state.showSuccessAlert}
          address={this.state.address}
          recordId={this.state.recordId}
          onClose={() => this.setState({ showSuccessAlert: false })}
        />
        <ErrorAlert
          show={this.state.showErrorAlert}
          error={this.state.error}
          onClose={() => this.setState({ showErrorAlert: false })}
        />
      </div>
    )
  }
}
LocationForm.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  google: PropTypes.string,
  zoom: PropTypes.number,
  height: PropTypes.string,
  auth0: PropTypes.object
}

LocationForm.defaultProps = {
  center: DEFAULT_MAP_CENTER
}

export default withAuth0(withStyles(styles)(LocationForm))
