const express = require('express');
const router  = express.Router();

const Movie = require("../models/Movie")
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// module.exports = app => {

//   // Base URLS
//   app.use('/api', require('./movies-routes.js'))
//   app.use('/api', require('./auth-routes.js'))
// }

module.exports = router;
