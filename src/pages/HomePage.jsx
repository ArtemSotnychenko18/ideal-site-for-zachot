import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Carousel from '../components/Carousel';

const HomePage = ({ products }) => {
  return (
    // Я змінив bg="gray.50" на bg="white", щоб все було біле в новому стилі
    <Flex direction="column" flex="1" justify="center" bg="white"> 
      
      {/* Секція каруселі */}
      <Box flex="1" display="flex" alignItems="center" justifyContent="center" py={10}>
         <Carousel items={products} />
      </Box>

      {/* Старий блок з іконками ми звідси ВИДАЛИЛИ, бо тепер є головний Footer */}
    </Flex>
  );
};

export default HomePage;