import { useQuery } from '@apollo/client'
import { PROJECT } from 'api/gql/querries'
import { Project } from 'interfaces'
import { useRouter } from 'next/router'
import React from 'react'
import ProjectBaseLayout from '../ProjectBaseLayout'
import Roadmap from './Roadmap'

const Participate = () => {
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
    <ProjectBaseLayout project={project}>
      <Roadmap project={project} />
      <div className="h-14" />
    </ProjectBaseLayout>
  )
}

export default Participate
