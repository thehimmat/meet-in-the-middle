import React, { useState, useEffect } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GOOGLE_API_KEY from '../../server/config.js';
import Map from './Map.jsx';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

<Wrapper apiKey={GOOGLE_API_KEY} render={render}>
  <Map mapLocation={mapLocation} zoomLevel={zoomLevel} />
</Wrapper>

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

export default Wrapper;
