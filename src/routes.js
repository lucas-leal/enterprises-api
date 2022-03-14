const express = require('express');
const router = express.Router();

const authMiddleware = require('./middlewares/auth.middleware');

const healthController = require('./controllers/health.controller');
const authController = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');
const employeeController = require('./controllers/employee.controller.js');

router.get('/', healthController);

router.use('/oauth', authController);
router.use(authMiddleware);

router.use('/users', userController);
router.use('/employees', employeeController);

module.exports = router;
