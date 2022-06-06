import { NextPage } from 'next'
import Layout from '../layout'
import ProjectsSlider from '../components/ui/Slider/ProjectsSlider'
import Container from '../components/ui/Container'
import SearchInput from '../components/ui/inputs/SearchInput'
import Filter from 'components/ui/inputs/Filter'

const launchpad: NextPage = () => {
  return (
    <div className="launchpad">
      <Container>
        <div className="flex">
          <h1 className="text-54 font-heading uppercase mb-16 text-primaryDark text-shadow">
            Launchpad
          </h1>

          <div className="filter ml-auto flex items-center">
            <div className="mr-4">
              <SearchInput />
            </div>

            <Filter />
          </div>
        </div>

        <h2 className="text-24 text-primaryClear font-heading mb-6">ONGOING PROJETCS</h2>
      </Container>

      <ProjectsSlider />

      {/*<div className="relative">*/}
      {/*  <div className="main-background absolute bottom-0"></div>*/}
      {/*</div>*/}

      <Container>
        <h2 className="text-24 text-primaryClear font-heading mb-6 mt-8">FINISHED LAUNCHPADS</h2>
      </Container>
      <ProjectsSlider />
    </div>
  )
}

export default launchpad
