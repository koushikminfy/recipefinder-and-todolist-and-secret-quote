import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  if (!favorites.length) return <h2>No favorites added yet.</h2>;

  return (
    <div>
      <h2> Favorites</h2>
      <div className="recipe-list">
        {favorites.map(recipe => (
          <div key={recipe.idMeal} className="recipe-card">
            <Link to={`/recipe/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
