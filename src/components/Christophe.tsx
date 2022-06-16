import {Flex, Text} from '@chakra-ui/react';
import React from 'react';

const Christophe = ({project}: any) => {
  return (
    <Flex bg={'#fff'} borderRadius="24px" flexDir={'column'} border="2px solid #fff">
      <Flex flexDir={'column'} padding="20px">
        <Text
          fontFamily="Druk Wide Web"
          fontWeight="700"
          fontSize="16px"
          lineHeight="21px"
          color="#9D69DE"
          mb={'8px'}
        >
          Links
        </Text>
        <Flex gridGap={'10px'}></Flex>
      </Flex>
      <Flex flexDir={'column'} padding="20px" bg={'#FAF3FF'} borderRadius="24px">
        <Text
          fontFamily="Druk Wide Web"
          fontWeight="700"
          fontSize="16px"
          lineHeight="21px"
          color="#9D69DE"
          mb={'8px'}
        >
          Pitch
        </Text>
        <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
          {project?.description}
        </Text>
      </Flex>
      <Flex flexDir={'column'} padding="20px" borderRadius="24px">
        <Text
          fontFamily="Druk Wide Web"
          fontWeight="700"
          fontSize="16px"
          lineHeight="21px"
          color="#9D69DE"
          mb={'8px'}
        >
          Admission
        </Text>
        <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
          Have locked ASTR tokens 5 transactions on Uniswap in the last 6 month Have at least 2500$
          of tokens on your wallet
        </Text>
      </Flex>
      <Flex flexDir={'column'} padding="20px" bg={'#FAF3FF'} borderRadius="24px">
        <Text
          fontFamily="Druk Wide Web"
          fontWeight="700"
          fontSize="16px"
          lineHeight="21px"
          color="#9D69DE"
          mb={'8px'}
        >
          IDO Information
        </Text>
        <Flex width={'100%'}>
          <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
            Hardcap
          </Text>
          <Text
            fontFamily="Druk Wide Web"
            fontStyle="normal"
            fontWeight="700"
            fontSize="16px"
            lineHeight="21px"
            textAlign="right"
            color="#8F00FF"
            ml={'auto'}
          >
            {project?.totalRaise}
          </Text>
        </Flex>
        <Flex width={'100%'} mt="8px">
          <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
            Token Price
          </Text>
          <Text
            fontFamily="Druk Wide Web"
            fontStyle="normal"
            fontWeight="700"
            fontSize="16px"
            lineHeight="21px"
            textAlign="right"
            color="#8F00FF"
            ml={'auto'}
          >
            ${project?.maxAllocation}
          </Text>
        </Flex>
        <Flex width={'100%'} mt="8px">
          <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
            Max. Allocation
          </Text>
          <Text
            fontFamily="Druk Wide Web"
            fontStyle="normal"
            fontWeight="700"
            fontSize="16px"
            lineHeight="21px"
            textAlign="right"
            color="#8F00FF"
            ml={'auto'}
          >
            {project?.maxAllocation}
          </Text>
        </Flex>
        <Flex width={'100%'} mt="8px">
          <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
            Type
          </Text>
          <Text
            fontFamily="Druk Wide Web"
            fontStyle="normal"
            fontWeight="700"
            fontSize="16px"
            lineHeight="21px"
            textAlign="right"
            color="#8F00FF"
            ml={'auto'}
          >
            {project?.type}
          </Text>
        </Flex>
        <Flex width={'100%'} mt="8px">
          <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
            Blockchain
          </Text>
          <Text
            fontFamily="Druk Wide Web"
            fontStyle="normal"
            fontWeight="700"
            fontSize="16px"
            lineHeight="21px"
            textAlign="right"
            color="#8F00FF"
            ml={'auto'}
          >
            {project?.maxAllocation}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Christophe;
