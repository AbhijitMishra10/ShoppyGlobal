// Import necessary modules for this component
import React from 'react'
import { useDispatch, useSelector } from 'react-redux' //Hooks to dispatch actions and access store
import { addToCart, removeFromCart } from '../Utils/cartSlice' //Redux action to add product to cart
import { Link } from 'react-router-dom'
//ProductItem component - displays a single product card with Add to Cart functionality
function ProductItem({product}) {
  const dispatch = useDispatch() //Get dispatch method from Redux
// Get cart items from Redux store
  const items = useSelector(state => state.cart.items)
  // Check if this product is already in the cart
  const existing = items.find(item => item.id === product._id)
  // Determine current quantity in a cart (0 if not added yet)
  const quantity = existing ? existing.quantity : 0
  return (
    <div className='Product-Item'>
      <Link to={`/home/product/${product._id}`}>
      <img src={product.image} alt={product.name} width='100'/>
      <h4>{product.name}</h4>
      </Link>
      <p>₹{product.price}</p>
      {/* Add to cart button */}
      <button onClick={() => dispatch(addToCart({...product, id: product._id}))}>Add</button>
      <button onClick={() => dispatch(removeFromCart(product._id))} style={{marginLeft: '5px'}} disabled={quantity === 0}>Remove</button>
      {/* Shows quantity if its in cart */}
      {quantity > 0 && (
        <span style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: '#0074D9'}}>🛒x{quantity}</span>
      )}
    </div>
  )
}
//Export the component as default
export default ProductItem