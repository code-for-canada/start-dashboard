import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

import Geocode from 'react-geocode'
import Autocomplete from 'react-google-autocomplete'
import StatusAlert from 'components/common/StatusAlert'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button
} from '@material-ui/core'
import {
  DEFAULT_MAP_CENTER,
  AIRTABLE_LINKS,
  MAP_STYLE_BASE,
  MAP_STYLE_WARD_DEFAULT,
  MAP_STYLE_WARD_ACTIVE
} from 'utils/constants'
import { Map, Marker, GoogleApiWrapper } from '@nomadiclabs/google-maps-react'

const styles = {
  container: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  form: {
    padding: '1rem',
  },
  button: {
    marginTop: '1rem'
  },
  alert: {
    margin: '1rem',
    marginTop: 0
  },
  mapContainer: {
    position: 'relative',
    height: '400px'
  },
  subheading: {
    marginTop: '1rem'
  }
}

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
Geocode.enableDebug()

const SuccessAlert = ({ show, recordId, address, onClose, classes }) => {
  return (
    <StatusAlert
      show={show}
      severity="success"
      onClose={onClose}
      classes={classes}>
      {`This location (${address}) has been saved. `}
      <a
        target="_blank"
        rel="noreferrer noopener"
        href={`${AIRTABLE_LINKS.locationsTable}${recordId}`}>
        Edit on Airtable
      </a>
    </StatusAlert>
  )
}
SuccessAlert.propTypes = {
  show: PropTypes.bool,
  recordId: PropTypes.string,
  address: PropTypes.string,
  onClose: PropTypes.func,
  classes: PropTypes.object
}

const ErrorAlert = ({ show, error, onClose, classes }) => {
  return (
    <StatusAlert
      show={show}
      severity="error"
      onClose={onClose}
      classes={classes}>
      <p>There was an error saving this location:</p>
      {error && <code>{JSON.stringify(error)}</code>}
    </StatusAlert>
  )
}

ErrorAlert.propTypes = {
  show: PropTypes.bool,
  error: PropTypes.object,
  onClose: PropTypes.func,
  classes: PropTypes.object
}

const InteractiveMap = props => {
  const {
    loaded,
    google,
    mapRef,
    center,
    zoom,
    classes,
    onMarkerDragEnd,
    markerPosition,
    onPlaceSelected
  } = props

  let infowindow = null

  const handleMapClick = (e, map) => {
    const feature = e.feature
    // Clicking a ward feature on the map.
    if (feature.getGeometry().getType() === 'MultiPolygon') {
      // Clicking on a ward mulitpolygon feature on the map.
      map.data.revertStyle()
      map.data.overrideStyle(feature, MAP_STYLE_WARD_ACTIVE)
      const content = `Ward ${feature.getProperty(
        'AREA_S_CD'
      )}: ${feature.getProperty('AREA_NAME')}`
      if (infowindow) {
        infowindow.close()
      }
      infowindow = new google.maps.InfoWindow({
        content: content,
        position: e.latLng
      })
      infowindow.open(map)
    }
  }

  const onMapReady = (mapProps, map) => {
    map.setOptions({
      styles: MAP_STYLE_BASE,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    })
    map.data.loadGeoJson(
      'https://raw.githubusercontent.com/code-for-canada/start-map/master/public/geojson/wards.json',
      { idPropertyName: 'AREA_ID' }
    )
    map.data.setStyle(MAP_STYLE_WARD_DEFAULT)
    map.data.addListener('click', e => handleMapClick(e, map))
  }

  if (!loaded || !google) {
    return <div className="loading" />
  }

  return (
    <>
      <div className={classes.mapContainer}>
        <Map
          ref={mapRef}
          google={google}
          initialCenter={center}
          center={center}
          zoom={zoom}
          onReady={(mapProps, map) => onMapReady(mapProps, map)}
          containerStyle={{ height: '100%' }}>
          <Marker
            position={markerPosition}
            draggable={true}
            onDragend={onMarkerDragEnd}
          />
        </Map>
      </div>
      <div className={classes.form}>
        <Autocomplete
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '16px',
            border: '1px solid #343a40',
            borderRadius: '4px',
            fontFamily: `'Helvetica', 'Roboto', 'Arial', sans-serif`,
            fontSize: '1rem',
          }}
          onPlaceSelected={onPlaceSelected}
          types={['address']}
          componentRestrictions={{ country: 'ca' }}
        />
      </div>
    </>
  )
}

InteractiveMap.propTypes = {
  loaded: PropTypes.bool,
  google: PropTypes.object,
  mapRef: PropTypes.object,
  center: PropTypes.object,
  markerPosition: PropTypes.object,
  zoom: PropTypes.number,
  classes: PropTypes.object,
  onMarkerDragEnd: PropTypes.func,
  onPlaceSelected: PropTypes.func
}

const LocationMap = GoogleApiWrapper(props => ({
  apiKey: props.googleApiKey
}))(withStyles(styles)(InteractiveMap))

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
      internalNotes: '',
      height: '',
      width: '',
      sqft: '',
      status: 'new',
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    }
    this.mapRef = createRef()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const {
        coordinates,
        address,
        status,
        // eslint-disable-next-line camelcase
        property_description = '',
        ward = '',
        intersection = '',
        comments = '',
        internal_notes = '',
        height = '',
        width = '',
        sqft = '',
        area = ''
      } = this.props.location
      const [lat, lng] = coordinates.split(',').map(l => Number(l.trim()))
      this.setState({
        ...this.state,
        address: address,
        mapPosition: { lat, lng },
        markerPosition: { lat, lng },
        propertyDescription: property_description,
        ward: ward,
        status: status,
        intersection: intersection,
        comments: comments,
        internalNotes: internal_notes,
        height: height,
        width: width,
        sqft: sqft
      })
    }
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
  onMarkerDragEnd = (marker, map, coordinates) => {
    console.log(marker)
    console.log(coordinates)
    const { latLng } = coordinates
    const newLat = latLng.lat()
    const newLng = latLng.lng()

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

  onSubmit = async e => {
    e.preventDefault()

    const locationData = {
      fields: {
        coordinates: `${this.state.markerPosition.lat}, ${this.state.markerPosition.lng}`,
        address: this.state.address,
        ward: this.state.ward,
        area: this.state.area,
        intersection: this.state.intersection,
        property_description: this.state.propertyDescription,
        comments: this.state.comments,
        internal_notes: this.state.internalNotes,
        height: this.state.height,
        width: this.state.width,
        sqft: this.state.sqft,
        status: this.state.status,
      }
    }

    if (this.props.location) {
      locationData.id = this.props.location.id
    }

    const result = await this.props.handleSubmit(locationData)

    if (result.error) {
      return this.setState({
        showErrorAlert: true,
        error: result.error
      })
    }

    console.log({ result })

    this.setState({
      showSuccessAlert: true,
      recordId: result.record.id
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Card className={classes.container}>
        <LocationMap
          zoom={this.props.zoom}
          center={this.state.mapPosition}
          markerPosition={this.state.markerPosition}
          onPlaceSelected={this.onPlaceSelected}
          onMarkerDragEnd={this.onMarkerDragEnd}
          mapRef={this.mapRef}
          googleApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        />
        <form onSubmit={this.onSubmit} className={classes.form}>
          <h2>Public Information</h2>
          <TextField
            label="Latitude"
            value={this.state.markerPosition.lat}
            onChange={this.onChange}
            type="text"
            name="lat"
            required={true}
            fullWidth={true}
            variant="outlined"
            margin="dense"
            readOnly={true}
          />

          <TextField
            label="Longitude"
            value={this.state.markerPosition.lng}
            onChange={this.onChange}
            type="text"
            name="lng"
            required={true}
            fullWidth={true}
            variant="outlined"
            margin="dense"
            readOnly={true}
          />

          <TextField
            label="Address"
            value={this.state.address}
            onChange={this.onChange}
            name="address"
            required={true}
            fullWidth={true}
            variant="outlined"
            margin="dense"
          />

          <TextField
            label="Neighbourhood"
            value={this.state.area}
            onChange={this.onChange}
            name="area"
            fullWidth={true}
            variant="outlined"
            margin="dense"
          />

          <TextField
            label="Ward"
            value={this.state.ward}
            onChange={this.onChange}
            name="ward"
            fullWidth={true}
            variant="outlined"
            margin="dense"
          />

          <TextField
            label="Intersection"
            value={this.state.intersection}
            onChange={this.onChange}
            name="intersection"
            fullWidth={true}
            variant="outlined"
            margin="dense"
          />

          <TextField
            label="Property description"
            value={this.state.propertyDescription}
            onChange={this.onChange}
            name="propertyDescription"
            fullWidth={true}
            variant="outlined"
            margin="dense"
          />

          <TextField
            label="Comments"
            value={this.state.comments}
            onChange={this.onChange}
            name="comments"
            fullWidth={true}
            variant="outlined"
            margin="dense"
          />

          <h2 className={classes.subheading}>Internal Information</h2>

          <TextField
            label="Internal notes"
            value={this.state.internalNotes}
            onChange={this.onChange}
            name="internalNotes"
            fullWidth={true}
            variant="outlined"
            margin="dense"
            multiline={true}
            rows={4}
          />

          <TextField
            label="Height (in feet)"
            value={this.state.height}
            onChange={this.onChange}
            name="height"
            fullWidth={true}
            variant="outlined"
            margin="dense"
            type="number"
          />

          <TextField
            label="Width (in feet)"
            value={this.state.width}
            onChange={this.onChange}
            name="width"
            fullWidth={true}
            variant="outlined"
            margin="dense"
            type="number"
          />

          <TextField
            label="Square feet"
            value={this.state.sqft}
            onChange={this.onChange}
            name="sqft"
            fullWidth={true}
            variant="outlined"
            margin="dense"
            type="number"
          />

          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="status" variant="outlined" margin="dense" shrink={true}>
              Status
            </InputLabel>
            <Select
              native
              value={this.state.status}
              onChange={this.onChange}
              name="status"
              variant="outlined"
              margin="dense"
              inputProps={{
                name: 'status',
                id: 'status'
              }}>
              <option value={'new'}>New</option>
              <option value={'requested'}>Requested</option>
              <option value={'under review'}>Under review</option>
              <option value={'approved'}>Approved</option>
              <option value={'rejected'}>Rejected</option>
              <option value={'needs repair'}>Needs repair</option>
              <option value={'has artwork'}>Has artwork</option>
            </Select>
          </FormControl>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}>
              Save location
            </Button>
          </div>
        </form>
        <SuccessAlert
          classes={{ root: classes.alert }}
          show={this.state.showSuccessAlert}
          address={this.state.address}
          recordId={this.state.recordId}
          onClose={() => this.setState({ showSuccessAlert: false })}
        />
        <ErrorAlert
          classes={{ root: classes.alert }}
          show={this.state.showErrorAlert}
          error={this.state.error}
          onClose={() => this.setState({ showErrorAlert: false })}
        />
      </Card>
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
  auth0: PropTypes.object,
  classes: PropTypes.object,
  location: PropTypes.object,
  handleSubmit: PropTypes.func
}

LocationForm.defaultProps = {
  center: DEFAULT_MAP_CENTER,
  height: '400px',
  zoom: 14
}

export default withStyles(styles)(LocationForm)
