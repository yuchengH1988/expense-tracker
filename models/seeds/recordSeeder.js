const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Record = require('../record')
const records = require('./records') // 載入 todo model
const categories = require('./categories')
const User = require('../user')


const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '1234'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id

      records.forEach(record => {
        record.icon = categories.find(
          category => category.name === record.category
        ).icon
        record.userId = userId
      })
      Record.insertMany(records)
        .then(() => {
          console.log('records done ! ')
          db.close()
        })
    })
})