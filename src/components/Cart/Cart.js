import React from 'react'
import CartItem from '../CartItem/CartItem'
import './Cart.css'
import { useState } from 'react'
import cartData from '../../cartData'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useAuth } from "../../context/AuthContext"

const Cart = () => {
    const [cart, setCart] = useState(cartData)
   
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
    const { currentUser } = useAuth()
    const totalPrice = cart.reduce((a, b) => {
        return a + b.price}, 0)

    const handleFormSubmit = async e => {
        e.preventDefault()
    }
    const order = {
        email: currentUser.email,
        name: cart.map(item => item.name),
        totalPrice: totalPrice,
        ids: cart.map(item => item.id)
    }


    const makePayment = token => {
        const body = {
            token, 
            cart,
            order
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
                    <form action="/api/create-checkout-session" onSubmit={handleFormSubmit}  className='shipping-form' >
                        <StripeCheckout stripeKey='pk_test_lOdDQfzqfyxcLovxwkLgniBU' token={makePayment} name='pay' amount={totalPrice * 100} shippingAddress billingAddress >
                            <div className="checkout-btn-container">
                                <input className='checkout-btn' type="submit" value='Buy Now' />
                            </div>
                        </StripeCheckout>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Cart
