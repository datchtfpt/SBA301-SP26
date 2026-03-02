// API service layer cho việc giao tiếp với Spring REST API
const API_BASE_URL = 'http://localhost:8080'; // Thay đổi theo URL backend của bạn

// Helper function để handle API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    const readBody = async () => {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          return await response.clone().json();
        } catch {
          return await response.text();
        }
      }

      return response.text();
    };
    
    if (!response.ok) {
      const errorBody = await readBody().catch(() => null);
      const message = typeof errorBody === 'string'
        ? errorBody
        : (errorBody?.message || `HTTP error! status: ${response.status}`);
      throw new Error(message);
    }

    return await readBody();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  // Login
  login: async (credentials) => {
    return await apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Register
  register: async (userData) => {
    return await apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Get current user info (nếu có endpoint)
  getCurrentUser: async () => {
    return await apiCall('/api/auth/me');
  }
};

// Staff API (ROLE_STAFF)
export const staffAPI = {
  getAllCustomers: async () => apiCall('/api/staff/customers'),
  createCustomer: async (payload) => apiCall('/api/staff/customers', { method: 'POST', body: JSON.stringify(payload) }),
  updateCustomer: async (id, payload) => apiCall(`/api/staff/customers/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCustomer: async (id) => apiCall(`/api/staff/customers/${id}`, { method: 'DELETE' }),
  updateCustomerStatus: async (id, status) => apiCall(`/api/staff/customers/${id}/status?status=${encodeURIComponent(status)}`, { method: 'PUT' }),

  getRoomTypes: async () => apiCall('/api/room-types'),
  createRoomType: async (payload) => apiCall('/api/room-types', { method: 'POST', body: JSON.stringify(payload) }),

  getAllRooms: async () => apiCall('/api/staff/rooms'),
  createRoom: async (payload) => apiCall('/api/staff/rooms', { method: 'POST', body: JSON.stringify(payload) }),
  updateRoom: async (id, payload) => apiCall(`/api/staff/rooms/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteRoom: async (id) => apiCall(`/api/staff/rooms/${id}`, { method: 'DELETE' }),
  updateRoomStatus: async (id, status) => apiCall(`/api/staff/rooms/${id}/status?status=${encodeURIComponent(status)}`, { method: 'PUT' }),

  getAllBookings: async () => apiCall('/api/staff/bookings'),
  updateBookingStatus: async (id, status) => apiCall(`/api/staff/bookings/${id}/status?status=${encodeURIComponent(status)}`, { method: 'PUT' }),
};

// Customer API (ROLE_CUSTOMER)
export const customerAPI = {
  getProfile: async () => apiCall('/api/customers/profile'),
  updateProfile: async (payload) => apiCall('/api/customers/profile', { method: 'PUT', body: JSON.stringify(payload) }),

  getRoomsPublic: async () => apiCall('/api/customers/rooms'),
  getAvailableRoomsPublic: async () => apiCall('/api/customers/rooms/available'),

  getRoomTypesPublic: async () => apiCall('/api/room-types'),

  getBookings: async () => apiCall('/api/customers/bookings'),
  cancelBooking: async (id) => apiCall(`/api/customers/bookings/${id}`, { method: 'DELETE' }),
  createBooking: async (payload) => apiCall('/api/customers/bookings', { method: 'POST', body: JSON.stringify(payload) }),
};

// Utility function để handle errors
export const handleApiError = (error) => {
  if (error.message) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Có lỗi xảy ra. Vui lòng thử lại.';
};

export default {
  authAPI,
  staffAPI,
  customerAPI,
  handleApiError
};
