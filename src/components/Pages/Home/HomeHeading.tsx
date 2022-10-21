import React, { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Link from 'next/link'
import BaseButton from 'components/ui/buttons/BaseButton'

// import Wallet from 'assets/icons/outline/Wallet.svg?inline'
import Chevron from 'assets/icons/Chevron.svg?inline'
import StarkNetLogo from 'assets/images/Starknet-logo-dark1.svg'
import StarkNetLogoDark from 'assets/images/Starknet-logo-white.svg'
import Planets from 'assets/animations/planet.svg?inline'
import PlanetsDark from 'assets/animations/planet-dark.svg?inline'
// import Line from 'assets/images/bg-line.svg'
import ShoppingCart from 'assets/icons/currentColor/Shopping-cart.svg?inline'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'
import AuthIllustration from '../Auth/AuthIllustration'

const HomeHeading = () => {
  const TitleSpans = ['Curated', 'Excellent', 'Audited']
  const [currentTitle, setCurrentTitle] = useState(TitleSpans[0])

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      const index = TitleSpans.indexOf(currentTitle)
      const title = index === TitleSpans.length - 1 ? TitleSpans[0] : TitleSpans[index + 1]

      setCurrentTitle(title)
    }, 3000)
    return () => {
      clearTimeout(timeoutHandler)
    }
  }, [currentTitle])

  return (
    <div className="HomeHeading">
      {/* <div className="bg-line"></div> */}
      <AuthIllustration nocoin />
      <div className="g-container">
        <div className="flex items-end">
          <div>
            <h1
              className={
                'page-title ui-t-dark font-heading uppercase text-shadow leading-131 mb-2'
              }>
              Invest in&nbsp;
              <TransitionGroup className="itext-primary text-shadow inline relative">
                <CSSTransition key={currentTitle} timeout={300} classNames="home-title__animation">
                  <span className={'text-primary text-shadow inline-block'}>{currentTitle}</span>
                </CSSTransition>
              </TransitionGroup>
              <br />
              StarkNet projects.
            </h1>
            <p className={'medium-text max-w-558px mb-12 ui-t-primaryClear'}>
              <strong>Buy</strong> ASTR tokens, <strong>stake</strong> them and receive lottery
              tickets to <strong>invest</strong> in the listed projects.
            </p>
            <div className="md:flex buttons">
              <Link href={'/buy'}>
                <BaseButton className={'px-3 lg:px-12 group'} medium={true}>
                  <ShoppingCart className={'mr-3'} />
                  <ButtonTitle title="Buy $ASTR" />
                  <Chevron className={'ml-3 icon-right'} />
                </BaseButton>
              </Link>

              <div className="flex items-center mt-6 justify-center md:mt-0 md:justify-start md:ml-12">
                <div className="text-16 ui-t-primaryClear leading-138 pt-0.5">Powered by</div>
                <img src={StarkNetLogo} alt={'StarkNet Logo'} className={'ml-2 dark:hidden'} />
                <img
                  src={StarkNetLogoDark}
                  alt={'StarkNet Logo'}
                  className={'ml-2 hidden dark:inline-block'}
                />
              </div>
            </div>
          </div>

          <div className="planets ml-auto hidden lg:block">
            <Planets className="dark:hidden" />
            <PlanetsDark className="hidden dark:inline-block" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHeading
