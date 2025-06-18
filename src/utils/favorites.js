// Simple localStorage-based favorites system
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem('exerciseFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = (exerciseId) => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(exerciseId)) {
      favorites.push(exerciseId);
      localStorage.setItem('exerciseFavorites', JSON.stringify(favorites));
    }
    return favorites;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return getFavorites();
  }
};

export const removeFromFavorites = (exerciseId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(id => id !== exerciseId);
    localStorage.setItem('exerciseFavorites', JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return getFavorites();
  }
};

export const isFavorite = (exerciseId) => {
  const favorites = getFavorites();
  return favorites.includes(exerciseId);
};
