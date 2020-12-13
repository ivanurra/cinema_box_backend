// file: routes/index.js

const express = require('express')
const router  = express.Router()

/* GET home page */
router.get('/', (req, res, next) => {
  res.send('Home')
});

module.exports = router
