import './App.css';
import Coffees from './components/Coffees/Coffees';
import Hero from './components/Hero/Hero';
import Nav from './components/Nav/Nav';
import { useState, useEffect } from 'react'
import coffeesData from './coffeesData';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import CoffeeDetails from './components/CoffeeDetails/CoffeeDetails';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import axios from 'axios'

function App() {

  const [coffees, setCoffees] = useState(coffeesData)
  
  useEffect(() => {
    (async () => {
        const result = await axios(`/api/index`)  
      setCoffees(result.data)
    })()
  }, [])

  return (
    <Router className="App">
      <Nav />
      <Route path='/' exact component={Hero} />
      <Route path='/' exact render={props => <Coffees coffees={coffees} /> }/>
      <Route path='/coffee/:id' render={props => <CoffeeDetails match={props.match} />} />
      <Route path='/cart' exact component={Cart} />
      <Footer />
    </Router>
  );
}

export default App;
