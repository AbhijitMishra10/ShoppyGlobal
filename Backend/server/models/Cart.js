import mongoose from "mongoose";
// Cart Schema to define the structure of the cart document for a user
const CartSchema = new mongoose.Schema({
    // Reference to the user who owns the cart(ObjectId linking to User model)
    user: {
        // Ensures that the user field is a valid ObjectId and references the User model
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
    },
    // Array of items in the cart
    items: [
        {
            // Reference to the product in the cart(ObjectId linking to Product model)
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Product'
            },
            // Quantity of the product in the cart
            // Default quantity is set to 1 if not specified
            quantity: {
                type: Number, default: 1
            }
        }
    ]
}, {timestamps: true}) //Automatically adds createdAt and updatedAt timestamps to the schema
// Exporting the Cart model based on the CartSchema
export default mongoose.model('Cart', CartSchema)