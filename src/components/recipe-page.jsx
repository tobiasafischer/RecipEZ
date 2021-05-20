import React, { useEffect, useState } from 'react';
import {
  Image,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import logo from '../assets/recipez.png';
import Recipe from './recipe';

// import config from '../config';

// let { API_ID, API_KEY } = config;
let API_KEY;
let API_ID;

const RecipePage = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [{ search }] = useState(props);
  const [{ username }] = useState(props);
  const [{ setSearch }] = useState(props);
  const [currentSearch, setCurrentSearch] = useState('');
  const [showPage, setShowPage] = useState(true);

  if (process.env.NODE_ENV === 'production') {
    API_ID = process.env.API_ID;
    API_KEY = process.env.API_KEY;
  }

  const handleSearch = (e) => {
    setCurrentSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(currentSearch);
    setCurrentSearch('');
  };

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
        <div style={{
          alignItems: 'center',
          marginTop: '20vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        >
          <div>
            <Image
              style={{
                maxWidth: '400px',
                borderRadius: '50%',
              }}
              src={logo}
              alt="logo"
              rounded
            />
          </div>
          <div style={{ marginTop: '2%' }}>
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="Search"
                value={currentSearch}
                onChange={(e) => handleSearch(e)}
                className="mr-2"
                aria-label="Search"
              />
              <Button type="submit" variant="outline-success">Search</Button>
            </Form>
          </div>
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
    <div>
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
            showCart
            showRecipe
          />
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
