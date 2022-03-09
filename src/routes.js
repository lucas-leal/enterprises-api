const express = require('express')
const router = express.Router()

const authMiddleware = require('./middlewares/auth.middleware')

const healthController = require('./controllers/health.controller')
const authController = require('./controllers/auth.controller')
const companyController = require('./controllers/company.controller')

router.get('/', healthController)
router.post('/oauth/authorize', authController.authorize)

router.use(authMiddleware)

router.get('/companies', companyController.all)

module.exports = router
