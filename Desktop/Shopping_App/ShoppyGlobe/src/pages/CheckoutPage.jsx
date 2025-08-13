// Import necessary modules for this component
import React from 'react'
import { useSelector, useDispatch } from 'react-redux' //Hook to access state from Redux store
import {useNavigate} from 'react-router-dom'
// Checkout Page component - displays cart summary and the total amount
import { clearCart } from '../Utils/cartSlice'
function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
 //Access the cart items from the Redux store 
  const items = useSelector((state) => state.cart.items)
//   Calculate the total price of all items in the cart
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  // Move to home on order confirmation
  function ConfirmOrder() {
    alert('Order placed successfully!!😃')
    alert('Thank you for shopping with us!!!!')
    dispatch(clearCart())
    navigate('/home')
  }
  // Move to the home page upon order cancellation
  function CancelOrder() {
    let response = confirm('Are you sure you want to cancel your order')
    if(response) {
      dispatch(clearCart())
      navigate('/home')
    }
  }    
  // Shows the total number of items, flash the amount of each, and adding them to a total value, with two buttons
  // for order placing and order cancellation
  return (
    <div className='CheckOut'>
        <h2>Checkout</h2>
        {items.map((item) =>(
            <div key={item.id}>
                <span>{item.title} - ₹{item.price} x {item.quantity}</span>
            </div>
        ))}
        <h3>Total: ₹{total.toFixed(2)}</h3>
        <button onClick={ConfirmOrder}>Place Order</button>
        <button onClick={CancelOrder} style={{marginLeft: '5px'}}>Cancle Order</button>
    </div>
  )
}
// Export the component by default export type
export default CheckoutPage
