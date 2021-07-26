import React from 'react'
import CartItem from '../CartItem/CartItem'
import './Cart.css'
import { useState } from 'react'
import cartData from '../../cartData'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

const Cart = () => {
    const [cart, setCart] = useState(cartData)
    const [checkingOut, setCheckingOut] = useState(false)
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
    const stripe = useStripe()
    const elements = useElements();
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

        const cardElement = elements.getElement("card");
        
        try {
        const { data: clientSecret } = await axios.post('http://localhost:3001/api/create-checkout-session', {
            amount : totalPrice,
            billing_details: BillingDetails
        })

        const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: BillingDetails
      });
      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

    //   onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
}

    const handleCheckout = () => {
        const form = document.querySelector('.shipping-container')
        form.style.display = 'block'
        setCheckingOut(true)
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
                        <div className="card-container">
                            <CardElement />
                        </div>
                        <input type="submit" value='submit' />
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
