import React, { useEffect, useState } from 'react';
import config from '../config';
import Recipe from './recipe';

const { API_ID, API_KEY } = config;

const RecipePage = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [{ search }] = useState(props);
  const [{ username }] = useState(props);

  const getRecipes = async () => {
    const resp = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${API_ID}&app_key=${API_KEY}`,
    );

    const data = await resp.json();
    setRecipes(data.hits);
  };

  useEffect(() => {
    getRecipes();
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
            recipe={recipe.recipe}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            healthValues={recipe.recipe.totalNutrients}
            healthLabels={recipe.recipe.healthLabels}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredientLines}
            source={recipe.recipe.source}
            sourceURL={recipe.recipe.url}
            quantity={recipe.recipe.yield}
            showButtons
          />
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
