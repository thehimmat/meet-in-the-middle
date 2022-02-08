import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Input = ({ setMapLocation }) => {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [coordinates1, setCoordinates1] = useState({
    lat: null,
    lng: null,
  });
  const [coordinates2, setCoordinates2] = useState({
    lat: null,
    lng: null,
  });
  const [midpoint, setMidpoint] = useState({
    address: 'your midpoint',
    lat: null,
    lng: null,
  });

  const handleLocation1Change = (e) => {
    e.preventDefault();
    setLocation1(e.target.value);
  }

  const handleLocation2Change = (e) => {
    e.preventDefault();
    setLocation2(e.target.value);
  }

  const calculateMidpoint = (coordinates1, coordinates2) => {
    setMidpoint({
      lat: (coordinates1.lat + coordinates2.lat) / 2,
      lng: (coordinates1.lng + coordinates2.lng) / 2,
    })
  }

  const handleSubmit = () => {
    axios({
      method: 'GET',
      url: '/forward',
      params: {
        address: location1,
      }
    })
      .then(response => {
        setCoordinates1({
          lat: response.data.location.lat,
          lng: response.data.location.lng,
        })
      })
      .catch(err => {
        console.error('error returned to client: ', err)
      })

    axios({
      method: 'GET',
      url: '/forward',
      params: {
        address: location2,
      }
    })
      .then(response => {
        setCoordinates2({
          lat: response.data.location.lat,
          lng: response.data.location.lng,
        })
      })
      .then(() => {
        calculateMidpoint(coordinates1, coordinates2);
        console.log('midpoint is done calculating!');
      })
      .catch(err => {
        console.error('error returned to client: ', err)
      })
  }

  //TODO: send midpoint to database
  //TODO: re-render top 10

  useEffect(() => {
    calculateMidpoint(coordinates1, coordinates2);
  }, [midpoint]);

  return (
    <div>
      <h3>Enter two locations below to find the midpoint</h3>
      <span>Location 1: </span><input onChange={handleLocation1Change} />
      <div>
        Location 1 coordinates:
        {!coordinates1.lat ? null : <div>latitude: {coordinates1.lat.toFixed(3)}</div>}
        {!coordinates1.lng ? null : <div>longitude: {coordinates1.lng.toFixed(3)}</div>}
      </div>
      <span>Location 2: </span><input onChange={handleLocation2Change} />
      <div>
        Location 2 coordinates:
        {!coordinates2.lat ? null : <div>latitude: {coordinates2.lat.toFixed(3)}</div>}
        {!coordinates2.lng ? null : <div>longitude: {coordinates2.lng.toFixed(3)}</div>}
      </div>
      <button onClick={handleSubmit}>Let's GO!</button>
      {!midpoint.lat
      ? <div>Your midpoint will show here...</div>
      : <div>
          Midpoint Found!
          <div>
            Midpoint coordinates:
            {!midpoint.lat ? null : <div>latitude: {midpoint.lat.toFixed(3)}</div>}
            {!midpoint.lng ? null : <div>longitude: {midpoint.lng.toFixed(3)}</div>}
          </div>
          <div
            onClick={()=> window.open(`https://maps.google.com/?q=${midpoint.lat},${midpoint.lng}&z=10&t=k`, "_blank")}>
            Show the midpoint
          </div>
          <div
            onClick={()=> window.open(`https://maps.google.com/?saddr=${coordinates1.lat},${coordinates1.lng}&daddr=${midpoint.lat},${midpoint.lng}&z=10&t=k`, "_blank")}>
            Directions from Location 1 to Midpoint
          </div>
          <div
            onClick={()=> window.open(`https://maps.google.com/?saddr=${coordinates2.lat},${coordinates2.lng}&daddr=${midpoint.lat},${midpoint.lng}&z=10&t=k`, "_blank")}>
            Directions from Location 2 to Midpoint
          </div>
        </div>

      }
    </div>
  )
}
// https://www.google.com/maps/search/?api=1&query=<lat>,<lng>
// https://maps.google.com/?q=38.6531004,-90.243462&ll=38.6531004,-90.243462&z=3
// https://maps.google.com/?saddr=38.6531004,-90.243462&daddr=33.6531004,-90.243462+to:38.6531004,-94.243462&z=3
export default Input;