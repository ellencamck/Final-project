import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import recipesData from '../db.json'; // Import the data
import "./RecipeList.css"

export default function RecipeList() {
    const [userRecipes, setUserRecipes] = useState([]);

    useEffect(() => {
        console.log('User recipes have been updated:', userRecipes);
        console.log('All recipes for rendering:', allRecipes);
    }, [userRecipes]);

    const addRecipeToList = (newRecipe) => {
        console.log("addRecipeToList, newRecipe: ", newRecipe);
        setUserRecipes([...userRecipes, newRecipe]);
        console.log("User recipes after update: ", userRecipes);
    };

    const allRecipes = [
        ...userRecipes.map((recipe) => ({ ...recipe, source: 'user' })), // Add a source property to distinguish user recipes
        ...recipesData.recipes, // Include recipes from db.json
    ];

    return (
        <div className="center-container">
            <div>
            <h2>Recipes</h2>
            </div>
            {allRecipes.length === 0 ? (
                <p>Loading recipes...</p>
            ) : (
                allRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        category={recipe.category}
                        servings={recipe.servings}
                        thumbnail={recipe.thumbnail}
                        source={recipe.source} // Pass the source to the RecipeCard component
                    />
                ))
            )}
        </div>
    );
}