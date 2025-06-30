import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to load recipe.');
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '300px', borderRadius: '10px' }} />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Instructions:</strong> {recipe.strInstructions}</p>
      <h3>Ingredients:</h3>
      <ul>
        {getIngredients().map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Link to="/" style={{ textDecoration: 'none', color: '#ff7f50' }}>⬅ Back to Search</Link>
    </div>
  );
};

export default RecipeDetail;
