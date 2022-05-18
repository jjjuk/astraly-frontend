import {Button, Flex, Image, Text} from '@chakra-ui/react';
import React from 'react';

const Requirements = () => {
  return (
    <Flex
      width={'100%'}
      bg="#fff"
      border={'2px #fff solid'}
      borderRadius="24px"
      flexDir={'column'}
      position="relative"
    >
      <Image
        src="/assets/imgs/calendar.png"
        position="absolute"
        height={'15px'}
        top={'30px'}
        right="25px"
      />
      <Image
        src="/assets/imgs/profile.png"
        position="absolute"
        height={'15px'}
        top={'30px'}
        right="55px"
      />
      <Flex
        bg={'#FAF3FF'}
        borderRadius="24px"
        width={'100%'}
        padding="25px"
        gridGap={'8px'}
        flexDir="column"
      >
        <Text
          fontFamily="Druk Wide Web"
          fontWeight="700"
          fontSize="24px"
          lineHeight="31px"
          color="#370063"
        >
          Requirements
        </Text>
        <Text fontWeight="750" fontSize="16px" lineHeight="22px" color="#9D69DE">
          In order to win an allocation you need to
        </Text>
      </Flex>
      <Flex flexDir={'row'} padding="25px" gridGap={'16px'}>
        <Button
          leftIcon={<Image src="/assets/imgs/checked.png" height="20px" />}
          bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
          borderRadius="16px"
          boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
          width="100%"
          fontFamily="Druk Wide Web"
          py="25px"
          color="white"
          _hover={{bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)'}}
        >
          Submit your KYC
        </Button>
      </Flex>
    </Flex>
  );
};

export default Requirements;
