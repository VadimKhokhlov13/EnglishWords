const { Schema, model } = require('mongoose')

const schema = new Schema({
  id: {
    type: String
  },
  word: {
    type: String
  },
  translation: {
    type: String
  },
  points: {
      type: Number,
      default: 0
  },
  date: {
    type: Number,
    default: Math.floor(Date.now() / 1000)
  }
})

module.exports = model('Words', schema);