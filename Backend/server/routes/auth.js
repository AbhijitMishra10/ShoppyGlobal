import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post("/register", async(req, res) => {
    try{
    const {name, email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({message: "Missing essential fields"})
    }
    const existing = await User.findOne({email})
    if(existing) {
        return res.status(400).json({message: "User Exists"})       
    }
    const newUser = new User({name, email, password})
    await newUser.save()

    res.status(201).json({message: 'User Registered Successfully'})
    }catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})

router.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body
        if(!email?.trim() || !password?.trim()) {
        return res.status(400).json({message: "Missing essential fields"})
        }
        const user = await User.findOne({email})
        if(!user || user.password !== password) {
            return res.status(400).json({message: "Invalid Credentials"})       
        }
    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )
    res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
   })
 }catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})

export default router