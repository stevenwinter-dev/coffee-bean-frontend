import './App.css';
import React from 'react'
import Coffees from './components/Coffees/Coffees';
import Hero from './components/Hero/Hero';
import Nav from './components/Nav/Nav';
import { useState, useEffect } from 'react'
import coffeesData from './coffeesData';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import CoffeeDetails from './components/CoffeeDetails/CoffeeDetails';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Coffee from './components/Coffee/Coffee';
import axios from 'axios';

const stripePromise = loadStripe(`${process.env.PUBLISHABLE_KEY}`)

function App() {
  const [coffees, setCoffees] = useState([])


  // //////example to make http request to sever///////
  const fetchData = async () => {
    let response = await axios(`/api/index`)
    console.log(response.data)
    setCoffees([[response.data]])
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    // <p>{!data ? "Loading..." : data}</p> // test code to render from server 
    <Elements stripe={stripePromise}>
      <Router className="App">
        <Nav />
        <Route path='/' exact component={Hero} />
        <Route path='/' exact render={props => <Coffees coffees={coffees} /> }/>
        <Route path='/coffee/:id' render={props => <CoffeeDetails match={props.match} />} />
        <Route path='/cart' exact component={Cart} />
        <Footer />
      </Router>
    </Elements>
  );
}

export default App;
