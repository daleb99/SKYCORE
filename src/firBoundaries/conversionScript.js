const fs = require('fs');

const geoJSONTemplate = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
          ],
        ],
      },
    },
  ],
};

function writeToFile(fileName, convertedObject) {
  const newFilePath = `${__dirname}/geoJSON/EGTT/${fileName.replace('.txt', '.json')}`;
  const objToInsert = geoJSONTemplate;

  convertedObject.forEach((line) => {
    const obj = [
      line.line1,
      line.line2,
    ];
    objToInsert.features[0].geometry.coordinates[0].push(obj);
  });
  fs.appendFileSync(newFilePath, JSON.stringify(objToInsert));
}

function convertFile(file) {
  const contents = fs.readFileSync(file.path);
  const lines = contents.toString().trim().split('\n');
  let newObj = {
    line1: Number,
    line2: Number,
  };
  const convertedObject = [];

  lines.forEach((line) => {
    newObj.line1 = line.split(',')[1];
    newObj.line2 = line.split(',')[0];
    convertedObject.push(newObj);
    newObj = {
      line1: Number,
      line2: Number,
    };
  });

  writeToFile(file.name, convertedObject);
}

convertFile({ path: `${__dirname}/plainText/UKSF LON.txt`, name: 'UKSF LON.txt' });
// getFiles().forEach((file) => {
// });
