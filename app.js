require('dotenv').config();

const express = require('express')

const routes = require('./src/routes')
const errorHandler = require('./src/middlewares/error.handler')

const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(3000);
