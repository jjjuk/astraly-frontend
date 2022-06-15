import { useStarknetReact } from '@web3-starknet-react/core'
import type { NextPage } from 'next'
import { useEffect } from 'react'

import Home from './home'
import { useAppDispatch } from '../hooks/hooks'
import { PAGES } from '../constants/ui.constants'
import UiActions from '../actions/ui.actions'

const Astraly: NextPage = () => {
  const { account } = useStarknetReact()
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(account)
  }, [account])

  useEffect(() => {
    dispatch(UiActions.setPage(PAGES.HOME))
  }, [])

  return <Home />
}

export default Astraly
