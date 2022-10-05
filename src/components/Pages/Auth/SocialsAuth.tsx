import React from 'react'

import BaseButton from 'components/ui/buttons/BaseButton'

import Twitter from 'assets/icons/solid/brands/Twitter.svg?inline'
import Google from 'assets/icons/solid/brands/Google.svg?inline'

const SocialsAuth: React.FC<{ signUp?: boolean }> = ({ signUp = false }) => {
  return (
    <div className="grid grid-cols-2 mt-4">
      <div className="mt-2 flex items-center">
        <div>
          <p>{signUp ? 'Sign in' : 'Login'} with Socials</p>
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <div className="mx-2">
          <BaseButton
            type="secondary"
            spanProps={{
              className: 'items-center secondary_button_label',
            }}
            className="px-6 w-min highlight_shadow">
            <Twitter height={24} className="secondary_button_icon" style={{ marginTop: '-4px' }} />
          </BaseButton>
        </div>
        <div className="mx-2 mr-0">
          <BaseButton
            type="secondary"
            spanProps={{
              className: 'items-center secondary_button_label',
            }}
            className="px-6 w-min highlight_shadow">
            <Google height={24} className="secondary_button_icon" style={{ marginTop: '-4px' }} />
          </BaseButton>
        </div>
      </div>
    </div>
  )
}

export default SocialsAuth
