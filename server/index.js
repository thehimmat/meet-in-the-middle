const express = require('express');
const { RAPIDAPI_KEY } = require('./config.js');
const axios = require('axios');
const { postMidpoint, getMidpoints } = require('../database');

const port = 3000;
const app = express();

app.use(express.json());

const API_URL = 'https://geocode-forward-and-reverse.p.rapidapi.com';
const postgresURL = 'postgres://himmat:boardtoadsilversock@localhost:5432';

app.get('/forward', (req, res) => {
  axios({
    url: API_URL + '/forward',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
    },
    params: req.query,
  })
    .then(response => {
      console.log('API forward response: ', response.data);
      res.json(response.data);

    })
    .catch(err => {
      console.error('API forward error: ', err);
      res.status(400).send(err);
    })
})

// app.get('/reverse', (req, res) => {
//   console.log('reverse query req object: ', req)
//   axios({
//     url: API_URL + '/reverse',
//     headers: {
//       'x-rapidapi-key': RAPIDAPI_KEY,
//     },
//     params: req.query,
//   })
//     .then(response => {
//       // console.log('API reverse response: ', response.data);
//       res.json(response.data);

//     })
//     .catch(err => {
//       // console.error('API reverse error: ', err);
//       res.status(400).send(err);
//     })
// })

app.post('/midpoints', (req, res) => {
  postMidpoint(req.body)
    .then(response => {
      console.log('DB POST response: ', response.rows);
      res.send(response.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err);
    })
})

app.get('/midpoints', (req, res) => {
  getMidpoints()
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err);
    })
})

app.use(express.static('client/dist'));

app.listen(port, () => {
  console.log('listening on port ', port);
})