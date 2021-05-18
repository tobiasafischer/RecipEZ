import './App.css';
import React, { useEffect, useState } from 'react';
import config from './config';
import Recipe from './components/recipe';

const { API_ID, API_KEY } = config;

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('tiramisu');

  const getRecipes = async () => {
    const resp = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${API_ID}&app_key=${API_KEY}`,
    );

    const data = await resp.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="App">
      <form className="search-form">
        <input type="text" onChange={(e) => handleSearch(e)} />
        <button type="submit">Search</button>
      </form>
      <div className="d-inline-flex mt-5">
        {recipes.map((recipe) => (
          <Recipe
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            healthValues={recipe.recipe.totalNutrients}
            healthLabels={recipe.recipe.healthLabels}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredientLines}
            source={recipe.recipe.source}
            sourceURL={recipe.recipe.url}
            quantity={recipe.recipe.yield}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
