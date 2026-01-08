import express from 'express'
import { dbConnection } from './config/db.config.js'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'

const app = express()
const PORT = 5000

dotenv.config();
dbConnection()
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send("Configuring MongoDB")
})

app.listen(PORT, () => console.log("Server started"));