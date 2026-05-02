import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, HStack, Button, Box, Badge, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Додали іконки
import ScrambledText from './ScrambledText';
import { useCart } from '../contex/CartContext'; 
import { useAuth } from '../contex/AuthContext'; // <--- Імпорт Авторизації

const buttonStyle = {
  bg: "transparent", color: "black", borderRadius: "0", fontWeight: "bold",
  textTransform: "uppercase", border: "2px solid transparent",
  _hover: { borderBottom: "2px solid black" }
};

const Header = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth(); // <--- Беремо дані користувача і функцію виходу

  return (
    <Flex as="nav" align="center" justify="space-between" padding="1.5rem" bg="white" borderBottom="2px solid black" position="sticky" top="0" zIndex="999">
      
      {/* Логотип */}
      <Box zIndex="2" bg="white"> 
        <Link to="/">
          <ScrambledText text="ZABAVNIY TOVARKA" size="lg" letterSpacing={'tighter'} textTransform="uppercase" fontWeight="900" />
        </Link>
      </Box>

      {/* Меню по центру */}
      <HStack spacing={4} display={{ base: "none", md: "flex" }} position="absolute" left="50%" transform="translateX(-50%)" zIndex="1">
        <Link to="/"><Button {...buttonStyle}>Головна</Button></Link>
        <Link to="/shop"><Button {...buttonStyle}>Магазин</Button></Link>
        <Link to="/info"><Button {...buttonStyle}>Інфо</Button></Link>
      </HStack>

      {/* Права частина: Вхід + Кошик */}
      <HStack zIndex="2" spacing={4}>
         
         {/* ЛОГІКА КНОПКИ ВХОДУ */}
         {user ? (
           // Якщо користувач увійшов - показуємо меню з його поштою
           <Menu>
             <MenuButton 
               as={Button} 
               borderRadius={0} 
               bg="white" 
               color="black" 
               border="2px solid black" 
               leftIcon={<FaUser />}
               _hover={{ bg: "gray.100" }}
               textTransform="uppercase"
               maxW="200px" // Обмеження ширини, якщо email довгий
               isTruncated // Три крапки, якщо не влазить
             >
               {user.email ? user.email.split('@')[0] : 'User'} {/* Показуємо нік до @ */}
             </MenuButton>
             <MenuList borderRadius={0} border="2px solid black" bg="white" p={0}>
               <MenuItem onClick={logout} icon={<FaSignOutAlt />} _hover={{ bg: "gray.200" }} fontWeight="bold">
                 ВИЙТИ
               </MenuItem>
             </MenuList>
           </Menu>
         ) : (
           // Якщо гість - показуємо кнопку ВХІД
           <Link to="/auth">
             <Button 
               borderRadius={0} 
               variant="ghost" 
               border="2px solid transparent"
               _hover={{ borderBottom: "2px solid black" }}
               fontWeight="bold"
             >
               ВХІД
             </Button>
           </Link>
         )}

         {/* КНОПКА КОШИКА */}
         <Link to="/cart">
           <Button position="relative" leftIcon={<FaShoppingCart />} bg="black" color="white" borderRadius="0" border="2px solid black" _hover={{ bg: "white", color: "black" }}>
              КОШИК
              {totalItems > 0 && (
                <Badge position="absolute" top="-8px" right="-8px" borderRadius="full" bg="red.500" color="white" fontSize="0.8em" px={2} border="1px solid black">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
      </HStack>
    </Flex>
  );
};

export default Header;