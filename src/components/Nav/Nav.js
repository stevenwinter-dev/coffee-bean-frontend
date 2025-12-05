import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import { Twirl as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'



const Nav = () => {
    const [isOpen, setOpen] = useState(false)

    const handleBurger = () => {
        const nav = document.querySelector('nav')
       nav.classList.toggle('active')
    }

    const closeMobile = () => {
        setOpen(false)
        document.querySelector('nav').classList.remove('active')
    }

    const scrollToCoffees = () => {
        if(window.location.pathname === '/') {
            const coffees = document.querySelector('#coffees-display')
            coffees.scrollIntoView()
        } else {
            window.location.replace('https://coffee-bean-frontend-production.up.railway.app/')
        }
        closeMobile()
    }

    const { currentUser } = useAuth()

    return (
        
        <nav>
            <Link to='/'>
                <h1 onClick={closeMobile}>COFFEE BEAN</h1>
            </Link>
            <ul>
              
                {currentUser ?<Link to='/dashboard'><li>Profile</li></Link>:<Link to='/login'><li>Login</li></Link>}
                <li onClick={scrollToCoffees} className='li-hover'>Coffees</li>
                {currentUser && <Link to='/cart'><li><i className="fas fa-shopping-cart"></i></li></Link>}
             </ul>
            {isOpen ? <div className='hamburger-menu hamburger-container'>
                <ul>
                    {currentUser ? <Link to='/dashboard'><li onClick={closeMobile}>Profile</li></Link> : <Link to='/login'><li onClick={closeMobile}>Login</li></Link>}
                    
                    <li onClick={scrollToCoffees}>Coffees</li>
                    {currentUser && <Link to='/cart'><li onClick={closeMobile}><i className="fas fa-shopping-cart"></i></li></Link>}
                </ul>
            </div> : null}
            <div onClick={handleBurger} className='hamburger-container'>
                <Hamburger toggled={isOpen} toggle={setOpen} duration={0.2} />
            </div>
        </nav>
    )
}

export default Nav