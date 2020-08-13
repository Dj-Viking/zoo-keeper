const fs = require('fs');
const path = require('path');
const zookeepers = require('../data/zookeepers.json');

filterZkByQuery = (query, zookeepers) => {
  let filteredResults = zookeepers;
  if (query.age) {
    filteredResults = filteredResults.filter(zookeeper => {
      return zookeeper.age === Number(query.age);
    });
  }
  if (query.favoriteAnimal) {
    filteredResults = filteredResults.filter(zookeeper => {
      return zookeeper.favoriteAnimal === query.favoriteAnimal;
    });
  }
  if (query.name) {
    filteredResults = filteredResults.filter(zookeeper => {
      return zookeeper.name === query.name;
    });
  }
  return filteredResults;
}

findZkById = (id, zookeepers) => {
  const result = zookeepers.filter(zookeeper => zookeeper.id === id)[0]
  return result;
}

createNewZookeeper = (body, zookeepers) => {
  console.log(zookeepers.zookeepers);
  const zookeeper = body;
  console.log(zookeeper);
  zookeepers.push(zookeeper);
  fs.writeFileSync(
    path.join(__dirname, "../data/zookeepers.json"),
    JSON.stringify({ zookeepers: zookeepers }, null, 2)
  );
  return zookeeper
}

validateZookeeper = zookeeper => {
  if (!zookeeper.name || typeof zookeeper.name !== "string") {
    return false;
  }
  if (!zookeeper.age || typeof zookeeper.age !== "number") {
    return false
  }
  if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string") {
    return false;
  }
  return true;
}

module.exports = {
  filterZkByQuery,
  findZkById,
  createNewZookeeper,
  validateZookeeper,
};