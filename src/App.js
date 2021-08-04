import './App.css';
import React from 'react'
import Coffees from './components/Coffees/Coffees';
import Hero from './components/Hero/Hero';
import Nav from './components/Nav/Nav';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CoffeeDetails from './components/CoffeeDetails/CoffeeDetails';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import AddCoffee from './components/AddCoffee/AddCoffee';
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/Auth/UpdateProfile";
import Dashboard from './components/Auth/Dashboard/Dashboard';
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./components/Auth/PrivateRoute"
import Thanks from './components/Thanks/Thanks';

function App() {

  return (
      <Router className="App">
        <AuthProvider>
        <Nav />
        <Route path='/' exact component={Hero} />
        <Route path='/' exact render={props => <Coffees /> }/>
        <Route path='/coffee/:id' render={props => <CoffeeDetails match={props.match} />} />
        <Route path='/cart' exact component={Cart} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path='/thanks' render={props => <Thanks props={props} />} />
        <Footer />
        </AuthProvider>
      </Router>
  );
}

export default App;
