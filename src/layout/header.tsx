import {HamburgerIcon} from '@chakra-ui/icons';
import {Box, Heading, Flex, Image, useDisclosure, Link} from '@chakra-ui/react';
import React from 'react';

interface Props {}

const Header = (props: Props) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px={0}
      py={6}
      color="white"
      {...props}
    >
      <Link href="/" _hover={{textDecoration: 'none'}}>
        <Flex align="center" mr={5}>
          <Image src="/images/logo.png" alt="zkPad" mr="4" h="57px" />
          <Heading fontSize="24px" mt="5px">
            ZKPAD
          </Heading>
        </Flex>
      </Link>

      <Box display={{base: 'block', md: 'none'}} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>
    </Flex>
  );
};

export default Header;
