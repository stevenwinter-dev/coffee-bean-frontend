import './App.css';
import React from 'react'
import Coffees from './components/Coffees/Coffees';
import Hero from './components/Hero/Hero';
import Nav from './components/Nav/Nav';
import { useState, useEffect } from 'react'
import coffeesData from './coffeesData';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CoffeeDetails from './components/CoffeeDetails/CoffeeDetails';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Coffee from './components/Coffee/Coffee';
import axios from 'axios';
import AddCoffee from './components/AddCoffee/AddCoffee';

function App() {
  const [coffees, setCoffees] = useState([])


  // //////example to make http request to sever///////
  const fetchData = async () => {
    let response = await axios(`/api/index`)
    console.log(response.data)
    setCoffees(response.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
      <Router className="App">
        <Nav />
        <Route path='/' exact component={Hero} />
        <Route path='/' exact render={props => <Coffees coffees={coffees} /> }/>
        <Route path='/coffee/:id' render={props => <CoffeeDetails match={props.match} />} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/dashboard/new' exact component={AddCoffee} />
        <Footer />
      </Router>
  );
}

export default App;
