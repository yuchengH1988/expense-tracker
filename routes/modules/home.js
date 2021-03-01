const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const tenPercentile = require('../../tenPercentile')

// 設定首頁路由
router.get('/', (req, res) => {
  const seletedCategory = req.query.category || ''
  const filter = {}
  if (seletedCategory) {
    filter.category = seletedCategory
  }
  let totalAmount = 0
  const categories = []
  Category.find()
    .lean()
    .then((items) => {
      categories.push(...items)
      Record.find(filter)
        .lean()
        .sort({ date: 'asc' })
        .then(records => {
          records.forEach(record => {
            totalAmount += Number(record.amount)
            record.date = record.date.toString().slice(4, 15)
            record.amount = tenPercentile(record.amount)
          })
          totalAmount = tenPercentile(totalAmount)
          res.render('index', { records, categories, totalAmount, seletedCategory })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

module.exports = router