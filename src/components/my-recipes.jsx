/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Image,
  // Collapse,
} from 'react-bootstrap';

const url = 'http://localhost:3001';

const MyRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
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

  const populateNutrition = (healthValues) => {
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
  const populate = (json) => (
    <div style={{
      borderRadius: '10px',
      boxShadow: '0px 5px 20px rgb(71, 71, 71)',
      margin: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      background: 'white',
      alignItems: 'center',
      minWidth: '40%',
      width: '45%',
    }}
    >
      <Card
        style={{ color: '#525252' }}
        border="0"
      >
        <Card.Title>
          <div
            style={{ fontSize: '50px' }}
          >
            { json.title }
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
                src={json.image}
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
                  <a href={json.sourceURL}>
                    {json.source}
                  </a>
                </div>
                <div style={{ display: 'inline-block', fontSize: '16px' }}>
                  <div style={{ marginLeft: '10px' }}>
                    { `Yields: ${json.quantity} servings` }
                  </div>
                  <div>
                    { Math.round(json.calories) }
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
                  {json.ingredients.map((ingredient) => (
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
                  {json.healthValues.map((nutrition) => (
                    <li key={nutrition}>{nutrition}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <hr style={{ border: '1px solid black' }} />
    </div>
  );

  useEffect(() => {
    const arr = [];
    axios.get(`${url}/recipe`, { params: { username: 'tobiasaf' } })
      .then((data) => {
        data.data.forEach((recipe) => {
          const json = {
            title: recipe.title,
            image: recipe.image,
            source: recipe.source,
            sourceURL: recipe.sourceURL,
            quantity: recipe.quantity,
            calories: recipe.calories,
            ingredients: recipe.ingredients,
            healthValues: populateNutrition(recipe.healthValues),
          };
          arr.push(populate(json));
        });
        setAllRecipes(arr);
      });
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    }}
    >
      {allRecipes}
    </div>
  );
};

export default MyRecipes;
