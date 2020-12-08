const express = require('express')
const router = express.Router()

const Comment = require('../models/Comment')

router.post('/comment/newcomment', (req, res) => {
    const idMovie = req.body.idMovie
    const userID = req.body.userID
    const username= req.body.username
    const comment = req.body.comment
    const tmdbId = req.body.tmdbId

    Comment.create({ 
        tmdbId: tmdbId,
        idMovie: idMovie,
        userID: userID,
        username: username,
        comment: comment
    })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/comment/allComment', (req, res) => {
    const user = req.body.userID
    Comment.find({ userID: user })
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})

router.post('/comment/allCommentMovie', (req, res) => {
    const movieId = req.body.movieId
    Comment.find({ $or: [ { idMovie: movieId }, { tmdbId: movieId } ] })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router