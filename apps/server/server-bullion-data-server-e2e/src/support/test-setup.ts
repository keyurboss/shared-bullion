/* eslint-disable */

import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env['DATA_HOST'] ?? 'localhost';
  const port = process.env['DATA_SERVER_PORT'] ?? '3333';
  axios.defaults.baseURL = `http://${host}:${port}`;
};
