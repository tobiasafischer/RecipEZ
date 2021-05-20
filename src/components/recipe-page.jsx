import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Recipe from './recipe';

// import config from '../config';
// const { API_ID, API_KEY } = config;
const { API_ID } = process.env.API_ID;
const { API_KEY } = process.env.API_KEY;

const RecipePage = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [{ search }] = useState(props);
  const [{ username }] = useState(props);
  const [showPage, setShowPage] = useState(true);

  const getRecipes = async () => {
    const resp = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${API_ID}&app_key=${API_KEY}`,
    );

    const data = await resp.json();
    setRecipes(data.hits);
  };

  const populatePage = () => {
    if (showPage) {
      return (
        <div>
          <Image
            style={{
              maxWidth: '400px',
              borderRadius: '50%',
            }}
            src="../assets/recipez.png"
            alt="logo"
            rounded
          />
        </div>
      );
    }
    return (<></>);
  };

  useEffect(() => {
    getRecipes();
    if (search.length === 0) {
      setShowPage(true);
    } else {
      setShowPage(false);
    }
  }, [search]);

  return (
    <div className="Tiles">
      {populatePage()}
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
