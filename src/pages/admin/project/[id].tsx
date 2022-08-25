import Router, { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { IS_ADMIN, PROJECT } from '../../../api/gql/querries'
import ProjectForm from '../../../components/Admin/ProjectForm'

const ProjectId = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(PROJECT, {
    variables: {
      idoId: id,
    },
  })

  const { error } = useQuery(IS_ADMIN)
  if (error) {
    Router.replace('/404')
    return <></>
  }

  if (!data) {
    return <div></div>
  }

  return <ProjectForm project={data.project} />
}

export default ProjectId
