import { useRouter } from 'next/router'
import { Project } from '../../../interfaces'
import ProjectLayout from './ProjectLayout'
// import Roadmap from './Participate/Roadmap'
import ProjectCover from './Main/ProjectCover'
import DueDiligence from './Main/DueDiligence/DueDiligence'
import { useQuery } from '@apollo/client'
import { PROJECT } from '../../../api/gql/querries'

const ProjectPage = () => {
  const router = useRouter()
  const { pid } = router.query

  const { loading, error, data } = useQuery<{ project?: Project }>(PROJECT, {
    variables: {
      idoId: pid,
    },
  })

  const project = data?.project

  if (!project) {
    return <></>
  }

  return (
    <div className="ProjectPage">
      <ProjectLayout project={project}>
        <div className="mb-4">{/* <Roadmap project={project} /> */}</div>
        <div className="sticky top-36 left-0">
          <ProjectCover project={project} />
        </div>
      </ProjectLayout>

      <div className="g-container">
        <DueDiligence project={project} />
      </div>
    </div>
  )
}

export default ProjectPage
