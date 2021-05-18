/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import {
  Card,
  Image,
  // Collapse,
} from 'react-bootstrap';
import './styles/recipe.css';

const Recipe = (props) => {
  const [{ title }] = useState(props);
  const [{ calories }] = useState(props);
  const [{ healthValues }] = useState(props);
  const [{ healthLabels }] = useState(props);
  const [{ image }] = useState(props);
  const [{ ingredients }] = useState(props);
  const [{ source }] = useState(props);
  const [{ sourceURL }] = useState(props);
  const [{ quantity }] = useState(props);

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
  console.log(
    healthLabels,
    source,
    sourceURL,
  );

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

  return (
    <div>
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
            <div>
              <a href={sourceURL}>
                {source}
              </a>
            </div>
            <div style={{ align: 'center' }}>
              <div style={{ display: 'inline-block' }}>
                { `Yields: ${quantity} servings` }
              </div>
              <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                { Math.round(calories) }
                { ' ' }
                calories
              </div>
            </div>
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
        </Card.Body>
      </Card>
      <hr style={{ border: '1px solid black' }} />
    </div>
  );
};

export default Recipe;
