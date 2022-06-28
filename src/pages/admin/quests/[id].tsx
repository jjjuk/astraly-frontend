import { useQuery } from '@apollo/client'
import { IS_ADMIN, QUEST } from '../../../api/gql/querries'
import Router, { useRouter } from 'next/router'
import QuestForm from '../../../components/Admin/QuestForm'

const QuestId = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(QUEST, {
    variables: {
      _id: id,
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

  return <QuestForm quest={data.quest} />
}

export default QuestId
