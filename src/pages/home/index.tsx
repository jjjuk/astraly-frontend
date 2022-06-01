import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Flex, Heading, Icon, Tag, Text, VStack, position } from '@chakra-ui/react'
import ProjectCard from 'components/ProjectCard'
import StatsBar from 'components/StatsBar'
import { Project } from 'interfaces'
import { projects } from 'utils/data'
import React, { useRef } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { FreeMode, Navigation, Scrollbar, A11y } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'
import HomeHeading from '../../components/Pages/Home/HomeHeading'
import ProjectsSlider from '../../components/ui/Slider/ProjectsSlider'
import Container from 'components/ui/Container'
import Link from 'next/link'

interface Props {}

SwiperCore.use([Navigation])

const Home = (props: Props) => {
  return (
    <div>
      <div className="g-container mt-2">
        <HomeHeading />
      </div>

      <div className="my-20 w-full overflow-hidden">
        <StatsBar />
      </div>

      <Container>
        <div className="flex items-center mb-9">
          <h2 className="text-primaryDark uppercase font-heading text-24">ONGOING PROJETCS</h2>
          <Link href={'/launchpad'}>
            <div className="bg-primary text-white font-heading uppercase px-4 pt-1 pb-0.5 text-12 ml-6 -mt-1 rounded-md cursor-pointer">
              See all
            </div>
          </Link>
        </div>
      </Container>

      <ProjectsSlider />

      {/*<>*/}
      {/*  <Flex maxWidth="60%" flexDir="column" gap={8} mt="30px">*/}
      {/*    <Heading size="xl" color="purple.700" textShadow="-2px 2px 0px #8f00ff">*/}
      {/*      INVEST IN CURATED STARKNET PROJECTS*/}
      {/*    </Heading>*/}
      {/*    <Text color="secondary.100" fontSize="lg">*/}
      {/*      <b>Buy</b> ZKP tokens and <b>stake</b> them and receive lottery tickets to <b>invest</b>{' '}*/}
      {/*      in the listed projects.*/}
      {/*    </Text>*/}
      {/*    <Button*/}
      {/*      leftIcon={<Icon as={MdOutlineShoppingCart} />}*/}
      {/*      rightIcon={<ChevronRightIcon />}*/}
      {/*      bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"*/}
      {/*      borderRadius="16px"*/}
      {/*      boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"*/}
      {/*      width="300px"*/}
      {/*      fontFamily="Druk Wide Web"*/}
      {/*      py="25px"*/}
      {/*      color="white"*/}
      {/*      _hover={{ bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)' }}>*/}
      {/*      BUY ZKP*/}
      {/*    </Button>*/}
      {/*  </Flex>*/}
      {/*  <StatsBar />*/}
      {/*  <Flex mt="170px" gap="30px" mb="30px">*/}
      {/*    <Heading size="md">ONGOING PROJECTS</Heading>*/}
      {/*    <Tag*/}
      {/*      bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"*/}
      {/*      borderRadius="8px"*/}
      {/*      boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"*/}
      {/*      color="white"*/}
      {/*      py="5px"*/}
      {/*      width="110px"*/}
      {/*      justifyContent="center"*/}
      {/*      fontFamily="Druk Wide Web"*/}
      {/*      cursor={'pointer'}>*/}
      {/*      SEE ALL*/}
      {/*    </Tag>*/}
      {/*  </Flex>*/}
      {/*  <Swiper*/}
      {/*    slidesPerView={4.3}*/}
      {/*    spaceBetween={0}*/}
      {/*    freeMode={true}*/}
      {/*    allowSlideNext={true}*/}
      {/*    allowSlidePrev={true}*/}
      {/*    modules={[FreeMode, Scrollbar, A11y]}*/}
      {/*    navigation*/}
      {/*    updateOnWindowResize*/}
      {/*    loop*/}
      {/*    style={{*/}
      {/*      paddingBottom: '70px',*/}
      {/*      width: '100vw',*/}
      {/*      position: 'absolute',*/}
      {/*      left: '0',*/}
      {/*      ['--swiper-navigation-color' as any]: '#8F00FF',*/}
      {/*      ['--swiper-navigation-size' as any]: '20px'*/}
      {/*    }}>*/}
      {/*    {projects?.map((project: Project) => (*/}
      {/*      <SwiperSlide style={{ paddingLeft: '40px' }}>*/}
      {/*        <ProjectCard project={project} key={project.id} />*/}
      {/*      </SwiperSlide>*/}
      {/*    ))}*/}
      {/*  </Swiper>*/}
      {/*  <Flex mt="550px" />*/}
      {/*</>*/}
    </div>
  )
}

export default Home
