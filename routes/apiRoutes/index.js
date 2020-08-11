const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes.js');

router.use(animalRoutes);

module.exports = router;

/**this way were using api 
 * routes/index.js as a central hub for all routing 
 * functions we may want to add to the application.
 * seems like overkill with one exported module but as app evolves
 * it will become efficient for managing routing code and
 * keeping it modularized*/