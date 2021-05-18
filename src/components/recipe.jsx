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
  const [{ recipe }] = useState(props);
  const [{ title }] = useState(props);
  const [{ calories }] = useState(props);
  const [{ healthValues }] = useState(props);
  const [{ image }] = useState(props);
  const [{ ingredients }] = useState(props);
  const [{ source }] = useState(props);
  const [{ sourceURL }] = useState(props);
  const [{ quantity }] = useState(props);
  const url = 'http://localhost:3001';
  const nutritionFacts = [
    'CA',
    'CHOCDF',
    'CHOLE',
    'FASAT',
    'FAT',
    'NA',
    'PROCNT',
    'SUGAR',
    'SUGAR.added',
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
    console.log(`${url}/save-recipe`);
    axios.post(`${url}/save-recipe`, recipe)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ justifyContent: 'center' }}>
      <Card
        style={{ color: '#525252' }}
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
          <div style={{ display: 'flex' }}>
            <div>
              <a id="review-button">Add to Cart</a>
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
        </Card.Body>
      </Card>
      <hr style={{ border: '1px solid black' }} />
    </div>
  );
};

export default Recipe;
