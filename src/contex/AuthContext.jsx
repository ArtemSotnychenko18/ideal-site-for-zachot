import React, { createContext, useContext, useEffect, useState } from 'react';
import Papa from 'papaparse';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [usersDb, setUsersDb] = useState([]); 

  useEffect(() => {
    // Твоє посилання на таблицю з користувачами
    const usersSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTeYu9NQuMIAw0zLlZ_PM5cYGzD6iOLWwjl-MkGMTmaVgtFFIYWRNWWxchzzCP3bOtPyqVBExc_eNjj/pub?output=csv';

    Papa.parse(usersSheetUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("База користувачів завантажена:", results.data);
        setUsersDb(results.data);
      },
      error: (err) => console.error("Помилка БД:", err)
    });

    const savedUser = localStorage.getItem('shop-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Шукаємо користувача в таблиці
      // trim() прибирає зайві пробіли, toLowerCase() робить букви маленькими для перевірки
      const foundUser = usersDb.find(u => 
        u.email && u.email.trim().toLowerCase() === email.trim().toLowerCase() && 
        u.password && u.password.trim() === password.trim()
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('shop-user', JSON.stringify(foundUser)); 
        resolve(foundUser);
      } else {
        reject(new Error("Невірний email або пароль (або Google Таблиця ще не оновилася)"));
      }
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shop-user');
  };

  const signup = () => {
    return Promise.reject(new Error("Реєстрація можлива лише через адміністратора."));
  };

  const value = {
    user,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};