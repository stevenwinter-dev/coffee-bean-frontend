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
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
<<<<<<< HEAD
import Coffee from './components/Coffee/Coffee';
import axios from 'axios';
import AddCoffee from './components/AddCoffee/AddCoffee';
=======
import { AuthProvider } from './context/AuthContext';
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/Auth/UpdateProfile";
import Dashboard from './components/Auth/Dashboard';
import PrivateRoute from "./components/Auth/PrivateRoute"

>>>>>>> 30747b3 (auth setup & css)

const stripePromise = loadStripe(`${process.env.PUBLISHABLE_KEY}`)

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
    <Elements stripe={stripePromise}>
      <Router className="App">
        <AuthProvider>
        <Nav />
        <Route path='/' exact component={Hero} />
        <Route path='/' exact render={props => <Coffees coffees={coffees} /> }/>
        <Route path='/coffee/:id' render={props => <CoffeeDetails match={props.match} />} />
        <Route path='/cart' exact component={Cart} />
<<<<<<< HEAD
        <Route path='/dashboard/new' exact component={AddCoffee} />
=======
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
>>>>>>> 30747b3 (auth setup & css)
        <Footer />
        </AuthProvider>
      </Router>
    </Elements>
  );
}

export default App;
