import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard({ id, title, category, servings, source }) {
  const thumbnailPath = `/images/${id}.jpg`;

  return (
    <div className="recipe-card">
      <img className="recipe-thumbnail" src={thumbnailPath} alt={title} />
      <div className="recipe-info">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-category">Category: {category}</p>
        <p className="recipe-servings">Servings: {servings}</p>
        {source && (
          <p className="recipe-source">{`Source: ${source === 'user' ? 'User' : 'Predefined'}`}</p>
        )}
        {!source && (
          <Link to={`/recipes/${id}`} className="view-details-link">
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};