const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('../backend/middleware/errorMiddleware')
const colors = require('colors')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

connectDB()

const app = express() 

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/matches', require('./routes/matchRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))