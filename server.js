const fs = require('fs');
const path = require('path');

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

createNewAnimal = (body, animalsArray) => {
  console.log("================");
  console.log("\x1b[33m", "creating new animal body object log", "\x1b[00m");
  console.log(body);
  //create an animal based on the json data we got from POST request body
  const animal = body;
  //push this data onto the animalsArray
  animalsArray.push(animal);
  //write file sync is synchronous version of write file doesn't
  // require a callback function at all. 
  // if writing a larger data set the asynchronous would be better
  // but this will probably write almost instantaneously. 

  /** using path.join() to join the path of this projects current
   *  directory name
   *  with the path to animals.json file
   *  null argument means we dont want to edit any existing data; if we did,
   *  we could pass something in here. the 2 indicates we want to create
   *  white space in between our values to make it more readable.
   */
  fs.writeFileSync(
    // not putting .data...i get an error saying .data is not in the path
    path.join(__dirname, 'data/animals.json'),
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  console.log("================");
  console.log("\x1b[33m", "writing file to this path", "\x1b[00m");
  console.log(path.join(__dirname, '.data/animals.json'));
  //return the value of the body data
  console.log("================");
  console.log("\x1b[33m", "animal that we are adding", "\x1b[00m");
  console.log(animal);
  console.log("================");
  console.log("\x1b[33m", "newly made animalsArray", "\x1b[00m");
  console.log(animalsArray);
  return animal;
  //return finished code to post route for response
  //return body;
}
const letterRegex = /^[a-zA-Z]+$/;
validateAnimalParsed = name => {
  console.log("\x1b[33m","checking input string", "\x1b[00m");
    //check incoming string
    console.log(name);
    //does it contain only letters
    console.log("\x1b[32m", "testing letter regex", "\x1b[00m");
    console.log(letterRegex.test(name));
    //expect(letterRegex.test(name)).toBe(false);
    if (letterRegex.test(name)) {
      
      console.log("\x1b[33m", "checking message contains only letters", "\x1b[00m");
      return name;
    } else {
      //keep testing
    }
    let splitStringArr = name.split('');
    console.log("\x1b[33m", "checking split string arr", "\x1b[00m");
    console.log(splitStringArr);
    
    let parsedStringArr = [];
    for (let i = 0; i <splitStringArr.length; i++) {
      parsedStringArr.push(parseInt(splitStringArr[i]));
    }
    console.log("\x1b[33m", " checking parsed string arr", "\x1b[00m");
     console.log(parsedStringArr);//has NaN inside
     parsedArr = [parsedStringArr];
     if (parsedStringArr.includes(NaN)){
        console.log("\x1b[33m", "checking includes NaN", "\x1b[00m");
     } else {
        console.log("\x1b[33m", "string contains numbers", "\x1b[00m");
        if (parsedStringArr.includes(NaN)) {
          
        }
        return parseInt(parsedStringArr.join(''));
     }
     console.log(parsedStringArr.join(''));
    let noNaNArr = parsedStringArr.filter(index => !isNaN(index));
    console.log("\x1b[33m", "no NaN Array", "\x1b[00m");
    console.log(noNaNArr);
    console.log("\x1b[33m", "joined no NaN Array of numbers", "\x1b[00m");
    console.log(parseInt(noNaNArr.join('')));
    console.log("\x1b[31m", "this message has numbers!");
    
    return parseInt(noNaNArr.join(''));//this is a number
    //return noNaNArr.join('');//this is a string
  }

  //const numRegex = /[0-9]/g;
validateAnimal = animal => {
  //console.log(animal.personalityTraits);
  if (letterRegex.test(animal.name) && animal.species === '' && animal.diet === '' && animal.personalityTraits === []) {
    return false;
  }
  if (animal.name === '' && letterRegex.test(animal.species) && animal.diet === '' && animal.personalityTraits === []) {
    return false;
  }
  if (animal.name === '' && animal.species === '' && letterRegex.test(animal.species) && animal.personalityTraits === []) {
    return false;
  }
  if (letterRegex.test(animal.name) && letterRegex.test(animal.species) && letterRegex.test(animal.diet) && animal.personalityTraits[0] === undefined) {
    return false;
  } if (letterRegex.test(animal.name) && letterRegex.test(animal.species) && letterRegex.test(animal.diet) && animal.personalityTraits[0] === "") {
    return false;
  }
  // if (!isNaN(animal.name) === false || !isNaN(animal.species) === false || !isNaN(animal)) {
  //   return false;
  // }
  let parsedName = validateAnimalParsed(animal.name);
  console.log(parsedName);
  let parsedSpecies = validateAnimalParsed(animal.species);
  console.log(parsedSpecies);
  let parsedDiet = validateAnimalParsed(animal.diet);
  console.log(parsedDiet);
  if (!animal.name || typeof animal.name !== 'string' || animal.name === '' || typeof parsedName === 'number') {
    return false;
  }
  if (!animal.species || typeof animal.species !== 'string' || animal.species === '' || typeof parsedSpecies === 'number') {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== 'string' || animal.diet === '' || typeof parsedDiet === 'number') {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  //if request passes these tests then return true
  return true;
}


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
    results = filterByQuery(req.query, results);
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
  if (validateAnimal(req.body) === false) {
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
    const animal = createNewAnimal(req.body, animals);
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
