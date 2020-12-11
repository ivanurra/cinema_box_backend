const express = require('express')
const moviesRoutes = express.Router()
const User = require('../models/User')

// MOVIES ROUTES

moviesRoutes.post('/profile/edit/:id', (req, res) => {

    const id = req.params.id
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    User.findByIdAndUpdate(id, {username: username, password: password, email: email})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

moviesRoutes.post('/profile/addmovie/:id', (req, res) => {
        
    User.findByIdAndUpdate(req.body, {$push: {favoriteMovies: req.params.id}})
        .then((result) => {
                console.log(result)
            })
        .catch((err) => {
                console.log(err)
            })
})

moviesRoutes.post('/profile/deleteFavMovie/:id', (req, res, next) => {

    // The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
    User.findByIdAndUpdate(req.body, {$pull: {favoriteMovies: req.params.id}})
        .then((result) => {
                console.log(result)
            })
        .catch((err) => {
                console.log(err)
            })
})

moviesRoutes.post('/profile/addserie/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.body, {$push: {favoriteSeries: req.params.id}})
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

moviesRoutes.post('/profile/deleteFavSerie/:id', (req, res, next) => {

    // The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
    User.findByIdAndUpdate(req.body, {$pull: {favoriteSeries: req.params.id}})
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = moviesRoutes