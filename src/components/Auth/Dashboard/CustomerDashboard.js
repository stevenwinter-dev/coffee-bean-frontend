import React from 'react'
import './CustomerDashboard.css'
import { useState, useEffect } from 'react'
import cartData from '../../../cartData'
import {Card} from 'react-bootstrap'
import { useAuth } from "../../../context/AuthContext"
import axios from 'axios'

const CustomerDashboard = () => {
    //Cart contents
    const [cart, setCart] = useState(cartData)
    const { currentUser } = useAuth()
    //Fetch cart
    const fetchCart = async () => {
        let response = await axios(`/api/cart/${currentUser.email}`)
        console.log(response.data)
        setCart(response.data)
      }

      useEffect(() => {
        fetchCart()
      }, [])
    console.log(cart)
    return (
        <div className='order-history'>
            {cart.map(item => (
                <Card className='order-history-container'>
                    <div className='cart-item' key={item.name}>
                        <div className="cart-item-content">
                            <div className='cart-item-detail'>
                                <img src={item.img} alt="" />
                            </div>
                            <div className='cart-item-detail'>
                                <p>{item.name} </p>
                            </div>
                            <div className='cart-item-detail'>
                                <p>1</p>
                            </div>
                            <div className='cart-item-detail'>
                                <p>${item.price}</p>
                            </div>
                            {/* <div className='cart-item-detail'>
                                <p>${item.date}</p>
                            </div> */}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default CustomerDashboard
