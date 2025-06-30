import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setRecipe(data.meals[0]);
    };
    fetchDetails();
  }, [id]);

  if (!recipe) return <p>Loading full recipe...</p>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{recipe.strMeal}</h2>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ maxWidth: '90%', borderRadius: '10px', margin: '1rem 0' }}
      />
      <h3>Instructions:</h3>
      <p style={{ maxWidth: '800px', margin: 'auto', lineHeight: '1.6', textAlign: 'justify' }}>
        {recipe.strInstructions}
      </p>

      <button
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1.5rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
        onClick={() => {
            navigate('/results');
        }}
      >
         Go backe to Results
      </button>
    </div>
  );
};

export default RecipeDetail;
