const router = require('express').Router();
const ZKFuncs = require('../../lib/zookeepers.js');
const { zookeepers } = require('../../data/zookeepers.json');
const { createNewZookeeper } = require('../../lib/zookeepers.js');


router.get('/zookeepers', (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = ZKFuncs.filterZkByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
  const result = ZKFuncs.findZkById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post('/zookeepers', (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    req.body.id = "0"
    console.log(req.body);
    req.body.id = zookeepers.length.toString();
  }
  
  if(!validateZookeeper(req.body)) {
    res.status(400).send("The zookeeper is not properly formatted.");
  } else {
    console.log(zookeepers);
    const zookeeper = createNewZookeeper(req.body, zookeepers);
    res.json(zookeeper);
  }
});

module.exports = router;