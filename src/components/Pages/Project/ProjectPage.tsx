import ProjectHeader from './ProjectHeader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../interfaces'
import ProjectLayout from './ProjectLayout'
import Roadmap from './Main/Roadmap'
import ProjectCover from './Main/ProjectCover'
import DueDiligence from './Main/DueDiligence/DueDiligence'
import { useQuery } from '@apollo/client'
import { PROJECT } from '../../../api/gql/querries'

const ProjectPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const [project, setProject] = useState<Project | undefined>(undefined)
  const { loading, error, data } = useQuery(PROJECT, {
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
    <div className="ProjectPage">
      <ProjectLayout project={project}>
        <div className="mb-4">
          <Roadmap project={project} />
        </div>
        <ProjectCover project={project} />
      </ProjectLayout>

      <div className="g-container">
        <DueDiligence project={project} />
      </div>
    </div>
  )
}

export default ProjectPage
