import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Papa from 'papaparse';
import { Flex, Box, Text } from '@chakra-ui/react';

// Імпортуємо компоненти
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import InfoPage from './pages/InfoPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import AuthPage from './pages/AuthPage'; // <--- 1. ДОДАЛИ ІМПОРТ

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Твоє посилання на товари
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGc0WYcACSofyGpPIhTSINcf7Ntynp7lU30uNvAUumSSgGiXbK8PFQzlaMQwjLAWti06rkjRGP8aje/pub?output=csv';

    Papa.parse(googleSheetUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setProducts(results.data);
        setIsLoading(false);
      },
      error: (error) => {
        console.error("Помилка:", error);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <Flex h="100vh" justify="center" align="center">
        <Text fontSize="2xl" fontWeight="bold">ЗАВАНТАЖЕННЯ...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" minH="100vh" bg="white" color="black">
      <Header />
      
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/shop" element={<ShopPage products={products} />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductPage products={products} />} />
          
          {/* 2. ДОДАЛИ МАРШРУТ ДЛЯ ВХОДУ */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Box>

      <Footer />
    </Flex>
  );
}

export default App;