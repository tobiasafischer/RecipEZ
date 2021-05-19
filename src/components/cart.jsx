/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShoppingList from './list/shopping-list';

const url = 'http://localhost:3001';

const Cart = () => {
  const [recipes, setRecipes] = useState([]);
  const [list, setList] = useState([]);
  const username = 'tobiasaf';
  useEffect(() => {
    axios.get(`${url}/cart`, { params: { username } })
      .then((data) => {
        setRecipes(data.data);
      })
      .catch((err) => {
        if (err) throw err;
      });
  }, []);

  useEffect(() => {
    setList(recipes.map((recipe) => ({
      category: recipe.title,
      items: recipe.ingredients,
    })));
  }, [recipes]);

  return (
    <div className="Tiles">
      <ShoppingList key={list} parentListItems={list} />
    </div>
  );
};

export default Cart;
