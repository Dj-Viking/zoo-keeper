//const fs = require('fs');
//const path = require('path');
// const animalFuncs = require('./lib/animals.js');
// ^ moved to animalRoutes


const express = require('express');//no extension here
const PORT = process.env.PORT || 3001;
const app = express();
//not loading the javascript files inside routes
// but the folders themselves
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

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


//this will tell the server any time a client navigates to
// <ourhost>/api, the app wll use the router we set up in apiRoutes
// If '/' is the endpoint, then the router will serve back our HTML routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


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
// app.use(express.static('public'));



//const { animals } = require('./data/animals.json');//can put .json extension here or leave it out

app.listen(PORT, () => {
  console.log("\x1b[32m", `API server now on port 3001!`, "\x1b[00m");
});


//link to first deployment
//https://enigmatic-reef-32412.herokuapp.com/api/animals?personalityTraits=hungry
