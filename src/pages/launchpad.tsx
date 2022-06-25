import { NextPage } from 'next'
import Layout from '../layout'
import ProjectsSlider from '../components/ui/Slider/ProjectsSlider'
import Container from '../components/ui/Container'
import SearchInput from '../components/ui/inputs/SearchInput'
import Filter from 'components/ui/inputs/Filter'
import { useQuery } from '@apollo/client'
import { SEARCH_PROJECTS } from 'api/gql/querries'

const launchpad: NextPage = () => {
  const {
    loading,
    error,
    data: unfinishedProjects,
  } = useQuery(SEARCH_PROJECTS, {
    variables: {
      finished: false,
    },
  })
  const {
    loading: loading_,
    error: error_,
    data: finishedProjects,
  } = useQuery(SEARCH_PROJECTS, {
    variables: {
      finished: true,
    },
  })
  return (
    <div className="launchpad">
      <div className={'bg-gradient-to-t from-bgPurple to-transparent'}>
        <Container>
          <div className="lg:flex mb-16 ">
            <h1 className="page-title font-heading uppercase text-primaryDark text-shadow mb-4 lg:mb-0">
              Launchpad
            </h1>

            <div className="filter ml-auto flex items-center">
              <div className="mr-4"></div>

              <Filter />
            </div>
          </div>

          <h2 className="text-24 text-primaryClear font-heading mb-6">ONGOING PROJECTS</h2>
        </Container>

        {unfinishedProjects && <ProjectsSlider projects={unfinishedProjects.searchProjects} />}
      </div>

      {/*<div className="relative">*/}
      {/*  <div className="main-background absolute bottom-0"></div>*/}
      {/*</div>*/}

      <Container>
        <h2 className="text-24 text-primaryClear font-heading mb-6 mt-8">FINISHED LAUNCHPADS</h2>
      </Container>
      {finishedProjects?.searchProjects.length > 0 && (
        <ProjectsSlider projects={finishedProjects.searchProjects} />
      )}
    </div>
  )
}

export default launchpad
