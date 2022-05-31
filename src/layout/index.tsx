import Header from './header/index'
import Footer from './footer'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div className="default-layout flex flex-col min-h-full">
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
