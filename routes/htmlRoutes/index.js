const express = require('express');
const path = require('path');
const router = require('express').Router();

router.use(express.static('public'));

//once client requests to enter the home address of the server
// this will serve up the HTML document for them to look at.
// notice the file name itself is not in the browser URL
router.get('/', (req, res) => {
  console.log("================");
  console.log("\x1b[33m", " GET request for home page", "\x1b[00m");
  console.log(req.ip);
  //this entire get request becomes ignored as the static above
  // is taking care of every file inside the public folder
  // instead of creating a route for every single file in public/
  //res.sendFile(path.join(__dirname, '../../public/index.html'));
  //res.sendFile(path.join(__dirname, '../../public/assets/css/style.css'));
  
});

router.get('/animals', (req, res) => {
  console.log("================");
  console.log("\x1b[33m", " GET request for animals page", "\x1b[00m");
  console.log(req.path);
  res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
  console.log("================");
  console.log("\x1b[33m", " GET request for animals page", "\x1b[00m");
  console.log(req.path);
  res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

module.exports = router;