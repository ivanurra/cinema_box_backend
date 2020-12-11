const express = require('express')
const router  = express.Router()

const Movie = require("../models/Movie")
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.send('Home')
});

module.exports = router
