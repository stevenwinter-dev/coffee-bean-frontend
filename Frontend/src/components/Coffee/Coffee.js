import React from 'react'
import './Coffee.css'

const Coffee = ({coffee}) => {
    console.log(coffee)
    return (
            <div className='coffee'>
                <div className="coffee-content">
                    {/* IMG src will be link to multer img */}
                    <img src='/images/coffeebag1.jpeg' alt={coffee.name} />
                    <h3>{coffee.name}</h3>
                    <p>{coffee.roast}</p>
                    <p>{coffee.flavor}</p>
                    <p>{coffee.region}</p>
                    <p>From ${coffee.price[0]}</p>
                </div>
            </div>
    )
}

export default Coffee
