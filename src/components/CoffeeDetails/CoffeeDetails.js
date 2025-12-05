import React from 'react'
import { useState, useEffect } from 'react'
import './CoffeeDetails.css'
import axios from 'axios'
import { useAuth } from "../../context/AuthContext"
import {  Redirect } from 'react-router'

const CoffeeDetails = ({ match }) => {
    const { currentUser } = useAuth()
    //Coffee that is displayed
    const [coffee, setCoffee] = useState({})
    //Weight selected by customer
    const [selectedWeight, setSelectedWeight] = useState('8oz')
    //Price based on weight
    const [price, setPrice] = useState(coffee.price)
    //Cart items, add to cart
    const [cart, setCart] = useState('')
    //Has the api request completed?
    const [isLoading, setIsLoading] = useState(true)
    //ID of coffee pased from previous component, Coffees
    const id = match.params.id
    //Redirect after added to cart 
    const [added, setAdded] = useState(false)
    //Redirect if not logged in 
    const [login, setLogin] = useState(false)

    //Select weight
    const handleWeightClick = (e) => {
        setSelectedWeight(e)
    }

   //Add item to cart
    const handleAddToCart = () => {
        currentUser !== null ? 
        axios.post(`https://coffee-bean-backend-production.up.railway.app/api/cart/${id}`, {
            email: currentUser.email,
            coffee: id,
            price: price,
            weight: selectedWeight
        })
        // .then(alert('added to cart'))
        .then(setAdded(true))
        :
        setLogin(true)
    }

    //Change CSS for selected weight.
    useEffect(() => {
            if(selectedWeight === '8oz') {
                setPrice(10)
            } else if (selectedWeight === '12oz') {
                setPrice(15)
            } else {
                setPrice(20)
            }
    }, [selectedWeight])

    //Change isLoading state
    const loading = () => {
        setIsLoading(false)
    }

    //Fetch coffee info. Scroll to top of 
    const fetchData = async () => {
        let response = await axios(`https://coffee-bean-backend-production.up.railway.app/api/${id}`)
        setCoffee(response.data)
        console.log(response.data)
        loading()
        window.scrollTo(0, 0)
      }

    useEffect(() => {
    fetchData()
    }, [])

    return (
        <div>
        {added && <Redirect to={{pathname: '/', success: true}} />}
        {login && <Redirect to='/login' />}
        { !isLoading ? 
        <main className='coffee-details'>
            <img src={coffee.img} alt={coffee.name} />
            <div className="coffee-details-content">
                <h2>{coffee.name}</h2>
                <p>${price}</p>
                <p>{coffee.flavor}</p>
                <div>{coffee.weight.map(weight => <span className='weight' key={weight} id={weight === selectedWeight ? 'selected-weight' : undefined} onClick={() => handleWeightClick(weight)}>{weight}</span>)}</div>
                <p>Roast: {coffee.roast}</p>
                <p>Region: {coffee.region}</p>
                <button onClick={() => handleAddToCart(coffee)}>Add to Cart ${price}</button>
            </div>
        </main> 
        : 
        <p>loading</p>}
        </div>
    )
}

export default CoffeeDetails
