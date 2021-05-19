/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'http://localhost:3001';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`${url}/cart`)
      .then((data) => {
        setCart(data);
      })
      .catch((err) => {
        if (err) throw err;
      });
  }, []);

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
