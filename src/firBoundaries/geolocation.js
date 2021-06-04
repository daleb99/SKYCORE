/* eslint-disable import/no-dynamic-require */
const turf = require('@turf/turf');
const fs = require('fs');

function getFiles(pathToUse = `${__dirname}/geoJSON/`) {
  const entries = fs.readdirSync(pathToUse, { withFileTypes: true });
  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => ({ name: file.name, path: `${pathToUse}${file.name}` }));

  const folders = entries.filter((folder) => folder.isDirectory());

  folders.forEach((folder) => {
    files.push(...getFiles(`${__dirname}/geoJSON/${folder.name}/`));
  });
  return files;
}

function findFIR(lat, long) {
  const files = getFiles();
  console.log(`Lat: ${lat}, long: ${long}`);

  const sectors = [];

  files.forEach((file) => {
    // eslint-disable-next-line global-require
    const sectorFile = require(file.path);
    const sectorName = file.name.replace('.json', '');
    const point = turf.point([long, lat]);
    const poly = turf.polygon([sectorFile.features[0].geometry.coordinates]);
    const acInFIR = turf.booleanPointInPolygon(point, poly);

    if (acInFIR) {
      sectors.push(sectorName);
    }

    console.log(`${sectorName}: ${acInFIR}`);
  });

  console.log(sectors);
  return sectors;
}

module.exports = {
  findFIR,
};
