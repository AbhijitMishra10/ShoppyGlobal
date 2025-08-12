import mongoose from "mongoose";
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import Product from './models/Product.js'

dotenv.config()

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected")

        console.log("Fetching from the Dummy Api")
        const res = await fetch("https://dummyjson.com/products")
        const data = await res.json()

        const products = data.products.map(p => ({
            name: p.title,
            price: p.price,
            description: p.description,
            stock: p.stock,
            image: p.thumbnail,
            category: p.category

        }))

        await Product.deleteMany({})
        await Product.insertMany(products)

        console.log(`Seeded ${products.length} products`)
        process.exit(0)
    }catch (err){
        console.log("Error seeding products:", err)
         process.exit(1)
    }
    
}

seedProducts()