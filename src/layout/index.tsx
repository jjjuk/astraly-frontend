import Header from './header/index'
import Footer from './footer'
import { PropsWithChildren, useEffect } from 'react'
import ToastContainer from '../components/ui/Toast/ToastContainer'
import Heading from './header/Heading'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../hooks/hooks'
import UiActions from '../actions/ui.actions'
import { PAGES } from '../constants/ui.constants'
import Marquee from 'react-fast-marquee'
import Warning from 'assets/icons/currentColor/warning.svg?inline'

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
        <div className="w-full overflow-hidden">
          <Marquee
            style={{
              background: 'black',
              width: '100vw',
              height: '28px',
            }}
            speed={50}
            gradient={false}>
            <div className="text-white flex items-center text-14 transform translate-y-px">
              This application runs on <span className="underline px-1">Starknet</span> testnet,
              which is still in
              <span className="font-bold pl-1"> alpha</span>. Transactions can take longer than
              expected. Starkware is working on making it faster. Thank you for your patience.
              <Warning className={'text-yellow-400 ml-2 transform -translate-y-px'} />
            </div>
          </Marquee>
        </div>
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
