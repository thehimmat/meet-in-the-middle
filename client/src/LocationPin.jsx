import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';

const LocationPin = ({ text }) => {
  return (
    <div>
      <Icon icon={locationIcon} />
      <p className="pin-text">{text}</p>
    </div>
  )
}

export default LocationPin;
