const fs = require('fs');
const animalFuncs = require('../lib/animals.js');
const { animals } = require('../data/animals.json');


//using jest mock to prevent fs from writing the file to
// the disk
jest.mock('fs');
test('creates an animal object', () => {
  const animal = animalFuncs.createNewAnimal(
    {
      name: "Yoda",
      diet: "herbivore",
      personalityTraits: ["strong", "smart"]
    },
    animals
  )

  expect(animal.name).toBe("Yoda");
});

test('filters by query', () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky, rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];
  const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

  expect(updatedAnimals.length).toEqual(1);
});

test("finds by id", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky, rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const result = findById("3", startingAnimals);

  expect(result.name).toBe("Erica");
});

test("validates personality traits", () => {
  const animal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
    personalityTraits: ["quirky", "rash"],
  };

  const invalidAnimal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
  };

  const result = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(result2).toBe(false);
})