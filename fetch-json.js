const fetch = require('node-fetch');
const fs = require('fs');

const url = process.argv[2];

fetch(url)
  .then((response) => response.json())
  .then((jsonData) => {
    fs.writeFileSync('json-data.json', JSON.stringify(jsonData, null, 2));
    console.log('JSON data has been saved to json-data.json');
  })
  .catch((error) => console.error('Error fetching JSON:', error));
