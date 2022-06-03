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
    </div>
  )
}

export default Home
