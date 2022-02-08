import React, { useState, useEffect } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import reactDOM from 'react-dom';
import axios from 'axios';
import Input from './Input.jsx';
import NewMap from './NewMap.jsx';
import GOOGLE_API_KEY from '../../server/config.js';

const App = () => {
  const [topLocations, setTopLocations] = useState([]);
  const [mapLocation, setMapLocation] = useState({
    // address: '',
    lat: 0,
    lng: 0,
  })

  useEffect(() => {
    // console.log('mapLocation object: ', mapLocation);
    axios({
      method: 'GET',
      url: '/midpoints',
    })
      .then(locations => {
        setTopLocations(locations.data);
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  // useEffect(() => {

  // }, [mapLocation])

  return (
    <div>
      <h1>Meet in the Middle</h1>
      <h3>Friends who want to meet can find a place in between them to meet up!</h3>
      <h5>Meeting up should be as easy as asking Meet in the Middle where your midpoint is and plugging in the location to your favorite mapping app.</h5>
      <Input setMapLocation={setMapLocation} />
      <br/>
      <h3>Below are the top 10 recently searched locations:</h3>
      {topLocations.length
      ? topLocations.map(location => {
        return <div>{location.location}</div>
      })
      : <div>LOADING...</div>
      }
    </div>
  )
}

reactDOM.render(<App />, document.getElementById('app'));