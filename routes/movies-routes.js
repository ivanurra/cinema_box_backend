const express = require('express')
const router = express.Router()
const User = require('../models/User')

// MOVIES ROUTES

router.post('/profile/addmovie/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.body, {$push: {favoriteMovies: req.params.id}})
        .then((result) => {
                console.log(result)
            })
        .catch((err) => {
                console.log(err)
            })
})

router.post('/profile/deleteFavMovie/:id', (req, res, next) => {

    User.findByIdAndUpdate(req.body, {$splice: {favoriteMovies: req.params.id}})
        .then((result) => {
                console.log(result)
            })
        .catch((err) => {
                console.log(err)
            })
})

router.post('/profile/addserie/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.body, {$push: {favoriteSeries: req.params.id}})
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post('/profile/deleteFavSerie/:id', (req, res, next) => {

    User.findByIdAndUpdate(req.body, {$splice: {favoriteSeries: req.params.id}})
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router