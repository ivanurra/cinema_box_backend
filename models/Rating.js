// RATING MODEL
// Not implemented. It will apply to future versions.

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    idMovie: {type: String},
    username: {type: String},
    rating: {type: String}
},
{
    timestamps: true
})

const Rating = mongoose.model("Rating", ratingSchema)

module.exports = Rating