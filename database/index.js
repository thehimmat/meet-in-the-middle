const { Client } = require('pg');
const client = new Client({
  user: 'himmat',
  host: 'localhost',
  database: 'meetinthemiddle',
  password: 'boardtoadsilversock',
  port: 5432,
});
client.connect();

module.exports.postMidpoint = ({date, let, long, location}) => {
  return client
    .query(`INSERT INTO midpoints VALUES(${date}, ${lat}, ${long}, 1, ${location});`);
}
//example INSERT INTO midpoints (date, lat, long, popularity, location) VALUES ('2022-01-23', 40.7127753, -74.0059728, 1, 'New York, NY');

module.exports.getMidpoints = () => {
  return client
    .query('SELECT location FROM midpoints ORDER BY date DESC LIMIT 10;');
}

