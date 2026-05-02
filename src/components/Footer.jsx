import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { FaTelegram, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <Flex 
      as="footer" 
      justify="center" 
      align="center"
      gap={8} 
      p={8} 
      bg="white" 
      borderTop="2px solid black" // Жирна лінія зверху
      mt="auto"
    >
      <Icon as={FaTelegram} w={6} h={6} cursor="pointer" color="black" _hover={{ color: "gray.500" }} transition="0.2s"/>
      <Icon as={FaInstagram} w={6} h={6} cursor="pointer" color="black" _hover={{ color: "gray.500" }} transition="0.2s"/>
      <Icon as={FaTiktok} w={6} h={6} cursor="pointer" color="black" _hover={{ color: "gray.500" }} transition="0.2s"/>
    </Flex>
  );
};

export default Footer;