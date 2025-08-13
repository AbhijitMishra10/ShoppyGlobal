import mongoose from "mongoose"; // Importing mongoose to interact with MongoDB
import dotenv from 'dotenv' // Importing dotenv to manage environment variables
import fetch from 'node-fetch' // Importing node-fetch to make HTTP requests
import Product from './models/Product.js' // Importing the Product model to interact with the products collection
// loading environment variables from .env file
dotenv.config()
// Function to seed products into the MongoDB database
const seedProducts = async () => {
    try {
        // Connecting to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected")

        console.log("Fetching from the Dummy Api")
        // Fetching products from the Dummy JSON API
        const res = await fetch("https://dummyjson.com/products")
        const data = await res.json()
        //Transforming the fetched data to match the Product model schema
        const products = data.products.map(p => ({
            name: p.title,
            price: p.price,
            description: p.description,
            stock: p.stock,
            image: p.thumbnail,
            category: p.category

        }))
        //Clearing the existing products in the database to avoid duplicates
        await Product.deleteMany({})
        // Inserting the transformed products into the MongoDB database
        await Product.insertMany(products)

        console.log(`Seeded ${products.length} products`)
        process.exit(0) // Exiting the process after seeding is complete
    }catch (err){
        console.log("Error seeding products:", err)
         process.exit(1) // Exiting the process with an error code if seeding fails
    }
    
}
//Running the seedProducts function to start the seeding process immediately
seedProducts()