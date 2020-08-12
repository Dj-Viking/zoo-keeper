const { animals } = require('../data/animals.json');
//const animalFuncs = require('../lib/animals.js');


const mockQuery = 
  {
  name: "Erica",
  personalityTraits: ['rash', 'quirky']
};

test('checks if the filter function returns the correct json based on the query string', () => {
  
  
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
      //now loop through each trait in the personalityTraits array
      personalityTraitsArray.forEach(trait => {
        filteredResults = filteredResults.filter(animal => {
          //return the value of the new array of animals into filteredResults
          // if the queried personalityTrait matches any of the animals in the animals array
          //console.log(animal.personalityTraits);
          return animal.personalityTraits.indexOf(trait) !== -1
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

  expect(filterByQuery(mockQuery, animals))
  .toEqual(
    [
      {
        "diet": "omnivore",
        "id": "2",
        "name": "Erica",
        "personalityTraits": [
          "quirky",
          "rash",
        ],
        "species": "gorilla",
      }
    ]
  )

})