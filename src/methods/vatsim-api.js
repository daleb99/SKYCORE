const axios = require('axios');
const config = require('../../config');

/**
 * Call VATSIM data API
 * @returns VATSIM data as JSON
 */
async function getVatsimData() {
  const res = await axios.get(config.vatsim.hostname);
  return res.data;
}

/**
 * Get all pilots currently connected to the VATSIM network
 * @returns Pilots connected to VATSIM
 */
async function getVatsimPilots() {
  return getVatsimData().then((data) => data.pilots);
}

// getVatsimPilots().then((data) => {
//   console.log(data);
// }).catch((error) => {
//   console.log(error);
// });

/**
 * Get all controllers currently connected to the VATSIM network
 * @returns Controllers connected to VATSIM
 */
async function getVatsimControllers() {
  return getVatsimData().then((data) => data.controllers);
}
