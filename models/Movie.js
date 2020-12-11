const mongoose = require("mongoose")
const Schema = mongoose.Schema

const movieSchema = new Schema({
    id: String,
    imdb_id: String,
    original_title: String,
    poster_path: String
}, {
    timestamps: true
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie