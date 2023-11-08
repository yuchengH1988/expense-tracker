const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
// filter??

router.get('/records', async (req, res, next) => {
  try {
    let categories = []
    let records = []
    await Category.find()
      .lean()
      .then(items => {
        items.forEach(item => categories.push(item.name))
      })
    await Record.find()
      .lean()
      .then(items =>
        records = items.map(item => {
          return {
            name: item.name,
            amount: item.amount,
            category: item.category
          }
        }))

    let data = []
    for (i = 0; i++; i <= categories.length) {
      records.forEach(record => {
        if (record.category === categories[i]) {
          data[i] += Number(record.amount)
        }
      })
    }

    console.log('categories:', categories)
    console.log('data:', data)
    return res.json({ categories, data })
  } catch (e) {
    next(e)
  }


})





module.exports = router