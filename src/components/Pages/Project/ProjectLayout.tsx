import { PropsWithChildren } from 'react'
import ProjectInfos from './Main/ProjectInfos'
import { useRouter } from 'next/router'
import { Project } from '../../../interfaces'
import ProjectHeader from './ProjectHeader'

const ProjectLayout = ({ children, project }: PropsWithChildren<{ project: Project }>) => {
  const router = useRouter()
  return (
    <div className="ProjectLayout g-container">
      <ProjectHeader project={project} />

      <div className="grid grid-cols-3 gap-12 mb-10">
        <div className="col-end-3 col-start-1">{children}</div>

        <div>
          <ProjectInfos project={project} />
        </div>
      </div>
    </div>
  )
}

export default ProjectLayout
