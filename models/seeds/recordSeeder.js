const Record = require('../record')
const records = require('./records') // 載入 todo model
const categories = require('./categories')
const db = require('../../config/mongoose')

db.once('open', () => {
  records.forEach(record => {
    record.icon = categories.find(
      category => category.name === record.category
    ).icon
  })
  Record.insertMany(records)
    .then(() => {
      console.log('records done!')
      db.close()
    })
})