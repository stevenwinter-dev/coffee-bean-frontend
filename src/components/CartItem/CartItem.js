import React, {useState, useEffect} from 'react'
import './CartItem.css'
import axios from 'axios'

const CartItem = ({ item, handleDeleteFromCart }) => {
    const [coffee, setCoffee] = useState(null)
    
    //DB query by id for one coffee
    const fetchData = async () => {
        let response = await axios(`/api/${item}`)
        setCoffee(response.data)
      }
    
      //Fetches data and refreshes cart dom elements
      useEffect(() => {
        fetchData()
      }, [handleDeleteFromCart])

    return (
        <div className='cart-item'>
            {coffee && <div className="cart-item-content">
                <div className='cart-item-detail'>
                    <i className="fas fa-times" onClick={() => handleDeleteFromCart(coffee)}></i>
                </div>
                <div className='cart-item-detail'>
                    <img src={coffee.img} alt="" />
                </div>
                <div className='cart-item-detail'>
                    <p>{coffee.name} </p>
                </div>
                <div className='cart-item-detail'>
                    <p>{coffee.region}</p>
                </div>
                <div className='cart-item-detail'>
                    <div className="add">
                        <i className="fas fa-plus"></i>
                        <p>1</p>
                        <i className="fas fa-minus"></i>
                    </div>
                </div>
                <div className='cart-item-detail'>
                    <p>${coffee.price[0]}</p>
                </div>
            </div>}
        </div>
    )
}

export default CartItem
