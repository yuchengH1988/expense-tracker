const mongoose = require('mongoose')
const Category = require('../category.js')
const categories = require('./categories.js') // 載入 todo model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Category.insertMany(categories)
    .then(() => {
      console.log('categories done')
      db.close()
    })
})