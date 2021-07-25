import React from 'react'
import CartItem from '../CartItem/CartItem'
import './Cart.css'
import { useState } from 'react'
import cartData from '../../cartData'

const Cart = () => {
    const [cart, setCart] = useState(cartData)
    return (
        <main>
            <div className="cart">
                <h2>Shopping Cart</h2>
                {cart.map(item => <CartItem item={item} key={item.id} />)}
                <form className="checkout-btn-container" action="/api/create-checkout-session" method="POST">
                    <button className="checkout-btn" type="submit">Checkout</button>
                </form>
            </div>
        </main>
    )
}

export default Cart
