import React from 'react'
import CartItem from '../CartItem/CartItem'
import './Cart.css'
import { useState, useEffect } from 'react'
import cartData from '../../cartData'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useAuth } from "../../context/AuthContext"
import { Link, Redirect } from 'react-router-dom'

const Cart = () => {
    const [cart, setCart] = useState(cartData)
    const [cart1, setCart1] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [paid, setPaid] = useState(false)
    
    const { currentUser } = useAuth()

    //Fetchs ShoppingCart with user email
    const fetchData = async () => {
        let response = await axios(`/api/cart/${currentUser.email}`)
        // console.log(response.data[0].coffee_id)
        if (response.data.length > 0) {
            setCart1(response.data[0].coffee_id)
        } else {
            setCart1(null)
        }
      }
    
    useEffect(() => {
        fetchData()
        setIsLoading(false)
    }, [])

    //Passed down to CartItem component
    const handleDeleteFromCart = (id) => {
        //filter out id, return array cart1
        const newCart = cart1.filter(cart1 => cart1 !== id._id)
        //Delete id from ShoppingCart DB, pass in email and new array
        axios.delete(`/api/cart/${id._id}`, {
            data: {
                email: currentUser.email,
                arr: newCart
            }
        })
        //Set Cart to new array
        .then(setCart1(newCart))
    }
    
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
            axios.delete(`/api/cartDelete/${currentUser.email}`)
            setPaid(true)
        })
        .catch(err => console.log(err))
    }

    return (
        <main>
        {paid && <Redirect to='/' />}
            <div className="cart">
                <h2>Shopping Cart</h2>
                {cart1 && cart1.map(item => <CartItem item={item} key={item.id} handleDeleteFromCart={handleDeleteFromCart} />)}
                <div className="shipping-container">
                   {cart1 && cart1.length ? <form action="/api/create-checkout-session" onSubmit={handleFormSubmit}  className='shipping-form' >
                        <StripeCheckout stripeKey='pk_test_lOdDQfzqfyxcLovxwkLgniBU' token={makePayment} name='pay' amount={totalPrice * 100} shippingAddress billingAddress >
                            <div className="checkout-btn-container">
                                <input className='checkout-btn' type="submit" value='Buy Now' />
                            </div>
                        </StripeCheckout>
                    </form> : <Link to='/'>Check out our coffees!</Link>}
                </div>
            </div>
        </main>
    )
}

export default Cart
