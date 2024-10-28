const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const {errorHandler} =  require('./middleware/errormiddleware');
const { connectDB } = require('./config/db');


const port = process.env.PORT || 5000


connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/goals',require('./routes/goalsroutes'))

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server is running in port ${port}`)
})