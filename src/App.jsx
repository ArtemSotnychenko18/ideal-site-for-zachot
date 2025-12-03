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

function App() {
  // Початковий стан - пустий масив (товарів ще немає, поки вони вантажаться)
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Твоє посилання на таблицю
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGc0WYcACSofyGpPIhTSINcf7Ntynp7lU30uNvAUumSSgGiXbK8PFQzlaMQwjLAWti06rkjRGP8aje/pub?output=csv';

    Papa.parse(googleSheetUrl, {
      download: true,
      header: true, // Це каже, що перший рядок - це назви (id, name, price...)
      skipEmptyLines: true, // Пропускати пусті рядки, якщо ти випадково натиснув Enter в таблиці
      complete: (results) => {
        // Коли завантаження завершено - записуємо дані
        console.log("Завантажені товари:", results.data); // Для перевірки в консолі
        setProducts(results.data);
        setIsLoading(false);
      },
      error: (error) => {
        console.error("Помилка завантаження:", error);
        setIsLoading(false);
      }
    });
  }, []); // [] означає, що це спрацює 1 раз при запуску сайту

  // Поки вантажиться - показуємо напис (можна потім зробити гарний спінер)
  if (isLoading) {
    return (
      <Flex h="100vh" justify="center" align="center">
        <Text fontSize="2xl" fontWeight="bold">ЗАВАНТАЖЕННЯ ДАНИХ...</Text>
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
        </Routes>
      </Box>

      <Footer />
    </Flex>
  );
}

export default App;