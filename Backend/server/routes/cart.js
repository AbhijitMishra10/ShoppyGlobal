//Importing necessary modules
import mongoose from "mongoose";
import express from 'express'
// Importing models and middleware
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import auth from '../middleware/auth.js'
// Creating a router instance
const router = express.Router()
router.use(auth) // Applying authentication middleware to all routes in this file
// Get Cart
router.get("/", async(req, res) => {
   try{ const cart = await Cart.findOne({user: req.user.userId}).populate('items.product') // Populating product details in the cart items
    res.json(cart || {items: []})
    }
    // Catching errors and sending a response
    catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})
// Add to Cart
router.post('/', async (req,res) => {
    // Extracting productId and quantity from request body
    try {const { productId, quantity = 1 } = req.body
    // Validating productId and quantity
    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({message: "Invalid Product ID"})
    }
    // Validating quantity
    if (quantity <= 0) {
        return  res.status(400).json({message: "Quantity must be greater than 0"})
    }
    // Finding the product by ID
    const product = await Product.findById(productId)
   // If product not found, return 404 error
    if(!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    // Finding the cart for the user
    let cart = await Cart.findOne({
        user: req.user.userId
    })
    // If cart does not exist, create a new cart
    if(!cart) {
        cart = new Cart({ user: req.user.userId, items: [{product: productId, quantity}] })
        await cart.save()
        return res.status(201).json(cart)
    }
    // If cart exists, check if the product is already in the cart
    const idx = cart.items.findIndex(i => i.product.toString() === productId)
    // If product is already in the cart, update the quantity
    if(idx > -1) cart.items[idx].quantity += quantity
    // If product is not in the cart, add it to the cart
    else cart.items.push({ product: productId, quantity})
    // Save the cart and return the updated cart
    await cart.save()
    res.json(cart)
    }
    // Catching errors and sending a response
    catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})
//Update Quantity
router.put("/:productId", async(req,res) => {
   try{
    // Extracting productId and quantity from request parameters and body
    const {productId} = req.params
    const {quantity} = req.body
    // Validating productId
    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({message: "Invalid product id"})
    }
    // Validating quantity
    const cart = await Cart.findOne({user: req.user.userId})
    // If cart does not exist, return 404 error
    if(!cart) {
        return res.status(404).json({message: 'Cart not found'})
    }
    // If quantity is not provided or is less than 1, return 400 error
    const idx = cart.items.findIndex(i => i.product.toString() === productId)
    if(idx === -1) {
        return res.status(404).json({message: 'Product not in cart'}) 
    }
   // If quantity is equal to 0 or less, remove the item from the cart
    if(quantity <= 0) cart.items.splice(idx,1)
    else cart.items[idx].quantity = quantity
    // Save the cart and return the updated cart    
    await cart.save()
    res.json(cart)
  }
  // Catching errors and sending a response
  catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})
// Delete Quantity
router.delete('/:productId', async (req,res) => {
try{
    // Extracting productId from request parameters
    const {productId} = req.params
    // Validating productId
    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({message: 'Invalid Product Id'})         
    }
    // Finding the cart for the user
    const cart = await Cart.findOne({
        user: req.user.userId
    })
    // If cart does not exist, return 404 error
    if(!cart) {
       return res.status(404).json({message: 'Cart not found'})  
    }
    // Finding the index of the product in the cart
    cart.items = cart.items.filter(i => i.product.toString() !== productId)
    await cart.save() // Save the cart after removing the product
    res.json(cart) // Return the updated cart
  }
  // Catching errors and sending a response
  catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})
// Exporting the router to be used in other parts of the application
export default router