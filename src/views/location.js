import React from "react";
import DefaultLayout from './default-layout';
import LocationForm from '../components/forms/LocationForm'
import { Container, Row, Col } from "react-bootstrap";

const AddLocation = () => (
  <DefaultLayout>
  <Container>
    <div className="row mb-4">
      <div className="col-12 my-5">
        <LocationForm
          center={{lat: 43.65347810000001, lng: -79.3841277}}
          height='400px'
          zoom={14}
        />
      </div>
    </div>
    </Container>
  </DefaultLayout>
);

export default AddLocation;
