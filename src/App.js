import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import './App.css';
import recipesData from './db.json';


export default function App() {
  const [recipes, setRecipes] = useState(recipesData.recipes);

  const addRecipeToList = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <Router>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">FlavorFellowship</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
              <Nav.Link as={Link} to="/add-recipe">Share Recipe</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeList allRecipes={recipes} />} />
        <Route
          path="/recipes/:id"
          element={<RecipeDetail allRecipes={recipes} />}
        />
        <Route
          path="/add-recipe"
          element={<RecipeForm addRecipeToList={addRecipeToList} allRecipes={recipes} />}
        />
      </Routes>
    </Router>
  );
};
