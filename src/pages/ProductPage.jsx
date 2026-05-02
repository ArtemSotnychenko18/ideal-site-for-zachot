import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, Flex, Image, Heading, Text, Button, Select, HStack, IconButton, VStack, Divider, useToast 
} from '@chakra-ui/react';
import { FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contex/CartContext'; // Підключаємо кошик

const ProductPage = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const { addToCart } = useCart(); // Функція додавання
  const toast = useToast(); // Спливаюче вікно

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  if (!product) return <Heading p={10}>ТОВАР НЕ ЗНАЙДЕНО</Heading>;

  const availableSizes = product.sizes ? product.sizes.split(',').map(s => s.trim()) : ["ONE SIZE"];

  const handleAddToCart = () => {
    if (!size && availableSizes[0] !== "ONE SIZE") {
      toast({
        title: "Оберіть розмір!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    addToCart(product, size || "ONE SIZE", quantity);
    
    toast({
      title: "Додано в кошик",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
      containerStyle: { borderRadius: "0" } // Брутальний стиль тосту
    });
  };

  return (
    <Box p={{ base: 4, md: 10 }} bg="white" minH="80vh">
      <Link to="/shop">
        <Button leftIcon={<FaArrowLeft />} variant="ghost" mb={6} borderRadius="0" textTransform="uppercase" fontWeight="bold">
          Назад в магазин
        </Button>
      </Link>

      <Flex direction={{ base: "column", md: "row" }} gap={10}>
        <Box flex="1" border="2px solid black">
          <Image src={product.image} alt={product.name} w="100%" h={{ base: "400px", md: "600px" }} objectFit="cover" />
        </Box>

        <Box flex="1">
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h1" size="2xl" textTransform="uppercase" mb={2}>{product.name}</Heading>
              <Text fontSize="3xl" fontWeight="900">{product.price} UAH</Text>
            </Box>
            <Divider borderColor="black" />

            <Box w="100%">
              <Text mb={2} fontWeight="bold" textTransform="uppercase">Розмір *</Text>
              <Select placeholder="ОБРАТИ" borderRadius="0" border="2px solid black" onChange={(e) => setSize(e.target.value)}>
                {availableSizes.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
              </Select>
            </Box>

            <Box w="100%">
              <Text mb={2} fontWeight="bold" textTransform="uppercase">Кількість *</Text>
              <HStack spacing={0} border="2px solid black" w="fit-content">
                <IconButton icon={<FaMinus />} onClick={() => setQuantity(q => Math.max(1, q - 1))} borderRadius="0" bg="transparent" aria-label="-" />
                <Box px={4} fontWeight="bold">{quantity}</Box>
                <IconButton icon={<FaPlus />} onClick={() => setQuantity(q => q + 1)} borderRadius="0" bg="transparent" aria-label="+" />
              </HStack>
            </Box>

            <Button 
              w="full" h="50px" borderRadius="0" bg="black" color="white" 
              border="2px solid black" textTransform="uppercase" fontWeight="bold" fontSize="lg"
              _hover={{ bg: "white", color: "black" }}
              onClick={handleAddToCart}
              isDisabled={product.inStock === 'false'}
            >
              {product.inStock === 'false' ? "НЕМАЄ В НАЯВНОСТІ" : "ДОДАТИ В КОШИК"}
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductPage;