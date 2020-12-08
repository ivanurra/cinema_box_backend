const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    tmdbId: String,
    idMovie: String,
    userID: String,
    username: String,
    comment: String
}, {
    timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment