const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const tenPercentile = require('../../tenPercentile')

// 設定首頁路由
router.get('/', (req, res) => {
  //過濾包
  const filter = { userId: req.user._id }
  //月份過濾包
  const months = [{ id: 'all', name: '所有月份' }]
  for (let i = 1; i <= 12; i++) {
    months.push({ id: i, name: `${i}月份` })
  }

  let selectedMonth = req.query.month
  if (selectedMonth && selectedMonth !== 'all') {
    const today = new Date()
    const thisYear = today.getUTCFullYear()
    filter.date = { $gte: `${thisYear}-${selectedMonth}-1`, $lte: `${thisYear}-${selectedMonth}-31` }
  } else selectedMonth = 'all'
  //分類過濾包
  const categories = []
  Category.find()
    .lean()
    .then((items) => {
      categories.push(...items)
      categories.unshift({ name: '所有類別' })
    })

  let selectedCategory = req.query.category || ''
  if (selectedCategory && selectedCategory !== '所有類別') filter.category = selectedCategory
  else selectedCategory = undefined
  //紀錄產生包
  let totalAmount = 0

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
      res.render('index', { months, records, categories, totalAmount, selectedCategory, selectedMonth })
    })
    .catch(error => console.error(error))
})
module.exports = router