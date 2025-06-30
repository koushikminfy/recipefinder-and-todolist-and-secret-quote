import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

const Home = ({ query, setQuery, fetchRecipes }) => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    await fetchRecipes();
    navigate('/results');
  };

  return (
    <div className="App">
      <h1>🍴 Recipe Finder</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
    </div>
  );
};

const ResultsPage = ({ recipes, isLoading, error }) => (
  <div className="App">
    <h2>🔍 Search Results</h2>
    {isLoading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    <RecipeList recipes={recipes} />
  </div>
);

const App = () => {
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home query={query} setQuery={setQuery} fetchRecipes={fetchRecipes} />}
        />
        <Route
          path="/results"
          element={<ResultsPage recipes={recipes} isLoading={isLoading} error={error} />}
        />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
