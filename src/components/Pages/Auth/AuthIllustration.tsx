import Illustration from 'assets/images/illustration-auth.svg?inline'
import IllustrationDark from 'assets/images/illustration-auth--dark.svg?inline'

import Coin from 'assets/animations/auth-coin.gif'
import { FC } from 'react'

const AuthIllustration: FC<{ nocoin?: boolean }> = ({ nocoin }) => (
  <div className="ui-page-block relative -z-50 auth">
    <div
      style={{
        position: 'relative',
        height: '625px',
        overflow: 'hidden',
      }}>
      <Illustration
        className="invisible lg:visible dark:hidden"
        style={{
          position: 'absolute',
          marginTop: '-60px',
          right: 'calc(((100vw / 4.98) - 347px) - ((1728px - 100vw) / 4.98))',
        }}
      />
      <IllustrationDark
        className="invisible lg:visible hidden dark:block"
        style={{
          position: 'absolute',
          marginTop: '-60px',
          right: 'calc(((100vw / 4.98) - 347px) - ((1728px - 100vw) / 4.98))',
        }}
      />
    </div>
    {!nocoin && (
      <img
        className="hidden lg:block"
        src={Coin.src}
        alt="Coin"
        style={{
          zIndex: 1,
          position: 'absolute',
          top: '57px',
          right: 'calc((100vw / 4.98) - ((1728px - 100vw) / 4.98))',
          height: '472px',
        }}
      />
    )}
  </div>
)

export default AuthIllustration
