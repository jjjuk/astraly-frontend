import BaseButton from 'components/ui/buttons/BaseButton'
import UploadIcon from 'assets/icons/outline/Upload.svg'
import { PropsWithChildren, useEffect, useState } from 'react'
import Star from 'assets/images/star--current.svg?inline'
import { useAppDispatch } from '../../../hooks/hooks'
import ToastActions from '../../../actions/toast.actions'
import { SendIcon } from '../../ui/Icons/Icons'
import Hint from '../../ui/Hint/Hint'
import { useStarknetReact } from '@web3-starknet-react/core'
import { uint256 } from 'starknet'
import { ethers } from 'ethers'
import { useTransactions } from 'context/TransactionsProvider'
import { useStakingContract } from 'contracts'

const ClaimPannel = ({ hideHarvest }: { hideHarvest?: boolean }) => {
  const { account } = useStarknetReact()
  const { harvestRewards, getPendingRewards } = useStakingContract()
  const steps = ['Buy astr tokens', 'Stake ASTR tokens', 'Claim lottery tickets', 'Invest in IDOs']
  const dispatch = useAppDispatch()

  const [harvesting, setHarvesting] = useState(false)
  const [pendingRewards, setPendingRewards] = useState('0')

  const { addTransaction } = useTransactions()

  const Step = ({ children, index }: PropsWithChildren<{ index: number }>) => {
    return (
      <div className="text-primaryClear text-16">
        <div className="">Step {index + 1}</div>
        <div className="font-bold">{children}</div>
      </div>
    )
  }

  const handleHarvest = async () => {
    if (!account?.address) return

    try {
      setHarvesting(true)
      const tx = await harvestRewards()
      addTransaction(
        tx,
        'Harvest Rewards',
        () => updateRewards(),
        () => {}
      )
      setHarvesting(false)
    } catch (e) {
      console.error(e)
      setHarvesting(false)
    }
  }

  const updateRewards = async () => {
    try {
      const _rewards = await getPendingRewards(account?.address)
      const _formattedRewards = ethers.utils.formatUnits(
        uint256.uint256ToBN(_rewards.rewards).toString(),
        'ether'
      )
      setPendingRewards(_formattedRewards)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (account?.address) {
      updateRewards()
    }
  }, [account])

  return (
    <div className="ClaimPannel sticky top-6 left-0">
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mb-6">
        <div className="block block__item text-primaryClear">
          <div className="flex">
            <div className="font-heading text-16 mb-6">How it works?</div>
            <div className="ml-2">
              <Hint>
                <div className="font-bold w-[260px] px-2 py-2">
                  You can only get $ASTR or ASTR-LP from AlphaRoad for now
                </div>
              </Hint>
            </div>
          </div>

          <p>
            Owning ASTR tokens or ASTR-LP is requirement in order to participate in IDOs on Astraly.
            <br />
            <br />
            You can lock your tokens and receive lottery tickets to invest in the listed projects.
          </p>
        </div>
        <div className="block block--contrast">
          {steps.map((step, index) => (
            <div key={index}>
              <Step index={index}>{step}</Step>
              {index !== steps.length - 1 && <Star className="inline-block my- text-whitePurple" />}
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
                $ASTR Available
              </div>
              <div className="font-heading text-16 ml-6 text-primary">
                {Number(pendingRewards).toFixed(3)}
              </div>
            </div>
          </div>
          <div className="block__item">
            <BaseButton onClick={handleHarvest} disabled={harvesting} small>
              <SendIcon className={'mr-2'} />
              Claim {Number(pendingRewards).toFixed(3)} ASTR
            </BaseButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClaimPannel
