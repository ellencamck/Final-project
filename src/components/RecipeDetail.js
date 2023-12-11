import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetailPage.css';

const API_URL = 'http://localhost:3001/recipes';

export default function RecipeDetail({ allRecipes, setAllRecipes }) {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({ comments: [] });
    const [commentFormData, setCommentFormData] = useState({ content: '' });

    useEffect(() => {
        const selectedRecipe = allRecipes.find((recipe) => recipe.id === Number(id));

        if (selectedRecipe) {
            setRecipe(selectedRecipe);
        }
    }, [id, allRecipes]);

    const handleAddComment = async () => {
        try {
            const response = await fetch(`${API_URL}/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: commentFormData.content }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            // Update the local state with the new comment
            setRecipe((prevRecipe) => {
                const updatedComments = [...prevRecipe.comments, { id: Date.now(), content: commentFormData.content }];
                return { ...prevRecipe, comments: updatedComments };
            });
        } catch (error) {
            console.error('Error adding comment:', error);
        }

        // Clear the comment form data after adding
        setCommentFormData({ content: '' });
    };

    return (
        <div className="recipe-detail-container">
            <div className="recipe-detail">
                {recipe ? (
                    <>
                        <img src={`/images/${id}.jpg`} alt={recipe.title} className="recipe-image-detail" />
                        <h2 className="recipe-title-detail">{recipe.title}</h2>
                        <div className="recipe-ingredients">
                            <h3>Ingredients:</h3>
                            <ul>
                                {recipe && recipe.ingredients && typeof recipe.ingredients === 'string' &&
                                    recipe.ingredients.split(',').map((ingredient, index) => (
                                        <li key={index}>{ingredient.trim()}</li>
                                    ))}
                            </ul>
                        </div>
                        <div className="recipe-instructions">
                            <h3>Instructions:</h3>
                            <p>{recipe.instructions}</p>
                        </div>

                        {/* Example: A form to add a comment */}
                        <form onSubmit={(e) => { e.preventDefault(); handleAddComment(); }}>
                            <input
                                type="text"
                                value={commentFormData.content}
                                onChange={(e) => setCommentFormData({ content: e.target.value })}
                            />
                            <button type="submit" className='comment-button'>Add Comment</button>
                        </form>

                        {/* Display existing comments */}
                        {Array.isArray(recipe.comments) && recipe.comments.map((comment) => (
                            <div className="comment-container" key={comment.id}>
                                <div className="comment">
                                <p>{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}