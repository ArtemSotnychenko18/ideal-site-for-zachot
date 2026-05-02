import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Завантажуємо кошик з пам'яті браузера (щоб не зникав після оновлення)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  // Додати товар
  const addToCart = (product, size, quantity) => {
    setCart((prevCart) => {
      // Перевіряємо, чи є вже такий товар з таким самим розміром
      const existingItem = prevCart.find(item => item.id === product.id && item.selectedSize === size);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, selectedSize: size, quantity }];
    });
  };

  // Видалити товар
  const removeFromCart = (id, size) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  // Очистити кошик (після замовлення)
  const clearCart = () => setCart([]);

  // Рахуємо загальну суму
  const totalPrice = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};