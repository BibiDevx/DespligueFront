// src/services/productService.js
import api from './api';

const getErrorMessage = (error) => {
  if (error.response?.data?.error) {
    if (typeof error.response.data.error === 'object') {
      return Object.values(error.response.data.error).flat().join(' ');
    }
    return error.response.data.error;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message || "Error desconocido.";
};

const productService = {
  getAllAvailableProducts: async () => {
    try {
      const response = await api.get('/verProductos');
      return response.data.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/verProductos/${id}`);
      return response.data.data ?? response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getHomeProducts: async () => {
    try {
      const response = await api.get('/verProductos/home');
      return response.data.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getProductsByBrand: async (brandId) => {
    try {
      const response = await api.get(`/verProductos/marcas/${brandId}`);
      return response.data.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // 🔐 ADMIN
  getAllProductsWithDetailsForAdmin: async () => {
    try {
      const response = await api.get('/productos/detalles');
      return response.data.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await api.post('/productos/registrar', productData);
      return response.data.data ?? response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await api.patch(`/productos/actualizar/${id}`, productData);
      return response.data.data ?? response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/productos/eliminar/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getProductCategories: async (productId) => {
    try {
      const response = await api.get(`/productos/${productId}/categorias`);
      return response.data.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  syncProductCategories: async (productId, categoryIds) => {
    try {
      const response = await api.post(
        `/productos/${productId}/categorias/sync`,
        { categorias: categoryIds }
      );
      return response.data.message;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getLowStockProducts: async () => {
    try {
      const response = await api.get('/productos/productos-bajo-stock');
      return response.data.data ?? response.data ?? [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default productService;
