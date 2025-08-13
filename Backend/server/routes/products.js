import express from 'express'
import Product from '../models/Product.js'
import mongoose from 'mongoose'
const router = express.Router() // Create a new router instance
//Get all Products
router.get("/", async(req,res) => {
    try{
        const products = await Product.find()
         res.json(products)
    }catch(err) {
        res.status(500).json({message: "Server error", error: err.message})
    }
    
})
// Get products by Id
router.get("/:id", async(req,res) => {
    try{
    const {id} =  req.params // Extracting id from request parameters
    // Validate the id format, if it's not a valid ObjectId, return a 400 error
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "Invalid Id"})
    }
    // Find the product by id
    const product = await Product.findById(id)
    if(!product) {
        return res.status(404).json({message: "Not Found"})       
    }
    // If product is found, return it as JSON
    res.json(product)
   }
   // Handle any errors that occur during the process 
   catch(err) {
    res.status(500).json({message: "Server error", error: err.message})
   }
})
// Export the router to be used in other parts of the application
export default router