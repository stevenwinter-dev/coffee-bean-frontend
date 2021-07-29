import React from 'react'
import './Coffee.css'

const Coffee = ({coffee}) => {
    return (
            <div className='coffee'>
                <div className="coffee-content">
                    {/* <img src={coffee.img} alt={coffee.name} /> */}
                    <h3>{coffee.name}</h3>
                    <p>${coffee.price}/lb</p>
                    <p>{coffee.desc}</p>
                    <p>{coffee.weight}</p>
                    {/* <p>{coffee.roast}</p>
                    <p>{coffee.region}</p> */}
                </div>
            </div>
    )
}

export default Coffee
