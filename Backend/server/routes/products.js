import express from 'express'
import Product from '../models/Product.js'
import mongoose from 'mongoose'

const router = express.Router()
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
    const {id} =  req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "Invalid Id"})
    }
    const product = await Product.findById(id)
    if(!product) {
        return res.status(404).json({message: "Not Found"})       
    }
    res.json(product)
   } catch(err) {
    res.status(500).json({message: "Server error", error: err.message})
   }
})
export default router