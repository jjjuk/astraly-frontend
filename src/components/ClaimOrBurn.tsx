import React from 'react';
import {Button, Flex, Image, Text} from '@chakra-ui/react';

const ClaimOrBurn = ({title, number, burn}: any) => {
  return (
    <Flex width={'100%'} bg="#fff" border={'2px #fff solid'} borderRadius="24px" flexDir={'column'}>
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
          {title}
        </Text>
        <Flex gridGap={'20px'}>
          <Text fontWeight="750" fontSize="16px" lineHeight="22px" color="#9D69DE">
            Available
          </Text>
          <Text
            fontFamily="Druk Wide Web"
            fontWeight="700"
            fontSize="16px"
            lineHeight="21px"
            color="#8F00FF"
          >
            {number}
          </Text>
        </Flex>
      </Flex>
      {burn && (
        <Flex flexDir={'row'} padding="25px">
          ayooooo
        </Flex>
      )}
      {!burn && (
        <Flex flexDir={'row'} padding="25px" gridGap={'16px'}>
          <Button
            leftIcon={<Image src="/assets/imgs/upload.png" height="20px" />}
            bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
            borderRadius="16px"
            boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
            width="100%"
            fontFamily="Druk Wide Web"
            py="25px"
            color="white"
            _hover={{bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)'}}
          >
            Claim Tokens
          </Button>
          <Button
            leftIcon={<Image src="/assets/imgs/locker.png" height="20px" />}
            bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
            borderRadius="16px"
            boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
            width="350px"
            fontFamily="Druk Wide Web"
            py="25px"
            color="white"
            _hover={{bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)'}}
          >
            Lock More ZKP
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default ClaimOrBurn;
