import React from 'react'

import BaseButton from 'components/ui/buttons/BaseButton'

import Twitter from 'assets/icons/solid/brands/Twitter.svg?inline'
import Google from 'assets/icons/solid/brands/Google.svg?inline'
import getConfig from 'next/config'

const SocialsAuth: React.FC<{ signUp?: boolean }> = ({ signUp = false }) => {
  const { publicRuntimeConfig } = getConfig()
  return (
    <div className="grid grid-cols-2 mt-4">
      <div className="mt-2 flex items-center">
        <div>
          <p>{signUp ? 'Sign in' : 'Login'} with Socials</p>
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <a className="mx-2" href={`${publicRuntimeConfig.NEXT_PUBLIC_REST_API_URL}/auth/twitter`}>
          <BaseButton
            type="secondary"
            spanProps={{
              className: 'items-center',
            }}
            className="px-6 w-min highlight_shadow">
            <Twitter height={24} className="secondary_button_icon twitter_fill" />
          </BaseButton>
        </a>
        <a
          className="mx-2 mr-0"
          href={`${publicRuntimeConfig.NEXT_PUBLIC_REST_API_URL}/auth/google`}>
          <BaseButton
            type="secondary"
            spanProps={{
              className: 'items-center',
            }}
            className="px-6 w-min highlight_shadow">
            <Google height={24} className="secondary_button_icon google_fill" />
          </BaseButton>
        </a>
      </div>
    </div>
  )
}

export default SocialsAuth
