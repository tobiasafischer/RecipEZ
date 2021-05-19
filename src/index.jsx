/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import RecipePage from './components/recipe-page';
import MyRecipes from './components/my-recipes';
import Cart from './components/cart';
import reportWebVitals from './reportWebVitals';

const Index = () => {
  const [username, setUsername] = useState('tobiasaf');
  const [search, setSearch] = useState('');

  return (
    <React.StrictMode>
      <Router>
        <App setSearch={setSearch} />
        <Switch>
          <Route exact path="/">
            <RecipePage key={search} username={username} search={search} />
          </Route>
          <Route exact path="/recipes">
            <MyRecipes username={username} />
          </Route>
          <Route exact path="/cart">
            <Cart username={username} />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
