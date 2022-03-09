const express = require('express')
const router = express.Router()

const healthController = require('./controllers/health.controller')
const companyController = require('./controllers/company.controller')

router.get('/', healthController)

router.get('/companies', companyController.all)

module.exports = router
