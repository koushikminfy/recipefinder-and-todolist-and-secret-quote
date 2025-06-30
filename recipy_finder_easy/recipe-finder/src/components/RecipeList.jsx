import { useNavigate } from 'react-router-dom';
import './RecipeList.css'; // Optional CSS file

const RecipeList = ({ recipes }) => {
  const navigate = useNavigate();

  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div
          className="recipe-card"
          key={recipe.idMeal}
          onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
          style={{ cursor: 'pointer' }}
        >
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3>{recipe.strMeal}</h3>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
