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

  files.forEach((sector) => {
    // eslint-disable-next-line global-require
    const sectorFile = require(sector.path);
    const sectorName = sector.name.replace('.json', '');
    const point = turf.point([long, lat]);
    const poly = turf.polygon(sectorFile.features[0].geometry.coordinates[0]);
    const acInFIR = turf.booleanPointInPolygon(point, poly);

    console.log(`${sectorName}: ${acInFIR}`);
  });
}

findFIR(-1.27399, 52.59789); // Leicester (C)
findFIR(-2.150482, 48.510613); // Je Mapelle Suise (Not in LON)
findFIR(51.434838, -2.603396); // Bristol (W)
