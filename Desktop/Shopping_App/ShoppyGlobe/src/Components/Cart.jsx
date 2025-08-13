// Importing necessary modules required for this component
import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem' //Imported the CartItem component to display individual cart items
function Cart() {
  //Use selector is used here to access the cart items from Redux store
  const items = useSelector((state) => state.cart.items)
  // If the cart is empty, this will show a message of 'Your cart is Empty'
  if(!items.length) return <h2>Your cart is empty 🛒</h2>
  // If the cart has items, it will render them using the CartItem component
  return (
    <div className='Cart'>
      <h3>Cart🛒</h3>
      {items.map((item) => (
        <CartItem key={item.id} item={item}/>
      ))}
    </div>
  )
}
// Exporting the Cart component by default export 
export default Cart