//const fs = require('fs');
const path = require('path');
const animalFuncs = require('./lib/animals.js');

const express = require('express');//no extension here

const PORT = process.env.PORT || 3001;

const app = express();
//in order to handle a POST we need to tell express.js.app
// to intercept the POST request before it gets to the callback function
// At this point the data runs through a some functions to take raw data
// transferred over HTTP and convert it to a JSON object

/**this is also known as middleware to intercept data */
/**parse incoming string or array data */
// destructure the extended property and value
app.use(express.urlencoded({ extended: true }));
/**parse incoming JSON data */
app.use(express.json());
// if we dont do the above middleware, the POST request will return
// undefined, because it wasn't specified how to handle the POST

/** express middleware that will instruct the server what to send
 * when the client asks for front end resources like images, JS, and/or CSS
 * so instead of creating a route for every front-end asset
 * we use this middleware.
 * this will instruct the server to make certain files readily available
 * and not gate it behind the server endpoint. 
 */


/** when using this middleware, any console logs are omitted
 * whenever the get request to '/' is made
 */
app.use(express.static('public'));

//once client requests to enter the home address of the server
// this will serve up the HTML document for them to look at.
// notice the file name itself is not in the browser URL
app.get('/', (req, res) => {
  console.log("================");
  console.log("\x1b[33m", " GET request for home page", "\x1b[00m");
  console.log(req.ip);
  //this entire get request becomes ignored as the static above
  // is taking care of every file inside the public folder
  // instead of creating a route for every single file in public/
  //res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/animals', (req, res) => {
  console.log("================");
  console.log("\x1b[33m", " GET request for animals page", "\x1b[00m");
  console.log(req.path);
  res.sendFile(path.join(__dirname, '/public/animals.html'));
});

app.get('/zookeepers', () => {
  console.log("================");
  console.log("\x1b[33m", " GET request for animals page", "\x1b[00m");
  console.log(req.path);
  res.sendFile(path.join(__dirname, '/public/zookeepers.html'));
});

const { animals } = require('./data/animals.json');//can put .json extension here or leave it out

//this route could be named anything. as long as the client
// types this in they will get the response we set here
// it could be named /api/meatloaf!
// if any changes are saved here need to restart the server!
// this isn't a live server at the moment
app.get('/api/animals', (req, res) => {
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
app.get('/api/animals/:id', (req, res) => {
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
app.post('/api/animals', (req, res) => {
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




app.listen(PORT, () => {
  console.log("\x1b[32m", `API server now on port 3001!`, "\x1b[00m");
});


//link to first deployment
//https://enigmatic-reef-32412.herokuapp.com/api/animals?personalityTraits=hungry
