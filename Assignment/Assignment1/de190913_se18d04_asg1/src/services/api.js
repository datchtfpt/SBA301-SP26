const API_BASE_URL = 'http://localhost:8080/api';

// Get current user role from localStorage or context
const getCurrentUserRole = () => {
  // Try to get from localStorage first
  const userRole = localStorage.getItem('userRole');
  if (userRole) {
    return parseInt(userRole);
  }
  
  // Default to Staff role (2) for demo purposes
  // In real app, this should come from authentication context
  return 2;
};

// Generic API helper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Role': getCurrentUserRole().toString(),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 403) {
        throw new Error('Access denied. You do not have permission to perform this action.');
      }
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    
    // Handle empty responses
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Category API
export const categoryAPI = {
  getAll: () => apiRequest('/categories'),
  getById: (id) => apiRequest(`/categories/${id}`),
  create: (data) => apiRequest('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/categories/${id}`, {
    method: 'DELETE',
  }),
};

// Account API
export const accountAPI = {
  getAll: () => apiRequest('/accounts'),
  getById: (id) => apiRequest(`/accounts/${id}`),
  create: (data) => apiRequest('/accounts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/accounts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/accounts/${id}`, {
    method: 'DELETE',
  }),
};

// News Article API
export const newsAPI = {
  getAll: () => apiRequest('/news-articles'),
  getById: (id) => apiRequest(`/news-articles/${id}`),
  create: (data) => apiRequest('/news-articles', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/news-articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/news-articles/${id}`, {
    method: 'DELETE',
  }),
};

// Tag API
export const tagAPI = {
  getAll: () => apiRequest('/tags'),
  getById: (id) => apiRequest(`/tags/${id}`),
  create: (data) => apiRequest('/tags', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/tags/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/tags/${id}`, {
    method: 'DELETE',
  }),
};

// Helper function to set user role (for testing/demo)
export const setUserRole = (role) => {
  localStorage.setItem('userRole', role.toString());
};

export default apiRequest;
