import express, { json } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import productsRouter from './routes/products.js'
import authRouter from './routes/auth.js'
import cartRouter from './routes/cart.js'

dotenv.config()
// Creating new instances of express
const app = new express()
app.use(cors({origin: 'http://localhost:5175', credentials: true}))
app.use(express.json()) //For parsing the unparsed data
// Defining the paths/routes for getting to certain part of the app
app.use("/api/products", productsRouter)
app.use("/api/auth", authRouter)
app.use("/api/cart", cartRouter)


const PORT = process.env.PORT || 5000
// Defining a connection to the Database present in Mongo DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB is connected successfully')
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch((err) => {
        console.log('MongoDB is connected successfully', err)
        process.exit(1)
    })