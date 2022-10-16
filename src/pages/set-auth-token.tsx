import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SetToken = () => {
  const router = useRouter()

  useEffect(() => {
    if (router) {
      typeof router.query.token === 'string' && localStorage.setItem('token', router.query.token)
      router.push('/profile')
    }
  })

  return <>Loading...</>
}

export default SetToken
