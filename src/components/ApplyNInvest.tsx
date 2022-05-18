import {Button, Flex, Image, Text, position} from '@chakra-ui/react';
import React from 'react';
import styles from '../styles/pid.module.scss';

const ApplyNInvest = ({project}: any) => {
  return (
    <Flex
      width={'100%'}
      filter="drop-shadow(0px 32px 48px rgba(55, 0, 99, 0.08))"
      bg={'#fff'}
      borderRadius="26px"
      border={'solid 2px #fff'}
      flexDir="column"
      className="TopRight info Box"
      position="relative"
    >
      <Image
        src="/assets/imgs/leader.png"
        position="absolute"
        height={'15px'}
        top={'30px'}
        right="25px"
      />
      <Image
        src="/assets/imgs/shield.png"
        position="absolute"
        height={'15px'}
        top={'30px'}
        right="55px"
      />
      <Flex width={'100%'} borderRadius="26px" bg="#FAF3FF" padding="20px">
        <div style={{marginTop: 'auto', marginBottom: 'auto'}}>
          <div className={styles.hex}>
            <div className={styles.hexBackground}>
              <img src={project?.logo} />
            </div>
          </div>
        </div>
        <Flex flexDir={'column'} ml="15px">
          <Text fontWeight="750" fontSize="16px" lineHeight="22px" color="#9D69DE">
            Apply and invest in
          </Text>
          <Text
            fontFamily="Druk Wide Web"
            fontStyle="normal"
            fontWeight="700"
            fontSize="40px"
            lineHeight="110%"
            color="#370063"
          >
            {project?.name}
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDir={'row'}
        padding="20px"
        width={'100%'}
        gridGap="10px"
        className="TopRight info Box"
      >
        <Button
          leftIcon={<Image src="/assets/imgs/rocket.png" height={'15px'} />}
          bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
          borderRadius="16px"
          boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
          fontFamily="Druk Wide Web"
          fontSize={'12px !important'}
          color="white"
          transition="all 0.5s ease"
          _hover={{bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)'}}
          height={'54px'}
          width="100%"
        >
          Apply Now
        </Button>
        <Button
          leftIcon={<Image src="/assets/imgs/booster.png" height={'15px'} />}
          bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
          borderRadius="16px"
          fontSize={'12px !important'}
          boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
          fontFamily="Druk Wide Web"
          color="white"
          transition="all 0.5s ease"
          _hover={{bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)'}}
          height={'54px'}
          minWidth="200px"
        >
          Booster Quests
        </Button>
      </Flex>
    </Flex>
  );
};

export default ApplyNInvest;
