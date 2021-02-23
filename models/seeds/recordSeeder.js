const Record = require('../record.js')
const records = require('./records.js') // 載入 todo model
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.insertMany(records)
    .then(() => {
      console.log('records done!')
      db.close()
    })
})