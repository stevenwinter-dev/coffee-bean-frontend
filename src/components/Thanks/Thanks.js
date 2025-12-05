import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Thanks.css'
import axios from 'axios'

const Thanks = ({props}) => {

    const [textSent, setTextSent] = useState(false)

    const total = props.location.totalPrice.totalPrice
    const handleSubmit = (e) => {
        const phoneInput = document.querySelector('#phone')
        e.preventDefault()
        axios.post('https://coffee-bean-backend-production.up.railway.app/thanks', {
                totalPrice: total,
                phoneNumber: phoneInput.value
        })
        setTextSent(true)
    }
    return (
        <div className='thanks-container'>
            <div className="thanks-container-content">
                <h2>Thanks for shopping!</h2>
                {!textSent ?<form action="" onSubmit={handleSubmit}  className='add-coffee-form'>
                    <label htmlFor="phone">Want to receive a text receipt?</label>
                    <input id="phone" type="tel" name='phone'/>
                    <div className="create-btn-container">
                        <input className='create-btn' type="submit" value='Text me' />
                    </div>
                </form> : <p>We've texted you a receipt</p>}
                <Link to='/'><p>Shop some more</p></Link>
            </div>
        </div>
    )
}

export default Thanks
