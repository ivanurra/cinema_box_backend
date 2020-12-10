const express = require('express')
const router = express.Router()

const User = require('../models/User')

// MOVIES ROUTES

router.post('/profile/addmovie/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.body, { $addToSet: { favoriteMovies: req.params.id } }, {new: true} )
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.post('/profile/deleteFavMovie/:id', (req, res, next) => {

    User.findByIdAndUpdate(req.body, { $pull: { favoriteMovies: req.params.id } }, {new: true})
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/profile/addserie/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.body, { $addToSet: { favoriteSeries: req.params.id } } )
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.post('/profile/deleteFavSerie/:id', (req, res, next) => {

    User.findByIdAndUpdate(req.body, { $pull: { favoriteSeries: req.params.id } })
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router