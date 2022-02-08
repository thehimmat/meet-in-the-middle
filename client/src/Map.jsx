import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import LocationPin from './LocationPin.jsx';
import GOOGLE_API_KEY from '../../server/config.js';

const Map = ({mapLocation, zoomLevel}) => {
  return (
    <div>
      <h2>Your Midpoint</h2>
      <GoogleMap
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        defaultCenter={mapLocation}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={mapLocation.lat}
          lng={mapLocation.lng}
          text={mapLocation.address}
        />
      </GoogleMap>
    </div>
  )
}

export default Map;
