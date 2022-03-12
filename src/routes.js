const express = require('express')
const router = express.Router()

const authMiddleware = require('./middlewares/auth.middleware')

const healthController = require('./controllers/health.controller')
const authController = require('./controllers/auth.controller')
const userController = require('./controllers/user.controller')
const companyController = require('./controllers/company.controller')
const employeeController = require('./controllers/employee.controller.js');

router.get('/', healthController)
router.post('/oauth/authorize', authController.authorize)

router.use(authMiddleware)

router.post('/users', userController.create)
router.get('/companies', companyController.all)

router.use('/employees', employeeController);

module.exports = router
