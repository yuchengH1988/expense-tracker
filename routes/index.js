const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')
const apis = require('./modules/apis')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/auth', auth)
router.use('/records', authenticator, records)
router.use('/api', authenticator, apis)
router.use('/', authenticator, home)



module.exports = router