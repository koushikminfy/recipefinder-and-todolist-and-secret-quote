import React, { useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import RecipeList from '../components/RecipeList.jsx';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    if (!query) return;
    setLoading(true);
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();
    setRecipes(data.meals || []);
    setLoading(false);
  };

  return (
    <>
      <SearchBar query={query} setQuery={setQuery} onSearch={searchRecipes} />
      {loading ? <p>Loading...</p> :
        recipes.length > 0 ? <RecipeList recipes={recipes} /> :
        query && <p>No results found.</p>}
    </>
  );
};

export default HomePage;
