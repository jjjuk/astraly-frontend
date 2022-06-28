import QuestForm from '../../../components/Admin/QuestForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Quest } from '../../../interfaces'
import { useQuery } from '@apollo/client'
import { IS_ADMIN } from '../../../api/gql/querries'

const newQuest = () => {
  const router = useRouter()
  const { projectIdo } = router.query
  const [quest, setQuest] = useState({} as Quest)

  const { error } = useQuery(IS_ADMIN)
  if (error) {
    router.replace('/404')
    return <></>
  }

  useEffect(() => {
    setQuest({
      ...quest,
      idoId: Number(projectIdo),
    })
  }, [projectIdo])
  return (
    <div className="new">
      <QuestForm quest={quest} />
    </div>
  )
}

export default newQuest
