import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <h1> Recipe Finder</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
