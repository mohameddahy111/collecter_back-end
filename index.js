import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connect from './db/connect.js'
import userRouter from './src/login/user.router.js'
import carRouter from './src/cars/cars.router.js'
import prodectRouter from './src/producte/product.route.js'

dotenv.config()

const app = express()
const port = 3001
app.use(express.json())
app.use(cors())
app.use('/user' , userRouter)
app.use('/cars' , carRouter)
app.use('/product' , prodectRouter)
app.use((err , req , res, next)=>{
    res.status( err.statusCode  || 400).send({message : err.message});
  })
  connect()
app.listen(process.env.PORT ||port, () => {
    console.log(`http://localhost:${port}`)
})