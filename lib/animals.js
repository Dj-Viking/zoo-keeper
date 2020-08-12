const fs = require('fs');
const path = require('path');


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
  if (letterRegex.test(animal.name) && letterRegex.test(animal.species) && letterRegex.test(animal.diet) && animal.personalityTraits === undefined) {
    return false;
  } 
  if (letterRegex.test(animal.name) && letterRegex.test(animal.species) && letterRegex.test(animal.diet) && animal.personalityTraits === "") {
    return false;
  }

  let [...arrayRest] = animal.personalityTraits;
  let joinedRest = arrayRest.join('');
  console.log()
  console.log(joinedRest);
  if (letterRegex.test(animal.name) && letterRegex.test(animal.species) && letterRegex.test(animal.diet) && typeof joinedRest === 'number') {
    return false;
  }

  let parsedName = validateAnimalParsed(animal.name);
  console.log(parsedName);
  let parsedSpecies = validateAnimalParsed(animal.species);
  console.log(parsedSpecies);
  let parsedDiet = validateAnimalParsed(animal.diet);
  console.log(parsedDiet);
  if (letterRegex.test(joinedRest) === false) {
    return false;
  }
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
  console.log("================");
  console.log("\x1b[33m", "writing file to this path", "\x1b[00m");
  console.log(path.join(__dirname, '../data/animals.json'));
  fs.writeFileSync(
    // not putting .data...i get an error saying .data is not in the path
    path.join(__dirname, '../data/animals.json'),
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  //return the value of the body data
  console.log("================");
  console.log("\x1b[33m", "animal that we are adding", "\x1b[00m");
  console.log(animal);
  console.log("================");
  console.log("\x1b[33m", "newly made animalsArray", "\x1b[00m");
  //console.log(animalsArray);
  return animal;
  //return finished code to post route for response
  //return body;
 
}

module.exports = {
  filterByQuery,
  findById,
  validateAnimalParsed,
  validateAnimal,
  createNewAnimal
};


