import './App.css';
import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const App = () => {
  const [search, setSearch] = useState('tiramisu');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/recipes">
                <Nav.Link>My Recipes</Nav.Link>
              </LinkContainer>
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
            <LinkContainer to="/cart">
              <Navbar.Brand>
                <img
                  src="https://i.pinimg.com/originals/2d/96/4a/2d964a6bf37d9224d0615dc85fccdd62.jpg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                  style={{ marginLeft: '20px' }}
                />
              </Navbar.Brand>
            </LinkContainer>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default App;
