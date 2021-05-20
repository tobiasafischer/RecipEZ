/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recipe from './recipe';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const username = 'tobiasaf';

  useEffect(() => {
    axios.get('/recipe', { params: { username: 'tobiasaf' } })
      .then((data) => {
        console.log(data);
        setRecipes(data.data);
      });
  }, []);

  return (
    <div className="Tiles">
      <div
        id="tile-list"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {recipes.map((recipe) => (
          <Recipe
            key={JSON.stringify(recipe)}
            username={username}
            recipe={recipe}
            title={recipe.title}
            calories={recipe.calories}
            healthValues={recipe.healthValues}
            image={recipe.image}
            ingredients={recipe.ingredients}
            source={recipe.source}
            sourceURL={recipe.sourceURL}
            quantity={recipe.quantity}
            showCart
            showDelete
          />
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
