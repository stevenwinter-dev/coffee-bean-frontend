import React, { useState,useEffect } from 'react'
import Coffee from '../Coffee/Coffee'
import './Coffees.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

//test
const Coffees = ({props}) => {
    const [coffees, setCoffees] = useState('')
    const fetchData = async () => {
        let response = await axios(`https://coffee-bean-backend-production.up.railway.app/api/index`)
        console.log(response.data)
        setCoffees(response.data)
      }
    
      if(props.location.success === true) {
        setTimeout(() => {
          document.querySelector('.cart-success').style.display='none'
        }, 3000);
      }



      
    
    useEffect(() => {
        fetchData()
      }, [])
    return (
        <main className='coffees' id="coffees-display">
          {props.location.success && <p className='cart-success'>Successfully added to cart</p>}
          {coffees && coffees.map(coffee => <Link to={`/coffee/${coffee._id}`} key={coffee._id}><Coffee coffee={coffee} /></Link>)}
        </main>
    )
}

export default Coffees
