import BaseButton from 'components/ui/buttons/BaseButton'
import { useStakingContract } from '../../../contracts/staking'
import UploadIcon from 'assets/icons/outline/Upload.svg'
import { PropsWithChildren } from 'react'
import Star from 'assets/images/star--current.svg?inline'
import { useAppDispatch } from '../../../hooks/hooks'
import ToastActions from '../../../actions/toast.actions'
import { SendIcon } from '../../ui/Icons/Icons'
import Hint from '../../ui/Hint/Hint'

const ClaimPannel = ({ hideHarvest }: { hideHarvest?: boolean }) => {
  const availableZKP = 135
  const { harvestRewards } = useStakingContract()
  const steps = ['Buy zkp tokens', 'Stake ZKP tokens', 'Claim lottery tickets', 'Invest in IDOs']
  const dispatch = useAppDispatch()

  const Step = ({ children, index }: PropsWithChildren<{ index: number }>) => {
    return (
      <div className="text-primaryClear text-16">
        <div className="">Step {index + 1}</div>
        <div className="font-bold">{children}</div>
      </div>
    )
  }

  const claim = () => {
    dispatch(
      ToastActions.addToast({
        title: 'Claim made',
        action: <div className="font-heading text-12 text-primary">View on explorer</div>,
      })
    )
  }

  return (
    <div className="ClaimPannel sticky top-6 left-0">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="block block__item text-primaryClear">
          <div className="flex">
            <div className="font-heading text-16 mb-6">How it works?</div>
            <Hint>
              <div className="font-bold">
                Mauris elit metus, rutrum eu malesuada ac, interdum a ex. Suspendisse quis
                ullamcorper nibh, sit amet cursus arcu. Duis faucibus risus nec rhoncus varius.
              </div>
            </Hint>
          </div>

          <p>
            Owning ZKP tokens or ZKP-LP is requirement in order to participate in IDOs on ZkPad.
            <br />
            <br />
            You can lock your tokens and receive lottery tickets to invest in the listed projects.
          </p>
        </div>
        <div className="block block--contrast">
          {steps.map((step, index) => (
            <div key={index}>
              <Step index={index}>{step}</Step>
              {index !== steps.length - 1 && (
                <Star alt={''} className="inline-block my- text-whitePurple" />
              )}
            </div>
          ))}
        </div>
      </div>

      {!hideHarvest && (
        <div className="harvest block">
          <div className="block--contrast">
            <div className="title--medium mb-1">Harvest rewards</div>
            <div className="flex items-center">
              <div className="text-16 text-primaryClear transform translate-y-px">
                $ZKP Available
              </div>
              <div className="font-heading text-16 ml-6 text-primary">{availableZKP}</div>
            </div>
          </div>
          <div className="block__item">
            <BaseButton onClick={claim}>
              <SendIcon className={'mr-2'} />
              Claim {availableZKP} ZKP
            </BaseButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClaimPannel
