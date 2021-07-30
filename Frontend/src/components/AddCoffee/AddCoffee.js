import React from 'react'
import './AddCoffee.css'

const AddCoffee = () => {
    return (
        <div className='add-coffee-form'>
            <form action="/api/create-new-coffee"  className='add-coffee-form' >
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name='name'/>
                <label htmlFor="flavor">Flavor</label>
                <input id="flavor" type="text" name='flavor'/>
                <label htmlFor="roast">Roast</label>
                <input id="roast" type="text" name='roast'/>
                <label htmlFor="region">Region</label>
                <input id="region" type="text" name='region'/>
                <label htmlFor="price">Price</label>
                <input id="price" type="price" name='price'/>
                <label htmlFor="weight">Weight</label>
                <input id="weight" type="weight" name='weight'/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default AddCoffee
