import React from 'react'
import Coffee from '../Coffee/Coffee'
import './Coffees.css'
import { Link } from 'react-router-dom'

const Coffees = ({ coffees }) => {
    console.log(coffees[0][0])
    return (
        <main className='coffees'>
            {coffees && coffees[0][0].map(coffee => <Link to={`/coffee/${coffee.id}`}><Coffee coffee={coffee} /></Link>)}
        </main>
    )
}

export default Coffees
