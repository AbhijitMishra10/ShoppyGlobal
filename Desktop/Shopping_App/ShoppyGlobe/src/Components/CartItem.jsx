// Import necessary modules for this component
import React from 'react'
import { useDispatch } from 'react-redux' //Hook to dispatch actions to Redux store
import { removeFromCart } from '../Utils/cartSlice' //Import action to remove item from the cart
// CartItem component - displays a single cart item
function CartItem({item}) {
  // initializing the useDispatch hook in a variable named dispatch
  const dispatch = useDispatch()
  const itemPrice = (item.price *  item.quantity).toFixed(2) //calulating the items price
  // Rendering the items title, the price of each item and how many of them are present in the cart
  // and total value of the cart
  return (
    <div>
      {/* Shows the title of the item */}
      <h4><u>{item.name}</u></h4> 
      {/* Shows the price and the number of additions of the item */}
      <p style={{fontSize: 'large', color: 'black'}}>₹{item.price} x {item.quantity} <span style={{display: 'flex', flexDirection: 'row-reverse', fontSize: 'large'}}>Item Total</span><span style={{display: 'flex', flexDirection: 'row-reverse'}}>₹{itemPrice}</span></p>
      {/* Removes items from the list one by one, on clicking of the button */}
      <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </div>
  )
}
// exporting the component using default export type
export default CartItem