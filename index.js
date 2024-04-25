import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connect from './db/connect.js'
import userRouter from './src/login/user.router.js'
import carRouter from './src/cars/cars.router.js'
import prodectRouter from './src/producte/product.route.js'
import costRouter from './src/cost/cost.router.js'
import sellRouter from './src/sell/sell.router.js'

dotenv.config()

const app = express()
const port = 3001
app.use(express.json())
app.use(cors())
app.post('/' , (req, res) => {
  const {body} = req
  console.log({body})
  res.send(body)
})
app.use('/user' , userRouter)
app.use('/cars' , carRouter)
app.use('/product' , prodectRouter)
app.use('/cost' ,costRouter)
app.use('/sell' ,sellRouter)
app.use((err , req , res, next)=>{
    res.status( err.statusCode  || 400).send({message : err.message});
  })
  connect()
app.listen(process.env.PORT ||port, () => {
    console.log(`http://localhost:${port}`)
})