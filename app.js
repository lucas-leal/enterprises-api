const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const routes = require('./src/routes')

const app = express()

app.use(routes)

app.listen(3000);
