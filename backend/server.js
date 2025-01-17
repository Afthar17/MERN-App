const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const {errorHandler} =  require('./middleware/errormiddleware');
const { connectDB } = require('./config/db');
const path = require('path')
const cors = require('cors')


const port = process.env.PORT || 5000


connectDB()




const app = express();


const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/goals',require('./routes/goalsroutes'))
app.use('/api/users',require('./routes/userRoutes'))

// // Serve frontend
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname,'../frontend/build')))
//     app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
// }else{
//     app.get('/',(re,res)=>{
//         res.send('App under development')
//     })
// }

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server is running in port ${port}`)
})