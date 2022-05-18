import {ChevronRightIcon} from '@chakra-ui/icons';
import {Button, Flex, Heading, Icon, Tag, Text, VStack, position} from '@chakra-ui/react';
import ProjectCard from 'components/ProjectCard';
import StatsBar from 'components/StatsBar';
import {Project} from 'interfaces';
import {projects} from 'utils/data';
import React from 'react';
import {MdOutlineShoppingCart} from 'react-icons/md';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {FreeMode, Navigation} from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';

interface Props {}

SwiperCore.use([Navigation]);

const Home = (props: Props) => {
  return (
    <>
      <Flex maxWidth="60%" flexDir="column" gap={8} mt="30px">
        <Heading size="xl" color="purple.700" textShadow="-2px 2px 0px #8f00ff">
          INVEST IN CURATED STARKNET PROJECTS
        </Heading>
        <Text color="secondary.100" fontSize="lg">
          <b>Buy</b> ZKP tokens and <b>stake</b> them and receive lottery tickets to <b>invest</b>{' '}
          in the listed projects.
        </Text>
        <Button
          leftIcon={<Icon as={MdOutlineShoppingCart} />}
          rightIcon={<ChevronRightIcon />}
          bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
          borderRadius="16px"
          boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
          width="300px"
          fontFamily="Druk Wide Web"
          py="25px"
          color="white"
          _hover={{bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)'}}
        >
          BUY ZKP
        </Button>
      </Flex>
      <StatsBar />
      <Flex mt="170px" gap="30px" mb="30px">
        <Heading size="md">ONGOING PROJECTS</Heading>
        <Tag
          bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
          borderRadius="8px"
          boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
          color="white"
          py="5px"
          width="110px"
          justifyContent="center"
          fontFamily="Druk Wide Web"
          cursor={'pointer'}
        >
          SEE ALL
        </Tag>
      </Flex>
      <Swiper
        slidesPerView={4.3}
        navigation
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true
        }}
        modules={[FreeMode]}
        className="mySwiper"
        style={{paddingBottom: '70px', width: '100vw', position: 'absolute', left: '0'}}
      >
        {projects?.map((project: Project) => (
          <SwiperSlide style={{paddingLeft: '40px'}}>
            <ProjectCard project={project} key={project.id} />
          </SwiperSlide>
        ))}
        <SwiperSlide style={{width: '20px'}} />
      </Swiper>
      <Flex mt="500px" />
    </>
  );
};

export default Home;
