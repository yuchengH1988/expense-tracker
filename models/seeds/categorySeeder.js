const Category = require('../category.js')
const categories = require('./categories.js') // 載入 todo model
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.insertMany(categories)
    .then(() => {
      console.log('categories done')
      db.close()
    })
})