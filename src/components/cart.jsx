/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShoppingList from './list/shopping-list';

const Cart = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [list, setList] = useState([]);
  const [{ username }] = useState(props);

  useEffect(() => {
    axios.get('/cart', { params: { username } })
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
      image: recipe.image,
      recipe,
    })));
  }, [recipes]);
  return (
    <div style={{
      borderRadius: '10px',
      boxShadow: '0px 5px 20px rgb(71, 71, 71)',
      margin: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundImage: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
      alignItems: 'center',
    }}
    >
      <ShoppingList key={list} username={username} parentListItems={list} />
    </div>
  );
};

export default Cart;
