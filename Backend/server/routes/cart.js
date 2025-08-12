import mongoose from "mongoose";
import express from 'express'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import auth from '../middleware/auth.js'

const router = express.Router()
router.use(auth)
// Get Cart
router.get("/", async(req, res) => {
   try{ const cart = await Cart.findOne({user: req.user.userId}).populate('items.product')
    res.json(cart || {items: []})
    }catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})
// Add to Cart
router.post('/', async (req,res) => {
    try {const { productId, quantity = 1 } = req.body
    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({message: "Invalid Product ID"})
    }
    if (quantity <= 0) {
        return  res.status(400).json({message: "Quantity must be greater than 0"})
    }
    const product = await Product.findById(productId)
    if(!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    let cart = await Cart.findOne({
        user: req.user.userId
    })
    if(!cart) {
        cart = new Cart({ user: req.user.userId, items: [{product: productId, quantity}] })
        await cart.save()
        return res.status(201).json(cart)
    }

    const idx = cart.items.findIndex(i => i.product.toString() === productId)
    if(idx > -1) cart.items[idx].quantity += quantity
    else cart.items.push({ product: productId, quantity})

    await cart.save()
    res.json(cart)
    }catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})
//Update Quantity
router.put("/:productId", async(req,res) => {
   try{
    const {productId} = req.params
    const {quantity} = req.body
    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({message: "Invalid product id"})
    }

    const cart = await Cart.findOne({user: req.user.userId})
    if(!cart) {
        return res.status(404).json({message: 'Cart not found'})
    }

    const idx = cart.items.findIndex(i => i.product.toString() === productId)
    if(idx === -1) {
        return res.status(404).json({message: 'Product not in cart'}) 
    }

    if(quantity <= 0) cart.items.splice(idx,1)
    else cart.items[idx].quantity = quantity

    await cart.save()
    res.json(cart)
  }catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})
// Delete Quantity
router.delete('/:productId', async (req,res) => {
try{
    const {productId} = req.params
    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({message: 'Invalid Product Id'})         
    }
    const cart = await Cart.findOne({
        user: req.user.userId
    })
    if(!cart) {
       return res.status(404).json({message: 'Cart not found'})  
    }
    cart.items = cart.items.filter(i => i.product.toString() !== productId)
    await cart.save()
    res.json(cart) 
  }catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})

export default router