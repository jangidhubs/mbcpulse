
import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(pb.authStore.model);
  const [isLoading, setIsLoading] = useState(true);
  const [adminExists, setAdminExists] = useState(true); // Default to true for safety

  useEffect(() => {
    setCurrentAdmin(pb.authStore.model);
    
    // Check if admin exists on load
    const verifyAdminExists = async () => {
      try {
        // Note: This requires the users collection listRule to allow public reading of roles,
        // or we catch the 403 and assume it exists to prevent unauthorized setup access.
        const result = await pb.collection('users').getList(1, 1, { 
          filter: 'role="admin"',
          $autoCancel: false 
        });
        setAdminExists(result.totalItems > 0);
      } catch (error) {
        console.error("Error checking admin existence:", error);
        // If we get a 403, it means the collection is secured, which implies setup is likely done.
        setAdminExists(true); 
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdminExists();

    const unsubscribe = pb.authStore.onChange((token, model) => {
      setCurrentAdmin(model);
      if (token) {
        localStorage.setItem('pb_admin_token', token);
      } else {
        localStorage.removeItem('pb_admin_token');
      }
    });

    // Sync initial token if exists
    if (pb.authStore.token) {
      localStorage.setItem('pb_admin_token', pb.authStore.token);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      localStorage.setItem('pb_admin_token', authData.token);
      return authData;
    } catch (error) {
      throw error;
    }
  };

  const logoutAdmin = () => {
    pb.authStore.clear();
    localStorage.removeItem('pb_admin_token');
  };

  const value = {
    currentAdmin,
    loginAdmin,
    logoutAdmin,
    isAdminAuthenticated: pb.authStore.isValid && pb.authStore.model?.role === 'admin',
    adminExists,
    isLoading
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};
