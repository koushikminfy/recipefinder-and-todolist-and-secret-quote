import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { favorites, dispatch } = useContext(FavoritesContext);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then(res => res.json())
      .then(data => setRecipe(data.meals[0]));
  }, [recipeId]);

  if (!recipe) return <p>Loading...</p>;

  const isFavorite = favorites.some(r => r.idMeal === recipe.idMeal);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: recipe.idMeal });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: recipe });
    }
  };

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing) ingredients.push(`${measure} ${ing}`);
  }

  return (
    <div>
      <h2>{recipe.strMeal}</h2>
      <button onClick={toggleFavorite}>
        {isFavorite ? ' Remove from Favorites' : ' Add to Favorites'}
      </button>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Instructions:</strong> {recipe.strInstructions}</p>
      <ul>
        {ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
      </ul>
      <Link to="/">← Back</Link>
    </div>
  );
};

export default RecipeDetail;
