import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/authProvider";
import { fetcher } from "../../helpers/fetcher";
import { toasts } from "../../helpers/toasts";

const FavoritesContext = React.createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      fetcher(`/favorites`).then((favorites) => {
        setFavorites(favorites);
      });
    }
  }, [user]);

  const deleteFromFavorites = async (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((pet) => pet._id !== id)
    );
    await fetcher(`/favorites/${id}`, "DELETE");
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const addToFavorites = async (pet) => {
    if (user) {
      try {
        if (favorites.find((favorite) => favorite._id === pet._id)) {
          toasts.error("Pet already in favorites");
          return;
        }
        await fetcher(`/favorites/${pet._id}`);
        setFavorites((prevFavorites) => [...prevFavorites, pet]);
      } catch (err) {
        toasts.error("Error adding to favorites" + err.message);
      }
    }
  };

  const value = {
    favorites,
    deleteFromFavorites,
    addToFavorites,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return React.useContext(FavoritesContext);
}
