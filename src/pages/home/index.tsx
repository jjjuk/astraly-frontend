import StatsBar from 'components/StatsBar'
import React from 'react'

import ProjectsSlider from 'components/ui/Slider/ProjectsSlider'
import Container from 'components/ui/Container'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <div className="my-20 w-full overflow-hidden">
        <StatsBar />
      </div>

      <Container>
        <div className="flex items-center mb-9">
          <h2 className="text-primaryDark uppercase font-heading text-24">ONGOING PROJETCS</h2>
          <Link href={'/launchpad'}>
            <div className="bg-primary text-white font-heading uppercase px-4 pt-1 pb-0.5 text-12 ml-6 -mt-1 rounded-md cursor-pointer shadow-purpleDark">
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
