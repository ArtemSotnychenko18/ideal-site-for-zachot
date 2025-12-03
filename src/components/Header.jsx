import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, HStack, Button, Box, Badge } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import ScrambledText from './ScrambledText';
import { useCart } from '../contex/CartContext'; // <--- Імпорт

const buttonStyle = {
  bg: "transparent", color: "black", borderRadius: "0", fontWeight: "bold",
  textTransform: "uppercase", border: "2px solid transparent",
  _hover: { borderBottom: "2px solid black" }
};

const Header = () => {
  const { totalItems } = useCart(); // <--- Беремо кількість

  return (
    <Flex as="nav" align="center" justify="space-between" padding="1.5rem" bg="white" borderBottom="2px solid black" position="sticky" top="0" zIndex="999">
      <Box zIndex="2" bg="white"> 
        <ScrambledText text="ZABAVNIY TOVARKA" size="lg" letterSpacing={'tighter'} textTransform="uppercase" fontWeight="900" />
      </Box>

      <HStack spacing={4} display={{ base: "none", md: "flex" }} position="absolute" left="50%" transform="translateX(-50%)" zIndex="1">
        <Link to="/"><Button {...buttonStyle}>Головна</Button></Link>
        <Link to="/shop"><Button {...buttonStyle}>Магазин</Button></Link>
        <Link to="/info"><Button {...buttonStyle}>Інфо</Button></Link>
      </HStack>

      <Box zIndex="2" position="relative">
         <Link to="/cart">
           <Button leftIcon={<FaShoppingCart />} bg="black" color="white" borderRadius="0" border="2px solid black" _hover={{ bg: "white", color: "black" }}>
              КОШИК
            </Button>
            {/* Червоний кружечок з цифрою */}
            {totalItems > 0 && (
              <Badge 
                position="absolute" top="-8px" right="-8px" 
                borderRadius="full" bg="red.500" color="white" 
                fontSize="0.8em" px={2} border="1px solid black"
              >
                {totalItems}
              </Badge>
            )}
          </Link>
      </Box>
    </Flex>
  );
};

export default Header;