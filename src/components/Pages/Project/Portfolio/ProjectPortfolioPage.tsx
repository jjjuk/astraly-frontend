import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../../interfaces'
import ProjectLayout from '../ProjectLayout'
import InvestmentOverview from '../../../ui/Investment/InvestmentOverview'
import { useQuery } from '@apollo/client'
import { PROJECT } from '../../../../api/gql/querries'

const ProjectPortfolioPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const [project, setProject] = useState<Project | undefined>(undefined)
  const { data } = useQuery(PROJECT, {
    variables: {
      idoId: pid,
    },
  })

  useEffect(() => {
    data && setProject(data.project)
  }, [data])

  if (!project) {
    return <></>
  }

  return (
    <>
      <ProjectLayout project={project}>
        <InvestmentOverview />
      </ProjectLayout>
    </>
  )
}

export default ProjectPortfolioPage
