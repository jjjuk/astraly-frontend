import StatsBar from 'components/StatsBar'
import React, { useState } from 'react'

import ProjectsSlider from 'components/ui/Slider/ProjectsSlider'
import Container from 'components/ui/Container'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { SEARCH_PROJECTS } from '../../api/gql/querries'
import SearchInput from '../../components/ui/inputs/SearchInput'
import Filter from '../../components/ui/inputs/Filter'
import RoadmapBlock from '../../components/Blocks/Roadmap/RoadmapBlock'
import NetworkStatsBlock from '../../components/Blocks/NetworkStats/NetworkStatsBlock'
import FaqBlock from '../../components/Blocks/Faq/FaqBlock'
import TeamBlock from '../../components/Blocks/Team/TeamBlock'
import FloatingMenu from '../../components/ui/FloatingMenu/FloatingMenu'
import { BoltIcon } from 'components/ui/Icons/Icons'

const Home = () => {
  const [search, setSearch] = useState('')
  const { loading, error, data } = useQuery(SEARCH_PROJECTS, {
    variables: {
      search,
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
    <div className="-mb-20">
      {/*<div className="my-20 w-full overflow-hidden">*/}
      {/*  <StatsBar />*/}
      {/*</div>*/}

      <FloatingMenu />

      <Container className="mt-16 mb-[50px]">
        <div className="flex flex-col md:flex-row md:items-center mb-9 gap-4">
          <h2 className="ui-t-dark capitalize font-heading text-24 mr-6">Ongoing Projects</h2>
          {/*<Filter />*/}
          {/*<SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />*/}
        </div>
        {data && data.searchProjects.length > 0 ? (
          <ProjectsSlider projects={data.searchProjects} />
        ) : (
          <h4 className="title ui-small-title ui-t-dark flex items-center">
            <div className="icon mr-1">
              <BoltIcon />
            </div>
            Don't worry new projects are coming sooner than you expect
          </h4>
        )}
      </Container>

      <Container className="mt-16 mb-[50px]">
        <div className="flex flex-col md:flex-row md:items-center mb-9 gap-4">
          <h2 className="ui-t-dark capitalize font-heading text-24 mr-6">Finished Projects</h2>
          {/*<Filter />*/}
          {/*<SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />*/}
        </div>
        {finishedProjects && finishedProjects.searchProjects.length > 0 && (
          <ProjectsSlider projects={finishedProjects.searchProjects} />
        )}
      </Container>

      <div className="h-16"></div>
      <RoadmapBlock />
      <NetworkStatsBlock />
      <FaqBlock />
      <TeamBlock />
    </div>
  )
}

export default Home
