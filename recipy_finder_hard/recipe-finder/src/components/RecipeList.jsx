import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes }) => (
  <div className="recipe-list">
    {recipes.map(recipe => (
      <div key={recipe.idMeal} className="recipe-card">
        <Link to={`/recipe/${recipe.idMeal}`}>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3>{recipe.strMeal}</h3>
        </Link>
      </div>
    ))}
  </div>
);

export default RecipeList;
