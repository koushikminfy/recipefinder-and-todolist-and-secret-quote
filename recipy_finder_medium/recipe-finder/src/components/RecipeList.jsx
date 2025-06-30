import { Link } from 'react-router-dom';

const RecipeList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe.idMeal}>
          <Link to={`/recipe/${recipe.idMeal}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
