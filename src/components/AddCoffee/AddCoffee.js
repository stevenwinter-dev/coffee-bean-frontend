import React from 'react'
import './AddCoffee.css'
import axios from 'axios'

const AddCoffee = ({update}) => {
    const handleSubmit = (e) => {
        console.log(e.target)
        e.preventDefault()
        axios.post('https://coffee-bean3.herokuapp.com/api/create-new-coffee', {
            name: e.target.name.value,
            flavor: e.target.flavor.value,
            roast: e.target.roast.value,
            region: e.target.region.value,
            price: e.target.price.value,
            weight: e.target.weight.value,
            img: e.target.imgURL.value
        })
        update()
    }
    return (
        <div className='add-coffee-form-container'>
            <h2>Add New:</h2>
            <form action="" onSubmit={handleSubmit}  className='add-coffee-form' encType="multipart/form-data">
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
                <label name="imgURL">Image URL</label>
                <input id="imgURL" type="text" name='imgURL' />
                {/* <label name="img" id="img-upload">Upload an Image</label>
                <input id="img" name="img" type="file" /> */}
                <div className="create-btn-container">
                    <input className='create-btn' type="submit" value='Create' />
                </div>
            </form>
        </div>
    )
}

export default AddCoffee
