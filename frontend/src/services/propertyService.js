import api from './api';

export const propertyService = {
  // Get all properties with optional filters
  getAllProperties: async (filters = {}) => {
    try {
      const response = await api.get('/properties', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch properties');
    }
  },

  // Get property by ID
  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch property');
    }
  },

  // Create new property
  createProperty: async (propertyData) => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create property');
    }
  },

  // Update property
  updateProperty: async (id, propertyData) => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update property');
    }
  },

  // Delete property
  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete property');
    }
  },

  // Search properties
  searchProperties: async (searchTerm) => {
    try {
      const response = await api.get('/properties/search', {
        params: { q: searchTerm }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search properties');
    }
  },

  // Get featured properties
  getFeaturedProperties: async () => {
    try {
      const response = await api.get('/properties/featured');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured properties');
    }
  },
};