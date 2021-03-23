const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const categories = []
  Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const record = req.body
  Category.find({ name: record.category })
    .lean()
    .then(category => {
      record.icon = category[0].icon
      Record.create({ ...record, userId })
        .then(() => res.redirect('/'))
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      Category.find({ name: record.category })
        .then(category => {
          record.icon = category[0].icon
          return record.save()
        })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router