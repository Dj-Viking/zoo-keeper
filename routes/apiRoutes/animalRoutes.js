// to make it not so confusing for the program
// having the same app variable might not work well
// so to specify that we are using router instead of app
// to handle the actual requests that need to be routed
const router = require('express').Router();

const animalFuncs = require('../../lib/animals.js');

const { animals } = require('../../data/animals.json');//can put .json extension here or leave it out

//this route could be named anything. as long as the client
// types this in they will get the response we set here
// it could be named /api/meatloaf!
// if any changes are saved here need to restart the server!
// this isn't a live server at the moment
router.get('/animals', (req, res) => {
  console.log("================");
  console.log("\x1b[33m", " GET request query typed by the client", "\x1b[00m");
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
  console.log(req.statusCode);
  console.log("================");
  let results = animals;
  //console.log(req.query);
  if (req.query) {
    results = animalFuncs.filterByQuery(req.query, results);
  }
  res.json(results);
});

//client request to get data from the server
// server responds

router.get('/animals/:id', (req, res) => {
  console.log("================");
  console.log("\x1b[33m", "GET request parameters enterd by the client", "\x1b[00m");
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
    // for (let i = 0; i < res.socket.server.length; i++) {
    //   console.log(res.socket.server[i]);
    // }
    //console.log(res.socket.server);
  } else {
    console.log(res);
    //.send() in express has been deprecated ??
    res.sendStatus(404);
  }
});

//defining a route that listens for POST requests 
//client requests the server to accept data sent from the client

router.post('/animals', (req, res) => {
  // req.body is where our incoming content will be
  console.log("================");
  console.log("\x1b[33m", "POST request sent by the client", "\x1b[00m");
  console.log(req.body);
  //if any data in req.body is incorrect, send 400 error back
  if (animalFuncs.validateAnimal(req.body) === false) {
    res.status(400).send('The animal is not properly formatted.');
    console.log("================");
    console.log("\x1b[31m", "POST request status code", "\x1b[00m");
    console.log(res.statusCode);
  } else {
    console.log("\x1b[31m", "POST request status code", "\x1b[00m");
    console.log(res.statusCode);
    // will do this soon, focusing on reading and creating data for now.
    console.log("================");
    console.log("\x1b[33m", "creating a new id for post request to add an animal", "\x1b[00m");
    req.body.id = animals.length.toString();
    const animal = animalFuncs.createNewAnimal(req.body, animals);
    res.json(animal);
  }

  //set id based on what the next index of the array will be
  // so the user doesn't post data on an id thats already taken up
  // this only works for now as long a we dont remove data from animals.json,
  // if we dot hat, the id numbers will be thrown off and we'll have duplicate values at some point



  // //add animal to json file and animals array in this function
  // const animal = createNewAnimal(req.body, animals);

  // //res.json(req.body);
  // res.json(animal);
});

module.exports = router;