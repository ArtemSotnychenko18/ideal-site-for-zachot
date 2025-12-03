import React, { useState } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Image, Input, FormControl, FormLabel, useToast, IconButton, Flex } from '@chakra-ui/react';
import { FaTrash, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// УВАГА: Тут має бути 'contex', як ти назвав папку
import { useCart } from '../contex/CartContext'; 

// Твої дані для Телеграму
const TG_BOT_TOKEN = '8576052941:AAFpx0JaCJVADfQzjqBeyrSrYdbbfWO1Py8'; 
const TG_CHAT_ID = '7509731990'; 

const CartPage = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const toast = useToast();
  
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', post: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOrderToTelegram = async () => {
    if (!formData.name || !formData.phone) {
      toast({ title: "Заповніть ім'я та телефон!", status: "warning", position: "top" });
      return;
    }

    setIsSubmitting(true);

    let message = `🔥 <b>НОВЕ ЗАМОВЛЕННЯ!</b>\n\n`;
    message += `👤 <b>Клієнт:</b> ${formData.name}\n`;
    message += `📞 <b>Телефон:</b> ${formData.phone}\n`;
    message += `🏙 <b>Місто:</b> ${formData.city}\n`;
    message += `🚚 <b>Пошта:</b> ${formData.post}\n\n`;
    message += `🛒 <b>ТОВАРИ:</b>\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.selectedSize}) - ${item.quantity} шт. - ${item.price * item.quantity} грн\n`;
    });
    
    message += `\n💰 <b>СУМА: ${totalPrice} грн</b>`;

    try {
      await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });

      toast({ title: "Замовлення прийнято!", description: "Менеджер зв'яжеться з вами.", status: "success", duration: 5000, isClosable: true, position: "top" });
      clearCart();
      setFormData({ name: '', phone: '', city: '', post: '' });
    } catch (error) {
      toast({ title: "Помилка", description: "Спробуйте ще раз.", status: "error" });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Box textAlign="center" py={20} minH="60vh">
        <Heading size="xl" mb={4} textTransform="uppercase">Кошик порожній</Heading>
        <Text mb={8} color="gray.500">Ви ще нічого не додали.</Text>
        <Link to="/shop">
          <Button bg="black" color="white" size="lg" borderRadius="0" _hover={{ bg: "gray.800" }}>
            ПЕРЕЙТИ ДО ПОКУПОК
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 10 }} maxW="1200px" mx="auto" minH="80vh">
      <Heading mb={8} textTransform="uppercase" size="xl">ТВІЙ КОШИК</Heading>

      <Flex direction={{ base: "column", md: "row" }} gap={10}>
        
        {/* СПИСОК ТОВАРІВ */}
        <Box flex="1.5">
          <VStack spacing={4} align="stretch">
            {cart.map((item, index) => (
              <Flex key={index} border="2px solid black" p={4} align="center" gap={4} bg="white">
                <Image src={item.image} w="80px" h="80px" objectFit="cover" border="1px solid #eee" />
                <Box flex="1">
                  <Heading size="sm" textTransform="uppercase">{item.name}</Heading>
                  <Text fontSize="sm" color="gray.500">Розмір: {item.selectedSize}</Text>
                  <Text fontWeight="bold">{item.price} грн x {item.quantity}</Text>
                </Box>
                <IconButton 
                  icon={<FaTrash />} 
                  variant="ghost" 
                  colorScheme="red" 
                  onClick={() => removeFromCart(item.id, item.selectedSize)} 
                  aria-label="Видалити"
                />
              </Flex>
            ))}
          </VStack>
          <Box textAlign="right" mt={6}>
            <Heading size="lg">ВСЬОГО: {totalPrice} UAH</Heading>
          </Box>
        </Box>

        {/* ФОРМА */}
        <Box flex="1" border="2px solid black" p={6} h="fit-content" bg="gray.50">
          <Heading size="md" mb={6} textTransform="uppercase">Оформлення</Heading>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Ім'я та Прізвище</FormLabel>
              <Input name="name" value={formData.name} onChange={handleInputChange} borderRadius="0" border="1px solid black" bg="white" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Телефон</FormLabel>
              <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="099 123 45 67" borderRadius="0" border="1px solid black" bg="white" />
            </FormControl>
            <FormControl>
              <FormLabel>Місто</FormLabel>
              <Input name="city" value={formData.city} onChange={handleInputChange} borderRadius="0" border="1px solid black" bg="white" />
            </FormControl>
            <FormControl>
              <FormLabel>Відділення НП</FormLabel>
              <Input name="post" value={formData.post} onChange={handleInputChange} borderRadius="0" border="1px solid black" bg="white" />
            </FormControl>

            <Button 
              w="full" size="lg" bg="black" color="white" borderRadius="0" mt={4} 
              _hover={{ bg: "green.600" }}
              isLoading={isSubmitting} loadingText="ВІДПРАВКА..."
              onClick={sendOrderToTelegram} rightIcon={<FaArrowRight />}
            >
              ПІДТВЕРДИТИ
            </Button>
          </VStack>
        </Box>

      </Flex>
    </Box>
  );
};

export default CartPage;