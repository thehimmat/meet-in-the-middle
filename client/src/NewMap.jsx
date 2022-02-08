import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import GOOGLE_API_KEY from '../../server/config.js';
// import LocationPin from './LocationPin.jsx';

const NewMap = ({mapLocation, zoomLevel}) => {
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      <GoogleMap
        // center={defaultCenter}
        // zoom={zoomLevel}
      >
        {/* <LocationPin
          lat={mapLocation.lat}
          lng={mapLocation.lng}
        /> */}
      </GoogleMap>
    </LoadScript>
  )
}

export default NewMap;