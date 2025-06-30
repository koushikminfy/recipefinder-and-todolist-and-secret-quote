import React, { createContext, useReducer, useEffect } from 'react';

export const FavoritesContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload];
    case 'REMOVE_FAVORITE':
      return state.filter(item => item.idMeal !== action.payload);
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('favorites')) || [];
  const [favorites, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
