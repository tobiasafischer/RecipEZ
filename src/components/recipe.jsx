/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import {
  Card,
  Image,
  // Collapse,
} from 'react-bootstrap';
import axios from 'axios';

import './styles/recipe.css';

const Recipe = (props) => {
  const [{ title }] = useState(props);
  const [{ calories }] = useState(props);
  const [{ healthValues }] = useState(props);
  const [{ image }] = useState(props);
  const [{ ingredients }] = useState(props);
  const [{ source }] = useState(props);
  const [{ sourceURL }] = useState(props);
  const [{ quantity }] = useState(props);
  const [{ username }] = useState(props);
  const [{ showButtons }] = useState(props);
  let url = 'https://localhoast:3000/';

  if (process.env.NODE_ENV === 'production') {
    url = 'https://tobias-fischer-recipez.herokuapp.com';
  }
  if (healthValues['SUGAR.added']) healthValues.SUGARADDED = healthValues['SUGAR.added'];

  const nutritionFacts = [
    'CA',
    'CHOCDF',
    'CHOLE',
    'FASAT',
    'FAT',
    'NA',
    'PROCNT',
    'SUGAR',
    'SUGARADDED',
  ];

  const populateNutrition = () => {
    const arr = [];
    for (const [k, v] of Object.entries(healthValues)) {
      if (nutritionFacts.includes(k)) {
        arr.push(
          <li key={k}>
            {`${v.label}: ${Math.round(v.quantity)} ${v.unit}`}
          </li>,
        );
      }
    }
    return arr;
  };

  const saveRecipe = () => {
    const json = {
      title,
      calories,
      healthValues,
      image,
      ingredients,
      source,
      sourceURL,
      quantity,
    };
    const obj = {
      json,
      username,
    };

    axios.post(`${url}/recipe`, obj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveCart = () => {
    const json = {
      title,
      calories,
      healthValues,
      image,
      ingredients,
      source,
      sourceURL,
      quantity,
    };
    const obj = {
      json,
      username,
    };

    axios.post(`${url}/cart`, obj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const populateButtons = () => {
    if (showButtons) {
      return (
        <div style={{ display: 'flex' }}>
          <div>
            <a
              id="review-button"
              onClick={() => saveCart()}
            >
              Add to Cart
            </a>
          </div>
          <div>
            <a
              id="review-button"
              onClick={() => saveRecipe()}
            >
              Save Recipe
            </a>
          </div>
        </div>
      );
    }
    return (<></>);
  };

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
      minWidth: '40%',
      width: '75%',
    }}
    >
      <Card
        style={{ backgroundImage: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)' }}
        border="0"
      >
        <Card.Title>
          <div
            style={{ fontSize: '50px' }}
          >
            { title }
          </div>
        </Card.Title>
        <Card.Body>
          <div className="d-inline-flex">
            <div className="ml-3">
              <Image
                style={{
                  maxWidth: '200px',
                  borderRadius: '50%',
                }}
                src={image}
                onError={(e) => {
                  e.currentTarget.style = {};
                  e.currentTarget.src = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
                }}
                alt="food_img"
                rounded
                thumbnail="true"
              />
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '25%' }}>
                <div>
                  <a href={sourceURL}>
                    {source}
                  </a>
                </div>
                <div style={{ display: 'inline-block', fontSize: '16px' }}>
                  <div style={{ marginLeft: '10px' }}>
                    { `Yields: ${quantity} servings` }
                  </div>
                  <div>
                    { Math.round(calories) }
                    { ' ' }
                    calories
                  </div>
                </div>
              </div>
            </div>
            <div style={{ align: 'center' }}>
              <div
                className="ml-2"
                id="ingredient-list"
                style={{
                  display: 'inline-block',
                  border: '1px solid',
                  width: '300px',
                  height: '250px',
                  overflowY: 'scroll',
                }}
              >
                <ul style={{ textAlign: 'left' }}>
                  {ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div
                className="ml-2"
                id="nutrition"
                style={{
                  display: 'inline-block',
                  border: '1px solid',
                  width: '300px',
                  height: '250px',
                  overflowY: 'scroll',
                }}
              >
                <ul style={{ textAlign: 'left' }}>
                  {populateNutrition()}
                </ul>
              </div>
            </div>
          </div>
          {populateButtons()}
        </Card.Body>
      </Card>
      <hr style={{ border: '1px solid black' }} />
    </div>
  );
};

export default Recipe;
