const mongoose = require("mongoose")
const Schema = mongoose.Schema

const movieSchema = new Schema({
    id: {type: [String]},
    imdb_id: {type: [String]},
    original_title: {type: [String]},
    poster_path: {type: [String]}
}, {
    timestamps: true
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie