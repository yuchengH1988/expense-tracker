const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const app = express()
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const Record = require('./models/record.js')
const Category = require('./models/category.js')
const generateIconHTML = require('./generateIconHTML.js')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get('/', (req, res) => {
  let totalAmount = 0
  const categories = []
  Category.find()
    .lean()
    .then((items) => {
      categories.push(...items)
      Record.find()
        .lean()
        .then(records => {
          records.forEach(record => {
            totalAmount += Number(record.amount)
            record.date = record.date.toString().slice(4, 15)
            record.iconHTML = generateIconHTML(record.category)
          })
          res.render('index', { records, categories, totalAmount })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})