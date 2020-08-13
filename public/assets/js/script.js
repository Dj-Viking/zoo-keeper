

//since we are making this project in node we need to use this require
//the browser doesn't know what require is because a browser has its own
// engine
//const { response } = require("express");



const $animalForm = document.querySelector('#animal-form');
const $zookeeperForm = document.querySelector('#zookeeper-form');

const handleZookeeperFormSubmit = event => {
  event.preventDefault();

  //get zookeeper data and organize it
  const name = $zookeeperForm.querySelector('[name="zookeeper-name"]').value;
  const age = parseInt($zookeeperForm.querySelector('[name="age"]').value);
  const favoriteAnimal = $zookeeperForm.querySelector('[name="favorite-animal"]').value;

  const zookeeperObj = { name, age, favoriteAnimal };
  console.log(zookeeperObj);
  fetch('api/zookeepers', {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(zookeeperObj)
  })
  .then(res => {
    if (res.ok) {
      alert('Thank you for adding a zookeeper!');
      return res.json();
    } else {
      alert('Error: ' + res.statusText);
    }
  });
}

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  let name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;



  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  console.log(animalObject);

  // fetch POST request to the endpoint set up by the server
  // we set the headers property to inform the reqeust that this is going
  // to be JSON data. that way, we can add stringified JSON data for our animalObject
  // to the body property of the request. without the headers we would never
  // receive req.body on the server
  
  // we arent using the full URL here because this fetch request is 
  //actually coming from the server. similar to how using <script> and 
  //<link> are for local files, except this endpoint fetch is a local 
  //fetch to the server endpoint made by the server itself
  fetch('api/animals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObject)
  })
  .then(res => {
    console.log(res.statusText);
    if (res.status === 200) {
      //console.log(res.statusText);
      console.log("================");
      console.log("client created an animal!");
      window.alert('Thank you for adding an animal!');
      //console.log(res);
      return res.json();
    } else if (res.status === 400) {
      //console.log(res.statusText);
      alert('Error: animal name and species must not contain numbers, and must contain a personality Trait');
      //throw new Error("input the acceptable values in the form");
      return;
    }
  })
  .catch(err => err);

};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
$zookeeperForm.addEventListener('submit', handleZookeeperFormSubmit);//adding const in front of the arrow function binds the function i think...it was blue until i added the const and now its yellow and is recognized as a callback function...in theory.