import BaseInput from '../../components/ui/inputs/BaseInput'
import BaseButton from '../../components/ui/buttons/BaseButton'
import { ForwardIcon } from '../../components/ui/Icons/Icons'
import ForwardSolid from 'assets/icons/currentColor/Forward.svg?inline'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { NEWSLETTER } from '../../api/gql/mutations'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

const FooterCTA = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [saveMutation] = useMutation(NEWSLETTER)

  const onSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
  }

  const submit = async () => {
    try {
      await saveMutation({
        variables: {
          email,
        },
      })
      setHasSubmitted(true)
    } catch (e) {
      setHasSubmitted(false)
    }
    setIsSubmitting(false)
  }

  useEffect(() => {
    if (isSubmitting) {
      submit()
    }
  }, [isSubmitting])
  return (
    <div className="-mt-20 flex justify-center">
      <div className="FooterCTA bg-primaryClearBg dark:bg-gray3 block-no-bg col-span-3 py-6 px-8 max-w-[800px] w-full">
        <div className="title font-heading ui-t-primary text-center text-24 h-[60px] flex items-center justify-center mb-4">
          <ForwardSolid className="mr-2 w-9 h-9 hidden md:inline-block" viewBox="0 0 25 24" />
          Get alerts for new sales!
        </div>
        {!hasSubmitted && (
          <form onSubmit={onSubmit} className="flex w-full gap-4 flex-col md:flex-row">
            <div className="flex-grow">
              <BaseInput
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder={'satoshi@astraly.xyz'}
              />
            </div>
            <div className="relative z-10">
              <BaseButton onClick={onSubmit} className="px-16 transform -translate-y-1">
                <ForwardIcon className={'mr-1'} />
                <ButtonTitle title="Subscribe" />
              </BaseButton>
            </div>
          </form>
        )}
        {hasSubmitted && (
          <div className="text-center text-18 font-bold">
            You will now receive alerts when there is new project available!
          </div>
        )}
      </div>
    </div>
  )
}

export default FooterCTA
