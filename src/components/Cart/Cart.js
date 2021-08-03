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
    const [grandTotal, setGrandTotal] = useState(0)
    const [cartId, setCartId] = useState(null)
    const { currentUser } = useAuth()
    
    //Fetchs ShoppingCart with user email
    const fetchData = async () => {
        let response = await axios(`/api/cart/${currentUser.email}`)
        setCartId(response.data[0]._id)
        console.log(response.data[0].coffee)
        if (response.data.length > 0) {
            setCart1(response.data[0].coffee)
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
        console.log(cartId)
        console.log(id._id)
        //Delete coffee obj from ShoppingCart DB, pass in email and coffee to remove
        axios.delete(`/api/cart/${id._id}`, {
            data: {
                email: currentUser.email,
                remove: id._id
            }
        })
        //Refetch Data
        .then(fetchData())
    }

    

    //Working on grand total
    const grandTotalCalc = (price) => {
        console.log(`PRICE ${price}`)
        // setGrandTotal(grandTotal + parseInt(coffee))
        // console.log(`GRAND TOTAL IS ${grandTotal}`)
    }

    //Not updating from live data because we are not passing in a price.
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
        {/* {paid && <Redirect to='/thanks' totalPrice={totalPrice} />} */}
        {paid && <Redirect to={{pathname: '/thanks', totalPrice:{totalPrice}}} />}
            <div className="cart">
                <h2>Shopping Cart</h2>
                {cart1 && cart1.map(item => <CartItem item={item} key={item.id} handleDeleteFromCart={handleDeleteFromCart} grandTotalCalc={grandTotalCalc}  />)}
                <div className="shipping-container">
                   {cart1 && cart1.length ? <form action="/api/create-checkout-session" onSubmit={handleFormSubmit}  className='shipping-form' >
                        <StripeCheckout stripeKey='pk_test_lOdDQfzqfyxcLovxwkLgniBU' token={makePayment} name='pay' amount={totalPrice * 100} shippingAddress billingAddress >
                            <div className="checkout-btn-container">
                                <input className='checkout-btn' type="submit" value='Buy Now' />
                            </div>
                        </StripeCheckout>
                    </form> : <div className='cart-back-container'><p>You haven't added any coffees yet</p><Link to='/'><p>Check out our coffees!</p></Link></div>}
                </div>
            </div>
        </main>
    )
}

export default Cart
