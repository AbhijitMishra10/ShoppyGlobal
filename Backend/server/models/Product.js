import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    description: String,
    stock: Number,
    image: String,
    category: String,
}, {timestamps: true})

export default mongoose.model('Product', ProductSchema)
