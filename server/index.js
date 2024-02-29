import express from 'express'
import dontenv from 'dotenv'
import gearRouter from './routes/gearRouter.js'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import reservationRouter from './routes/reservationRouter.js'
import cors from 'cors'; // Import the cors middleware


dontenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(cors()); // Use the cors middleware to enable CORS

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
})

app.use(express.json({limit:'30mb'}));
app.use('/reservation', reservationRouter); // failing when i enter this and the server cant start
app.use('/user', userRouter);
app.use('/gear', gearRouter);
app.get('/', (req, res)=>res.json({messsage:"Welcome to our API"}))
app.use((req, res)=>res.status(404).json({success:false, message: 'Not Found'}))

const startServer = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECT);
        app.listen(port, ()=> console.log(`Server is istnening on port: ${port}`))
    }catch(error){
        console.log(error)
        console.log('crash at index')
    }
}

startServer();