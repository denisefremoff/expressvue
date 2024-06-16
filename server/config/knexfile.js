require('dotenv').config();
const { options } = require('../utils/db');

module.exports = {
  development: {
    client: 'pg',
    connection: options,
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: '../seeds'
    }
  }
};
