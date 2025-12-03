import React, { useState } from 'react';
import { Box, Flex, Text, Button, IconButton, Image, Heading } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const leftIndex = (currentIndex - 1 + items.length) % items.length;
  const rightIndex = (currentIndex + 1) % items.length;

  if (!items || items.length === 0) return <Text>Завантаження...</Text>;

  const renderCard = (item, isCenter) => (
    <Box
      key={item.id}
      w={isCenter ? "300px" : "220px"}
      h={isCenter ? "450px" : "350px"}
      bg="white"
      boxShadow="2xl"
      borderRadius="20px"
      opacity={isCenter ? 1 : 0.4}
      transform={isCenter ? "scale(1)" : "scale(0.9)"}
      transition="all 0.5s ease"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      mx={-4}
      zIndex={isCenter ? 10 : 1}
      position="relative"
      border="1px solid #eee"
    >
      <Image src={item.image} alt={item.name} h="60%" objectFit="cover" mb={4} borderRadius="10px" />
      <Heading size={isCenter ? "md" : "sm"} textAlign="center">{item.name}</Heading>
      <Text fontSize={isCenter ? "xl" : "md"} color="green.500" fontWeight="bold" mt={2}>
        {item.price} грн
      </Text>
      {isCenter && (
        <Button mt={4} colorScheme="blackAlpha" size="md" w="80%">
          Купити
        </Button>
      )}
    </Box>
  );

  return (
    <Flex align="center" justify="center" w="100%" py={10}>
      <IconButton 
        icon={<FaChevronLeft />} 
        onClick={prevSlide} 
        isRound 
        size="lg" 
        mr={8}
        zIndex={20}
        colorScheme="gray"
      />

      <Flex align="center" justify="center" position="relative">
        {renderCard(items[leftIndex], false)}
        {renderCard(items[currentIndex], true)}
        {renderCard(items[rightIndex], false)}
      </Flex>

      <IconButton 
        icon={<FaChevronRight />} 
        onClick={nextSlide} 
        isRound 
        size="lg" 
        ml={8}
        zIndex={20}
        colorScheme="gray"
      />
    </Flex>
  );
};

export default Carousel;