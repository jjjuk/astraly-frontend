import React from 'react'

import { default as _ReactPlayer } from 'react-player'
import { ReactPlayerProps } from 'react-player/types/lib'
import ProjectPage from '../../../components/Pages/Project/ProjectPage'

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>

const ProjectPageContainer = () => {
  return <ProjectPage />
}

export default ProjectPageContainer
