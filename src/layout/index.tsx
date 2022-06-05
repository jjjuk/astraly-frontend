import Header from './header/index'
import Footer from './footer'
import { PropsWithChildren } from 'react'
import ToastContainer from '../components/ui/Toast/ToastContainer'

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <>
      <div className="default-layout flex flex-col min-h-full">
        <ToastContainer />

        <div className="main-background"></div>

        <Header />

        <>{children}</>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}
