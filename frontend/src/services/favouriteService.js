import api from './api';

export const favouriteService = {
  // Get user favourites
  getUserFavourites: async () => {
    try {
      const response = await api.get('/favourites');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch favourites');
    }
  },

  // Add property to favourites
  addToFavourites: async (propertyId) => {
    try {
      const response = await api.post('/favourites', { propertyId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add to favourites');
    }
  },

  // Remove property from favourites
  removeFromFavourites: async (propertyId) => {
    try {
      const response = await api.delete(`/favourites/${propertyId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove from favourites');
    }
  },

  // Check if property is in favourites
  isFavourite: async (propertyId) => {
    try {
      const response = await api.get(`/favourites/check/${propertyId}`);
      return response.data.isFavourite;
    } catch (error) {
      return false;
    }
  },
};