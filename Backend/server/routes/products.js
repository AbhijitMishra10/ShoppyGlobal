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
// Create a new product
router.post("/", async(req, res) => {
    // Endpoint to create a new product
    try {
        const {name, price, description, stock, image, category} = req.body // Destructuring product details from request body
        // Validating essential fields
        if(!name.trim()) {
            return res.status(400).json({message: "Name is required"})
        }
         const newProduct = new Product({
            // Creating a new product instance with the provided details
            name,
            price,
            description,
            stock,
            image,
            category
        })
        // Saving the new product to the database
        await newProduct.save()
        // Sending a success response with the created product details
        res.status(201).json({message: "Product Created Successfully", product: newProduct})
    }
    // Handle any errors that occur during the process
    catch(err) { 
        res.status(500).json({message: "Server error", error: err.message})
    }
})

// Update product by Id
router.put("/:id", async(req, res) => {
    try {
        // Endpoint to update an existing product by Id
        const {id} = req.params // Extracting id from request parameters
        // Validate the id format, if it's not a valid ObjectId, return a 400 error
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid Id"})
        }
        // Find the product by id and update it with the provided details
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true})
        // If the product is not found, return a 404 error
        if(!updatedProduct) {
            return res.status(404).json({message: "Not Found"})
        }
        // Sending a success response with the updated product details
        res.json({message: "Product Updated Successfully", product: updatedProduct})
    } 
    // Handle any errors that occur during the process
    catch(err) {
        res.status(500).json({message: "Server error", error: err.message})
    }
})
// Delete product by Id
router.delete("/:id", async(req, res) => {
    try {
        // Endpoint to delete a product by Id
        const {id} = req.params // Extracting id from request parameters
        // Validate the id format, if it's not a valid ObjectId, return a 400 error
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid Id"})
        }
        // Find the product by id and delete it
        const deletedProduct = await Product.findByIdAndDelete(id)
       // If the product is not found, return a 404 error
        if(!deletedProduct) {
            return res.status(404).json({message: "Not Found"})
        }
        // Sending a success response indicating the product has been deleted
        res.json({message: "Product Deleted Successfully"})
    } 
    // Handle any errors that occur during the process
    catch(err) {
        res.status(500).json({message: "Server error", error: err.message})
    }
})  
// Export the router to be used in other parts of the application
export default router