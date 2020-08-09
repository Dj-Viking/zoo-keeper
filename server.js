const express = require('express');//no extension here

const app = express();

const { animals } = require('./data/animals.json');//can put .json extension here or leave it out



filterByQuery = (query, animalsArray) => {
  let personalityTraitsArray = [];
  //now animalsArray will be the filtered results
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    //save personalityTraits as a dedicated array.
    //if personalityTraits is a string, place it into a new array and save it.
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    console.log(personalityTraitsArray);
    //now loop through each trait in the personalityTraits array
    personalityTraitsArray.forEach(trait => {
      filteredResults = filteredResults.filter(animal => {
        return animal.personalityTraits.indexOf(trait) !== -1
        //check trait against each animal in filtered results array
      // remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop
      // for each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of each trait we find whenever the forEach() loop is finished
      //console.log(filteredResults);
      });
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  //after all this return the filtered query request
  return filteredResults;
}



//this route could be named anything. as long as the client
// types this in they will get the response we set here
// it could be named /api/meatloaf!
// if any changes are saved here need to restart the server!
// this isn't a live server at the moment
app.get('/api/animals', (req, res) => {
  let results = animals;
  console.log(req.query);
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});


app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
