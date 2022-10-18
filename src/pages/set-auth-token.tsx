import AuthActions from 'actions/auth.actions'
import { useAppDispatch } from 'hooks/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SetToken = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof router.query.token === 'string') {
      localStorage.setItem('token', router.query.token)
      dispatch(AuthActions.fetchStart())

      router.push('/profile')
    } else {
      router.push('/auth/login')
    }
  })

  return <>Loading...</>
}

export default SetToken
