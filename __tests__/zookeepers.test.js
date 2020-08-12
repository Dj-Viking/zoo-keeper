const fs = require('fs');
const ZKFuncs = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');
const { filterByQuery } = require('../lib/animals.js');
const { findZkById, validateZookeeper } = require('../lib/zookeepers.js');

jest.mock('fs');
test('creates a zookeeper object', () => {
  const zookeeper = createNewZookeeper(
    {
      id: "0",
      name: "Darlene",
      age: "1",
      favoriteAnimal: "gorilla",
    },
    zookeepers
  );
  
  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("0");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,//age has to be number or query search wont work
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const updatedZookeepers = filterZkByQuery({ age: 31}, startingZookeepers);
  //console.log(startingZookeepers);
  expect(updatedZookeepers.length).toBe(1);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const result = findZkById("3", startingZookeepers);

  expect(result.name).toBe("Isabella");
});

test("validates age", () => {
  const zookeeper = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
  };

  const invalidZookeeper = {
    id: "3",
    name: "Isabella",
    age: "67",
    favoriteAnimal: "bear",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
})