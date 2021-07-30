import React from 'react'
import CartItem from '../CartItem/CartItem'
import './Cart.css'
import { useState } from 'react'
import cartData from '../../cartData'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const Cart = () => {
    const [cart, setCart] = useState(cartData)
    const [checkingOut, setCheckingOut] = useState(false)
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const totalPrice = cart.reduce((a, b) => {
        return a + b.price}, 0)

    const handleFormSubmit = async e => {
        e.preventDefault()
        
        const BillingDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            address: {
                address: e.target.address.value,
                city: e.target.city.value,
                state: e.target.state.value,
                postal_code: e.target.zip.value
            }
        }

        
}

    const handleCheckout = () => {
        const form = document.querySelector('.shipping-container')
        form.style.display = 'block'
        setCheckingOut(true)
    }

    const makePayment = token => {
        const body = {
            token, 
            cart
        }
        const headers = {
            "Content-Type": "application/json"
        }
        //UPDATE TO AXIOS
        return fetch('/api/payment', {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(res => {
            console.log(`RESPONSE ${res}`)
            const {status} = res
            console.log(`STATUS ${status}`)
        })
        .catch(err => console.log(err))
    }

    return (
        <main>
            <div className="cart">
                <h2>Shopping Cart</h2>
                {cart.map(item => <CartItem item={item} key={item.id} />)}
                <div className="shipping-container">
                {/* INSERT ON FORM BELOW -onSubmit={handleFormSubmit}  */}
                    <form action="/api/create-checkout-session" onSubmit={handleFormSubmit}  className='shipping-form' >
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name='name'/>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name='email'/>
                        <label htmlFor="address">Address</label>
                        <input id="address" type="text" name='address'/>
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" name='city'/>
                        <label htmlFor="state">State</label>
                        <input id="state" type="text" name='state'/>
                        <label htmlFor="zip">Zip</label>
                        <input id="zip" type="number" name='zip'/>
                        
                        {/* <input type="submit" value='submit' /> */}
                        <StripeCheckout stripeKey='pk_test_lOdDQfzqfyxcLovxwkLgniBU' token={makePayment} name='pay' amount={totalPrice * 100}>
                            <div className="checkout-btn-container">
                                {/* <button className='checkout-btn'>Buy Now</button> */}
                                <input className='checkout-btn' type="submit" value='Buy Now' />
                            </div>
                        </StripeCheckout>
                    </form>
                    
                </div>
                {!checkingOut && <div className="checkout-btn-container">
                    <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                </div>}
            </div>
        </main>
    )
}

export default Cart
