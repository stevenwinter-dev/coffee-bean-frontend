import React, {useState, useEffect} from 'react'
import './CartItem.css'
import axios from 'axios'

const CartItem = ({ item, handleDeleteFromCart, grandTotalCalc }) => {
    const [coffee, setCoffee] = useState(null)
    const [itemNumber, setItemNumber] = useState(1)
    const [itemPrice, setItemPrice] = useState(item.price)
    console.log(item.coffee_id)
    console.log(item)
    //DB query by id for one coffee
    const fetchData = async () => {
        let response = await axios(`https://coffeebeanbackend.herokuapp.com/api/${item.coffee_id}`)
        setCoffee(response.data)
        
      }
    //Adding coffee price to grandTotal in Cart component
      useEffect(() => {
        coffee && grandTotalCalc(itemPrice)
      }, [coffee])
      //Fetches data and refreshes cart dom elements
      useEffect(() => {
        fetchData()
      }, [handleDeleteFromCart])

    //Handle plus coffee
    const handlePlus = () => {
        setItemNumber(itemNumber+1)
        grandTotalCalc()
    }

    useEffect(() => {
        setItemPrice(item.price * itemNumber)
    }, [itemNumber])

    //Handle minus coffee
    const handleMinus = () => {
        itemNumber > 1 ?
        setItemNumber(itemNumber-1) :
        setItemNumber(1)
        grandTotalCalc()
    }

    return (
        <div className='cart-item' onChange={grandTotalCalc}>
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
                        <i className="fas fa-plus" onClick={() => handlePlus()}></i>
                        <p>{itemNumber}</p>
                        <i className="fas fa-minus" onClick={() => handleMinus()}></i>
                    </div>
                </div>
                <div className='cart-item-detail'>
                    <p>$<span className='itemPrice'>{itemPrice}</span></p>
                </div>
            </div>}
        </div>
    )
}

export default CartItem
