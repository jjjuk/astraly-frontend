import Header from './header/index'
import Footer from './footer'
import { PropsWithChildren, useEffect } from 'react'
import ToastContainer from '../components/ui/Toast/ToastContainer'
import Heading from './header/Heading'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../hooks/hooks'
import UiActions from '../actions/ui.actions'
import { PAGES } from '../constants/ui.constants'

export default function Layout({ children }: PropsWithChildren<any>) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (router.route === '/') {
      dispatch(UiActions.setPage(PAGES.HOME))
    } else if (router.route === '/launchpad') {
      dispatch(UiActions.setPage(PAGES.LAUNCHPAD))
    } else {
      dispatch(UiActions.setPage())
    }
  }, [router.route])
  return (
    <>
      <div className="default-layout flex flex-col min-h-full">
        <ToastContainer />

        <div className="main-background"></div>

        <Header />

        <Heading />

        <>{children}</>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}
