import mongoose from "mongoose";
// Product schema to represent products in the document database
const ProductSchema = new mongoose.Schema({
    // Name of the product, must be of type String and required
    name: {
        type: String,
        required: true
    },
    // Price of the product, must be of type Number(optional)
    price: Number,
    // Description of the product, must be of type String(optional)
    description: String,
    // Stock of the product, must be of type Number(optional)
    stock: Number,
    // Image URL of the product or path
    image: String,
    // Category of the product belongs to(optional)
    category: String,
}, {timestamps: true}) // Add createdAt and updatedAt timestamps
// Exporting the Product model based on the ProductSchema
export default mongoose.model('Product', ProductSchema)
