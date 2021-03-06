// USER MODEL
// Save user data and their favorite movies and series in arrays.

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
      type: String,
      unique: true,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required:true
  },
  favoriteMovies: [],
  favoriteSeries:[]
}, 
{
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User