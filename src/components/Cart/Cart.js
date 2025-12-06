import React, { useState, useEffect } from 'react';
import CartItem from '../CartItem/CartItem';
import './Cart.css';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import { Link, Redirect } from 'react-router-dom';

const Cart = () => {
  const [cart1, setCart1] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartId, setCartId] = useState(null);
  const { currentUser } = useAuth();

  // Fetch ShoppingCart with user email
  const fetchData = async () => {
    if (!currentUser) return;
    try {
      let response = await axios(`https://coffee-bean-backend-production.up.railway.app/api/cart/${currentUser.email}`);
      setCartId(response.data[0]?._id || null);
      setCart1(response.data.length > 0 ? response.data[0].coffee : null);
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  // Delete item from cart
  const handleDeleteFromCart = (id) => {
    axios
      .delete(`https://coffee-bean-backend-production.up.railway.app/api/cart/${id._id}`, {
        data: {
          email: currentUser.email,
          remove: id._id,
        },
      })
      .then(() => fetchData())
      .catch((error) => console.error("Failed to delete item from cart:", error));
  };

  // Calculate grand total
  useEffect(() => {
    if (cart1) {
      const total = cart1.reduce((sum, item) => sum + item.price, 0);
      setGrandTotal(total);
    }
  }, [cart1]);

  const makePayment = async (token) => {
    const body = {
      token,
      cart: cart1,
      order: {
        email: currentUser.email,
        name: cart1.map((item) => item.name),
        totalPrice: grandTotal,
        ids: cart1.map((item) => item.id),
      },
    };
    try {
      await axios.post('/api/payment', body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await axios.delete(`https://coffee-bean-backend-production.up.railway.app/api/cartDelete/${currentUser.email}`);
      setPaid(true);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {paid && <Redirect to={{ pathname: '/thanks', totalPrice: { grandTotal } }} />}
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart1 && cart1.map((item) => (
          <CartItem
            item={item}
            key={item.id}
            handleDeleteFromCart={handleDeleteFromCart}
          />
        ))}
        <div className="shipping-container">
          {cart1 && cart1.length ? (
            <form className="shipping-form">
              <StripeCheckout
                stripeKey="pk_test_lOdDQfzqfyxcLovxwkLgniBU"
                token={makePayment}
                name="pay"
                amount={grandTotal * 100}
                shippingAddress
                billingAddress
              >
                <div className="checkout-btn-container">
                  <input className="checkout-btn" type="submit" value="Buy Now" />
                </div>
              </StripeCheckout>
            </form>
          ) : (
            <div className="cart-back-container">
              <p>You haven't added any coffees yet</p>
              <Link to="/"><p>Check out our coffees!</p></Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;