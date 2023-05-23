const request = require('request');

let fetchBreedDescription = (breedName, callback) => {
  let url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(`Failed to request details: ${error}`, null);
      return;
    }

    let data = JSON.parse(body);

    if (data[0]) {
      callback(null, data[0].description);
    } else {
      callback(`Failed to find breed ${breedName}`, null);
    }
  });
};

let breedName = process.argv[2];
fetchBreedDescription(breedName, (error, description) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Description:', description);
  }
});
