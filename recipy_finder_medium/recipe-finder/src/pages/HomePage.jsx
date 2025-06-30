import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError('Failed to fetch recipes.');
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <h1>🍴 Recipe Finder</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={fetchRecipes} />
      {isLoading && <p>Searching for recipes...</p>}
      {error && <p>{error}</p>}
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default HomePage;
