import express from 'express' // Importing express
import jwt from 'jsonwebtoken' // Importing jsonwebtoken for token handling
import User from '../models/User.js' // Importing User model for user operations

const router = express.Router() // Creating a new router instance
//User registration endpoint
router.post("/register", async(req, res) => {
    try{
    // Destructuring name, email, and password from request body
    const {name, email, password} = req.body
    // Validating essential fields
    if(!name.trim() || !email.trim() || !password.trim()) {
        return res.status(400).json({message: "Missing essential fields"})
    }
    // Checking if the user already exists
    const existing = await User.findOne({email})
    // If user exists, return an error
    if(existing) {
        return res.status(400).json({message: "User Exists"})       
    }
    const newUser = new User({name, email, password})
    await newUser.save() // Saving the new user to the database
    // Sending a success response
    res.status(201).json({message: 'User Registered Successfully'})
// Error handling    
    }catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})
// User login endpoint
router.post("/login", async(req, res) => {
    try{
        // Destructuring email and password from request body
        const {email, password} = req.body
        // Validating essential fields
        if(!email?.trim() || !password?.trim()) {
        return res.status(400).json({message: "Missing essential fields"})
        }
        // Checking if the user exists with the provided email
        const user = await User.findOne({email})
        // If user does not exist or password does not match, return an error
        if(!user || user.password !== password) {
            return res.status(401).json({message: "Invalid Credentials"})       
        }
        // Generating a JWT token for the user
    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )
    // Sending the token and user details in the response
    res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
   })
   // Error handling
 }catch(err) {
         res.status(500).json({message: "Server error", error: err.message})
    } 
})
// exporting the router to be used in other parts of the application
export default router