import React, { useEffect, useState } from 'react';
import {
  Image,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import logo from '../assets/recipez.png';
import Recipe from './recipe';

const RecipePage = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [{ search }] = useState(props);
  const [{ username }] = useState(props);
  const [{ setSearch }] = useState(props);
  const [currentSearch, setCurrentSearch] = useState('');
  const [showPage, setShowPage] = useState(true);
  const [tiles, setTiles] = useState([]);

  const handleSearch = (e) => {
    setCurrentSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(currentSearch);
    setCurrentSearch('');
  };

  const populate = () => (
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
  );

  useEffect(() => {
    setTiles(populate());
  }, [recipes]);

  const getRecipes = () => {
    axios.get('/all-recipes', { params: { search } })
      .then((data) => {
        setRecipes(data.data.hits);
      })
      .catch((err) => {
        if (err) throw err;
      });
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
    if (search.length === 0) {
      setShowPage(true);
    } else {
      getRecipes();
      setShowPage(false);
    }
  }, [search]);

  return (
    <div>
      {populatePage()}
      {tiles}
    </div>
  );
};

export default RecipePage;
