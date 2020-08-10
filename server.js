const express = require('express');//no extension here

const PORT = process.env.PORT || 3001;

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

findById = (id, animalsArray) => {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}


//this route could be named anything. as long as the client
// types this in they will get the response we set here
// it could be named /api/meatloaf!
// if any changes are saved here need to restart the server!
// this isn't a live server at the moment
app.get('/api/animals', (req, res) => {
  console.log("================");
  console.log("\x1b[33m", "request query typed by the client", "\x1b[00m");
  console.log(req.query);
  console.log("================");
  console.log("\x1b[33m", "path searched by client", "\x1b[00m");
  console.log(req.path);
  console.log("================");
  console.log("\x1b[33m", "protocol client sent request from", "\x1b[00m");
  console.log(req.protocol);
  console.log("================");
  console.log("\x1b[33m", "clients ip which made this request", "\x1b[00m")
  console.log(req.ip);
  console.log("================");
  console.log("\x1b[33m", "request headers", "\x1b[00m");
  console.log(req.headers);
  console.log("================");
  console.log("\x1b[33m", "request fresh", "\x1b[00m");
  console.log(req.fresh);
  console.log("================");
  let results = animals;
  //console.log(req.query);
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
  console.log("================");
  console.log("\x1b[33m", "request parameters enterd by the client", "\x1b[00m");
  console.log(req.params);
  console.log("================");
  console.log("\x1b[33m", "path searched by client", "\x1b[00m");
  console.log(req.path);
  console.log("================");
  console.log("\x1b[33m", "protocol client sent request from", "\x1b[00m");
  console.log(req.protocol);
  console.log("================");
  console.log("\x1b[33m", "clients ip which made this request", "\x1b[00m")
  console.log(req.ip);
  console.log("================");
  console.log("\x1b[33m", "request headers", "\x1b[00m");
  console.log(req.headers);
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
    // for (let i = 0; i < res.socket.server; i++) {
    //   console.log(res.socket.server[i]);
    // }
    console.log(res.socket.server);
  } else {
    res.sendStatus(404);
  }
})


app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});


//link to first deployment
//https://enigmatic-reef-32412.herokuapp.com/api/animals?personalityTraits=hungry
