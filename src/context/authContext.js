"use client"

import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const base_url = "https://billing-management-server.vercel.app/api";

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.request({
        method: 'POST',
        url: `${base_url}/auth/login`,
        data: {email,password}
    })

    if (response.status == 200) {
      const userData = response.data.user
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
      router.push('/dashboard')
    } else {
      console.error('Login failed:', response.statusText);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    router.push('/')
  };

  const value = {
    isLoggedIn, 
    login, 
    logout 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
