import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, useToast, Container, Alert, AlertIcon, Divider } from '@chakra-ui/react';
import { useAuth } from '../contex/AuthContext';
import { useNavigate } from 'react-router-dom';

// --- ТІ САМІ ДАНІ, ЩО І В КОШИКУ ---
const TG_BOT_TOKEN = '8576052941:AAFpx0JaCJVADfQzjqBeyrSrYdbbfWO1Py8'; 
const TG_CHAT_ID = '7509731990'; 

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); 
  
  // Вхід
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  
  // Реєстрація
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // --- ВХІД ---
  const handleLogin = async () => {
    setError('');
    try {
      await login(loginEmail, loginPass);
      toast({ title: "Успішний вхід!", status: "success", position: "top" });
      navigate('/'); 
    } catch (err) {
      setError("Помилка входу: Перевірте пошту та пароль (або вас ще не додали в таблицю).");
    }
  };

  // --- РЕЄСТРАЦІЯ (ВІДПРАВКА В ТОЙ САМИЙ БОТ) ---
  const handleRegistrationRequest = async () => {
    if (!regName || !regEmail || !regPass) {
      toast({ title: "Заповніть всі поля!", status: "warning", position: "top" });
      return;
    }

    setIsLoading(true);

    // Повідомлення для тебе
    const message = `🆕 <b>НОВИЙ КОРИСТУВАЧ (ЗАПИТ):</b>\n\n` +
                    `👤 <b>Ім'я:</b> ${regName}\n` +
                    `📧 <b>Email:</b> <code>${regEmail}</code>\n` +
                    `🔑 <b>Пароль:</b> <code>${regPass}</code>\n\n` +
                    `<i>Скопіюй та встав у Google Таблицю (users)!</i>`;

    try {
      await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID, // Шлемо тобі ж
          text: message,
          parse_mode: 'HTML'
        })
      });

      toast({ 
        title: "Заявку надіслано!", 
        description: "Адмін додасть вас за хвилину.", 
        status: "info", 
        duration: 5000, 
        isClosable: true, 
        position: "top" 
      });
      
      setRegName(''); setRegEmail(''); setRegPass('');
      setIsLoginMode(true); 

    } catch (err) {
      toast({ title: "Помилка відправки", status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container centerContent pt={20} pb={20}>
      <Box p={8} maxWidth="500px" borderWidth={2} borderRadius={0} borderColor="black" boxShadow="lg" w="100%" bg="white">
        
        <VStack spacing={6}>
          <Heading textTransform="uppercase">
            {isLoginMode ? "Вхід в акаунт" : "Створити акаунт"}
          </Heading>
          
          {error && isLoginMode && (
            <Alert status="error" borderRadius={0}><AlertIcon />{error}</Alert>
          )}

          {/* ФОРМА ВХОДУ */}
          {isLoginMode ? (
            <VStack w="full" spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} border="1px solid black" borderRadius={0} />
              </FormControl>
              <FormControl>
                <FormLabel>Пароль</FormLabel>
                <Input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} border="1px solid black" borderRadius={0} />
              </FormControl>
              
              <Button w="full" bg="black" color="white" borderRadius={0} _hover={{ bg: "gray.800" }} onClick={handleLogin}>
                УВІЙТИ
              </Button>
            </VStack>
          ) : (
            /* ФОРМА РЕЄСТРАЦІЇ */
            <VStack w="full" spacing={4}>
              <Alert status="info" borderRadius={0} fontSize="sm">
                <AlertIcon />
                Заповніть дані. Заявка прийде адміну в Telegram.
              </Alert>
              
              <FormControl isRequired>
                <FormLabel>Ваше Ім'я</FormLabel>
                <Input value={regName} onChange={(e) => setRegName(e.target.value)} border="1px solid black" borderRadius={0} placeholder="Іван" />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Email (Логін)</FormLabel>
                <Input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} border="1px solid black" borderRadius={0} placeholder="user@mail.com" />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Придумайте пароль</FormLabel>
                <Input type="text" value={regPass} onChange={(e) => setRegPass(e.target.value)} border="1px solid black" borderRadius={0} placeholder="123456" />
              </FormControl>

              <Button 
                w="full" bg="black" color="white" borderRadius={0} _hover={{ bg: "gray.800" }} 
                onClick={handleRegistrationRequest}
                isLoading={isLoading}
                loadingText="ВІДПРАВКА..."
              >
                НАДІСЛАТИ ЗАЯВКУ
              </Button>
            </VStack>
          )}

          <Divider borderColor="gray.300" />

          <Text cursor="pointer" onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }} textDecoration="underline" fontWeight="bold">
            {isLoginMode ? "Немає акаунту? ЗАРЕЄСТРУВАТИСЯ" : "Вже є акаунт? УВІЙТИ"}
          </Text>

        </VStack>
      </Box>
    </Container>
  );
};

export default AuthPage;