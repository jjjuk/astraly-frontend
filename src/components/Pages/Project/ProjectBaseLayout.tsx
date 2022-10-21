import { PropsWithChildren } from 'react'
import ProjectInfos from './Main/ProjectInfos'
import { useRouter } from 'next/router'
import { Project } from '../../../interfaces'
import ProjectHeader from './ProjectHeader'
import Vertical from '../../ui/Separator/Vertical'

const ProjectBaseLayout = ({ children, project }: PropsWithChildren<{ project: Project }>) => {
  return (
    <div className="ProjectLayout g-container">
      <ProjectHeader project={project} />

      <div className="w-full">{children}</div>
    </div>
  )
}

export default ProjectBaseLayout
