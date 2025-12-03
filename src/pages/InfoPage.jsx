import React from 'react';
import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react';

const InfoPage = () => {
  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="start">
        <Heading>Інформація про нас</Heading>
        
        <Box bg="white" p={6} borderRadius="md" shadow="sm" w="full">
          <Heading size="md" mb={2}>📞 Контакти</Heading>
          <Text>Телефон: +380 99 999 99 99</Text>
          <Text>Email: shop@example.com</Text>
        </Box>

        <Box bg="white" p={6} borderRadius="md" shadow="sm" w="full">
          <Heading size="md" mb={2}>🚚 Доставка</Heading>
          <Text>Ми відправляємо Новою Поштою кожного дня.</Text>
          <Text>Безкоштовна доставка від 2000 грн.</Text>
        </Box>

        <Box bg="white" p={6} borderRadius="md" shadow="sm" w="full">
          <Heading size="md" mb={2}>💳 Оплата</Heading>
          <Text>Оплата при отриманні або на карту.</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default InfoPage;