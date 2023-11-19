import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import RecipeForm from './RecipeForm';

export default function RecipeList() {
    const [apiRecipes, setApiRecipes] = useState([]);
    const [userRecipes, setUserRecipes] = useState([]);

    useEffect(() => {
        const fetchApiRecipes = async () => {
            try {
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
                setApiRecipes(response.data.meals);
            } catch (error) {
                console.error('Error fetching API data:', error);
            }
        };

        fetchApiRecipes();
    }, []);

    const addRecipeToList = (newRecipe) => {
        setUserRecipes([...userRecipes, newRecipe]);
    };

    const unifyRecipeStructure = (recipe) => {
        return {
            id: recipe.idMeal || recipe.id, // Use a consistent property name for ID
            title: recipe.strMeal || recipe.title, // Use a consistent property name for Title
            category: recipe.strCategory || recipe.category, // Use a consistent property name for Category
            area: recipe.strArea || recipe.area, // Use a consistent property name for Area
            thumbnail: recipe.strMealThumb || recipe.image, // Use a consistent property name for Thumbnail
        };
    };

    const allRecipes = [
        ...apiRecipes.map(unifyRecipeStructure),
        ...userRecipes.map(unifyRecipeStructure),
    ];

    return (
        <div>
            <h2>Recipes</h2>
            {allRecipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    category={recipe.category}
                    area={recipe.area}
                    thumbnail={recipe.thumbnail}
                />
            ))}
            <RecipeForm addRecipeToList={addRecipeToList} />
        </div>
    );
};