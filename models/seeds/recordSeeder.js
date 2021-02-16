const mongoose = require('mongoose')
const Record = require('../record.js')
const records = require('./records.js') // 載入 todo model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Record.insertMany(records)
    .then(() => {
      console.log('records done!')
      db.close()
    })
})