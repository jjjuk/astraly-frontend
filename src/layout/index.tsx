import Header from './header/index'
import { PropsWithChildren, useEffect } from 'react'
import ToastContainer from '../components/ui/Toast/ToastContainer'
import Heading from './header/Heading'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../hooks/hooks'
import UiActions from '../actions/ui.actions'
import { PAGES } from '../constants/ui.constants'
import Marquee from 'react-fast-marquee'
import Warning from 'assets/icons/currentColor/warning.svg?inline'
import FooterIndex from './footer/FooterIndex'
import Noise from 'assets/images/Noise.png'
import { useApi } from 'api'
import AuthActions from 'actions/auth.actions'

export default function Layout({ children }: PropsWithChildren<any>) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { getAccountDetails } = useApi()
  useEffect(() => {
    if (router.route === '/') {
      dispatch(UiActions.setPage(PAGES.HOME))
    } else if (router.route === '/launchpad') {
      dispatch(UiActions.setPage(PAGES.LAUNCHPAD))
    } else {
      dispatch(UiActions.setPage())
    }

    getAccountDetails()
      .then((user) => {
        if (user) {
          dispatch(AuthActions.fetchSuccess(user))
          // TODO: server to client wallet connection logic
        }
      })
      .catch(() => {
        dispatch(AuthActions.fetchFailed())
      })
  }, [router.route])
  return (
    <>
      <div className="default-layout flex flex-col min-h-full relative">
        <div
          className="noise absolute h-full w-full z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${Noise.src})`,
          }}></div>

        <div className="h-36" />
        <div className="w-full overflow-hidden">
          <Marquee
            style={{
              // background: 'rgba(20,20,20, 0.5)',
              width: '100vw',
              height: '28px',
              position: 'fixed',
              zIndex: 1001,
              top: 0,
              left: 0,
            }}
            speed={50}
            gradient={false}>
            <div className="text-primaryDark dark:text-white flex items-center text-14 transform translate-y-px">
              This application runs on <span className="underline px-1">Starknet</span> testnet,
              which is still in
              <span className="font-bold pl-1"> alpha</span>. Transactions can take longer than
              expected. Starkware is working on making it faster. Thank you for your patience.
              <Warning className={'text-yellow-400 ml-2 transform -translate-y-px'} />
            </div>
          </Marquee>
        </div>
        <ToastContainer />

        <div className="main-background">
          <div id="bg-shadow-1" className="bg_shadow" />
          <div id="bg-shadow-2" className="bg_shadow" />
          <div id="bg-shadow-3" className="bg_shadow" />
        </div>

        <Header />

        <Heading />

        <>{children}</>

        <div className="h-20"></div>
        <div className="mt-auto">
          <FooterIndex />
        </div>
      </div>
    </>
  )
}
