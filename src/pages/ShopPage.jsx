import React from 'react';
import { SimpleGrid, Box, Image, Heading, Text, Button, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Імпортуємо Link

const ShopPage = ({ products }) => {
  if (!products || products.length === 0) return <Heading p={10}>ЗАВАНТАЖЕННЯ...</Heading>;

  return (
    <Box p={5}>
      <Heading mb={8} textAlign="center" textTransform="uppercase" fontWeight="900">Всі товари</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {products.map((item) => (
          <Box 
            key={item.id} 
            border="2px solid black"
            borderRadius="0"
            overflow="hidden" 
            bg="white"
            position="relative"
            transition="all 0.3s"
            _hover={{ 
              boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)", 
              transform: "translate(-5px, -5px)"
            }}
          >
            {/* Картинка тепер є посиланням на сторінку товару */}
            <Link to={`/product/${item.id}`}>
                <Box borderBottom="2px solid black" cursor="pointer">
                    <Image src={item.image} alt={item.name} h="300px" w="100%" objectFit="cover" />
                </Box>
            </Link>

            <Box p={5}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                {item.inStock === 'false' ? (
                  <Badge borderRadius="0" bg="red.500" color="white" px="2" textTransform="uppercase">Sold Out</Badge>
                ) : (
                  <Badge borderRadius="0" bg="black" color="white" px="2" textTransform="uppercase">In Stock</Badge>
                )}
                <Text fontSize="xl" fontWeight="900">
                    {item.price} UAH
                </Text>
              </Box>

              {/* Назва теж посилання */}
              <Link to={`/product/${item.id}`}>
                  <Heading size="md" textTransform="uppercase" mb={4} fontWeight="bold" cursor="pointer" _hover={{ textDecoration: 'underline' }}>
                    {item.name}
                  </Heading>
              </Link>

              {/* Кнопка веде на сторінку товару, щоб там обрати розмір */}
              <Link to={`/product/${item.id}`}>
                  <Button 
                    w="full"
                    borderRadius="0"
                    bg="white"
                    color="black"
                    border="2px solid black"
                    fontWeight="bold"
                    textTransform="uppercase"
                    _hover={{ bg: "black", color: "white" }}
                  >
                    ОБРАТИ
                  </Button>
              </Link>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ShopPage;