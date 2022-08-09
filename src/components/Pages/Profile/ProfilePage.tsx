import Vertical from '../../ui/Separator/Vertical'
import InvestmentOverview from '../../ui/Investment/InvestmentOverview'
import ProjectsSlider from '../../ui/Slider/ProjectsSlider'
import ProfileCover from './ProfileCover'
import VerifyAccount from './VerifyAccount'
import AccountLinks from './AccountLinks'
import Planets from 'assets/animations/planet.svg?inline'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { USER } from '../../../api/gql/querries'
import { isSameAddress } from '../../../utils'

const ProfilePage = () => {
  const router = useRouter()
  const { uid } = router.query
  const { account } = useStarknetReact()
  const { data } = useQuery(USER, {
    variables: {
      address: uid ?? account?.address,
    },
  })
  const user = data?.getAccount
  const isSelf = isSameAddress(account?.address, user?.address)

  return (
    <>
      <div className="ProfilePage g-container mb-10">
        <div className="page-title mb-14">Profile {JSON.stringify(isSelf)}</div>
        <Planets className={'lightning_svg absolute right-40 top-20 -z-10'} />
        <div className="lg:flex gap-6 mb-10">
          <div className="w-full">
            <ProfileCover user={user} />
            {isSelf && <InvestmentOverview />}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-6 left-0">
              <Vertical />
            </div>
          </div>

          <div className={'mt-4 lg:mt-0 lg:w-1/3 flex-shrink-0'}>
            {isSelf && <VerifyAccount />}

            <AccountLinks user={user} />
          </div>
        </div>
      </div>
      <div className="g-container">
        <div className="font-heading uppercase mb-6 text-primaryClear text-24">
          INVESTED PROJECTS
        </div>
      </div>

      <ProjectsSlider />
      <div className="h-20"></div>
    </>
  )
}

export default ProfilePage
