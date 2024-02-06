import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connect from './db/connect.js'

dotenv.config()

const app = express()
const port = 3001
app.use(cors())
app.use(express(express.json()))

connect()
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})