import './App.css';
import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import config from './config';
import Recipe from './components/recipe';

const { API_ID, API_KEY } = config;

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('tiramisu');
  const [username] = useState('tobiasaf');

  const getRecipes = async () => {
    const resp = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${API_ID}&app_key=${API_KEY}`,
    );

    const data = await resp.json();
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
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">RecipEZ</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#action2">Recipes</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => handleSearch(e)}
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Navbar.Brand href="#cart">
              <img
                src="https://i.pinimg.com/originals/2d/96/4a/2d964a6bf37d9224d0615dc85fccdd62.jpg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                style={{ marginLeft: '20px' }}
              />
            </Navbar.Brand>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div
        id="tile-list"
        style={{
          marginLeft: '25%',
          width: '50%',
        }}
      >
        {recipes.map((recipe) => (
          <Recipe
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
          />
        ))}
      </div>
    </div>
  );
};

export default App;
