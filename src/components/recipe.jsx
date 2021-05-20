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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const [{ showCart }] = useState(props);
  const [{ showRecipe }] = useState(props);
  const [{ showDelete }] = useState(props);

  const [show, setShow] = useState(true);

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

    axios.post('/recipe', obj)
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

    axios.post('/cart', obj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const populateCartButton = () => {
    if (showCart) {
      return (
        <div>
          <a
            id="fancy-button"
            style={{ width: '30vh' }}
            onClick={() => saveCart()}
          >
            Add to Cart
          </a>
        </div>
      );
    }
    return (<></>);
  };

  const populateRecipeButton = () => {
    if (showRecipe) {
      return (
        <div>
          <a
            id="fancy-button"
            style={{ width: '30vh' }}
            onClick={() => saveRecipe()}
          >
            Save Recipe
          </a>
        </div>
      );
    }
    return (<></>);
  };

  const populateButtons = () => {
    if (showCart || showRecipe) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
        >
          {populateCartButton()}
          {populateRecipeButton()}
        </div>
      );
    }
    return (<></>);
  };

  const deleteItem = () => {
    const obj = {
      sourceURL,
      username,
    };
    axios.post('/delete-card', obj)
      .then(() => {
        setShow(false);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const populateShowDelete = () => {
    if (showDelete) {
      return (
        <ListItemIcon
          onClick={() => deleteItem()}
          style={{ marginLeft: '85vh', marginTop: '2vh' }}
        >
          <DeleteIcon />
        </ListItemIcon>
      );
    }
    return (<></>);
  };

  const populate = () => {
    if (show) {
      return (
        <div style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        >
          <Card
            style={{
              background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%) fixed',
              borderRadius: '10px',
              boxShadow: '0px 5px 20px rgb(71, 71, 71)',
              margin: '20px',
              width: '90vh',
            }}
            border="0"
          >
            {populateShowDelete()}
            <Card.Title>
              <div style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              >
                <div
                  style={{
                    fontSize: '40px',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  { title }
                </div>
                <div style={{ fontSize: '16px', marginTop: '.5vh' }}>
                  <div>
                    { `Yields: ${quantity} servings\t` }
                    { Math.round(calories) }
                    { ' ' }
                    calories
                  </div>
                </div>
              </div>
            </Card.Title>
            <Card.Body>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <div style={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
                >
                  <Image
                    style={{
                      width: '30vh',
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
                  <div>
                    <a
                      id="fancy-button"
                      href={sourceURL}
                      style={{ width: '30vh', marginTop: '2vh' }}
                    >
                      {source}
                    </a>
                  </div>
                </div>
              </div>
              {populateButtons()}
            </Card.Body>
          </Card>
          <hr style={{ border: '1px solid black' }} />
        </div>
      );
    }
    return (<></>);
  };

  return (
    <>
      {populate()}
    </>
  );
};

export default Recipe;
