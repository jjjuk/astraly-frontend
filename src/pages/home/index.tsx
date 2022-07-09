import StatsBar from 'components/StatsBar'
import React, { useState } from 'react'

import ProjectsSlider from 'components/ui/Slider/ProjectsSlider'
import Container from 'components/ui/Container'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { SEARCH_PROJECTS } from '../../api/gql/querries'
import SearchInput from '../../components/ui/inputs/SearchInput'
import Filter from '../../components/ui/inputs/Filter'

const Home = () => {
  const [search, setSearch] = useState('')
  const { loading, error, data } = useQuery(SEARCH_PROJECTS, {
    variables: {
      search,
      finished: false,
    },
  })

  return (
    <div>
      <div className="my-20 w-full overflow-hidden">
        <StatsBar />
      </div>

      <Container>
        <div className="flex items-center mb-9 gap-4">
          <h2 className="text-primaryDark uppercase font-heading text-24 mr-6">ONGOING PROJECTS</h2>
          <Filter />
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </Container>

      {data && data.searchProjects.length > 0 && <ProjectsSlider projects={data.searchProjects} />}
    </div>
  )
}

export default Home
