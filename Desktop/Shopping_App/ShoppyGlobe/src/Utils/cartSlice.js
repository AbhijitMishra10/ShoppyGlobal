// Import createSlice from Redux Toolkit to create cart slice
import { createSlice } from "@reduxjs/toolkit";
// Create a cart slice with name, initial state, and reducers
const cartSlice = createSlice({
    name:'cart',
    initialState: {
        items: [] //The cart contains an array of items
    },
    reducers: {
        // Add a product to the cart
        addToCart: (state,action) => {
            const product = action.payload
            const existing = state.items.find(item => item.id === product._id)
            if(existing) {
                // If product already exists in cart, increase quantity
                existing.quantity += 1
            } else {
                // If product doesn't exist, add it with quantity 1
                state.items.push({...product, quantity: 1})
            }
        },
        // Remove a product from the cart decrease quantity or remove fully
        removeFromCart: (state,action) => {
            const id = action.payload
            state.items = state.items.filter(item => item.id !== id)
        }, 
        // Update quantity of a product in the cart manually
        updateQuantity: (state,action) => {
            const { id, quantity } = action.payload
            const item = state.items.find(item => item.id === id)
            if (item) item.quantity = quantity
        },
        // Clear the cart value
        clearCart: (state) => {
            state.items = []
        }
    }
})
// Export actions and reducer
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer