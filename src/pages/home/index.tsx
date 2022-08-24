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

const Home = () => {
  const [search, setSearch] = useState('')
  const { loading, error, data } = useQuery(SEARCH_PROJECTS, {
    variables: {
      search,
      finished: false,
    },
  })

  return (
    <div className="-mb-20">
      {/*<div className="my-20 w-full overflow-hidden">*/}
      {/*  <StatsBar />*/}
      {/*</div>*/}

      <FloatingMenu />

      <Container className="mt-16">
        <div className="flex flex-col md:flex-row md:items-center mb-9 gap-4">
          <h2 className="ui-t-dark capitalize font-heading text-24 mr-6">Ongoing Projects</h2>
          {/*<Filter />*/}
          {/*<SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />*/}
        </div>
      </Container>

      {data && data.searchProjects.length > 0 && <ProjectsSlider projects={data.searchProjects} />}

      <div className="h-16"></div>
      <RoadmapBlock />
      <NetworkStatsBlock />
      <FaqBlock />
      <TeamBlock />
    </div>
  )
}

export default Home
