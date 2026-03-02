// Context cho quản lý authentication trong ứng dụng
import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8080';

// Tạo context
const AuthContext = createContext();

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const readResponseBody = async (response) => {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  };

  // Kiểm tra token khi component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorBody = await readResponseBody(response);
        const message = typeof errorBody === 'string' ? errorBody : (errorBody?.message || 'Login failed');
        throw new Error(message);
      }

      const data = await readResponseBody(response);
      const token = (data && typeof data === 'object') ? (data.token || data.jwt) : null;
      if (!token) {
        throw new Error('Login failed');
      }
      
      // Lưu token và thông tin user
      localStorage.setItem('token', token);
      
      // Giả sử chúng ta cần lấy thông tin user (có thể thêm endpoint /api/user/me)
      const userData = {
        email: email,
        role: email.includes('admin') || email.includes('staff') ? 'STAFF' : 'CUSTOMER'
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorBody = await readResponseBody(response);
        const message = typeof errorBody === 'string' ? errorBody : (errorBody?.message || 'Registration failed');
        throw new Error(message);
      }

      await readResponseBody(response);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Kiểm tra user có phải staff không
  const isStaff = () => {
    return user && user.role === 'STAFF';
  };

  // Kiểm tra user có phải customer không
  const isCustomer = () => {
    return user && user.role === 'CUSTOMER';
  };

  // Giá trị của context
  const value = {
    user,
    login,
    register,
    logout,
    isStaff,
    isCustomer,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
