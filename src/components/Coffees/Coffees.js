import React, { useState,useEffect } from 'react'
import Coffee from '../Coffee/Coffee'
import './Coffees.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

//test
const Coffees = () => {
    const [coffees, setCoffees] = useState('')
    const fetchData = async () => {
        let response = await axios(`https://coffee-bean3.herokuapp.com/api/index`)
        console.log(response.data)
        setCoffees(response.data)
      }
    
      useEffect(() => {
        fetchData()
      }, [])
    return (
        <main className='coffees'>
            {coffees && coffees.map(coffee => <Link to={`/coffee/${coffee._id}`} key={coffee._id}><Coffee coffee={coffee} /></Link>)}
        </main>
    )
}

export default Coffees
