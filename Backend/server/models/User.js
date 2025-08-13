import mongoose from "mongoose";
// Cart schema to represent the user's cart in the database
const UserSchema = new mongoose.Schema({ 
    // Name of the user
    name: String,
    // Email of the user, must be unique, required, and of type String
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Password of the user, must be of type String and required
    password: {
        type: String,
        required: true
    }
}, {timestamps: true}) //Add createdAt and updatedAt timestamps
// Exporting the User model based on the UserSchema
export default mongoose.model('User', UserSchema)