import express, { json } from 'express' // Importing express to create the server
import mongoose from 'mongoose' // Importing mongoose to interact with MongoDB
import dotenv from 'dotenv' // Importing dotenv to manage environment variables
import cors from 'cors' // Importing cors to handle cross-origin requests
// Importing the routes for products, authentication, and cart
import productsRouter from './routes/products.js'
import authRouter from './routes/auth.js'
import cartRouter from './routes/cart.js'
// Loading environment variables from .env file
dotenv.config()
// Creating new instances of express
const app = new express()
app.use(cors({origin: process.env.FRONTEND_URL || 'http://localhost:5174', credentials: true}))
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