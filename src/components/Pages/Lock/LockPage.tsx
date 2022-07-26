import { useEffect, useMemo, useState } from 'react'
import LockForm from './LockForm'
import Withdraw from './Withdraw'
import ClaimPannel from './ClaimPannel'
import Vertical from '../../ui/Separator/Vertical'
import { useStakingContract } from 'contracts'
import { useStarknetReact } from '@web3-starknet-react/core'
import { Result } from 'starknet'
import { Contracts } from 'constants/networks'
import { useWallet } from 'context/WalletProvider'

const LockPage = () => {
  const { account } = useStarknetReact()
  // User Balances
  const [zkpBalance, setZkpBalance] = useState('0')
  const [lpBalance, setLPBalance] = useState('0')
  const [xzkpBalance, setXZkpBalance] = useState('0')

  const { balances, deposits, updateUserData } = useWallet()

  // Stake Info
  const [stakeInfo, setStakeInfo] = useState<Result>({} as Result)
  const [lpStaked, setLPStaked] = useState<string | null>(null)
  const [zkpStaked, setZKPStaked] = useState<string | null>(null)

  const [currentAPY, setCurrentAPY] = useState(0)

  const { getUserStakeInfo, getStakingAPY } = useStakingContract()

  const unlockRemainingTime = useMemo(
    () => new Date(stakeInfo?.unlock_time?.toNumber() * 1000).getTime() - new Date().getTime(),
    [stakeInfo]
  )

  const fetchAPYs = async () => {
    try {
      const apr = await getStakingAPY()
      const num_periods = 365 // Compound Daily
      // console.log(apr)
      const apy = (1 + apr / num_periods) ** num_periods - 1
      // console.log(apy)
      setCurrentAPY(apr)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchStakeInfo = async () => {
    try {
      const _stakeInfo = await getUserStakeInfo(account?.address)
      // console.log(_stakeInfo);
      setStakeInfo(_stakeInfo)
    } catch (e) {
      console.error(e)
    }
  }

  const updateAll = () => {
    updateUserData()
    fetchStakeInfo()
    fetchAPYs()
  }

  useEffect(() => {
    if (account?.address) {
      fetchStakeInfo()
      fetchAPYs()
    }
  }, [account])

  useEffect(() => {
    setZkpBalance(balances[Contracts['SN_GOERLI'].token]?.normalized)
    setXZkpBalance(balances[Contracts['SN_GOERLI'].staking]?.normalized)
    setLPBalance(balances[Contracts['SN_GOERLI'].lp_token]?.normalized)
  }, [balances])

  useEffect(() => {
    setZKPStaked(deposits[Contracts['SN_GOERLI'].token]?.normalized)
    setLPStaked(deposits[Contracts['SN_GOERLI'].lp_token]?.normalized)
  }, [deposits])

  return (
    <div className="LockPage mb-10">
      <div className="g-container">
        <h1 className="page-title font-heading uppercase mb-8 lg:mb-8 text-primaryDark text-shadow">
          Lock $ASTR
        </h1>

        <div className="lg:flex gap-6">
          <div className={'w-full flex-grow'}>
            <div className="mb-10">
              <LockForm
                zkpBalance={zkpBalance}
                lpBalance={lpBalance}
                xzkpBalance={xzkpBalance}
                currentAPY={currentAPY}
                unlockRemainingTime={unlockRemainingTime}
                onSuccess={updateAll}
              />
            </div>
            {/* <div className="mb-10">
              <Simulator currentAPY={currentAPY} zkpBalance={zkpBalance} />
            </div> */}

            <Withdraw
              xzkpBalance={xzkpBalance}
              unlockRemainingTime={unlockRemainingTime}
              stakeInfo={stakeInfo}
              lpStaked={lpStaked}
              zkpStaked={zkpStaked}
              onSuccess={updateAll}
            />
          </div>

          <div className={'hidden lg:block'}>
            <div className="sticky top-6 left-0">
              <Vertical />
            </div>
          </div>

          <div className={'mt-4 md:mt-0 w-full lg:w-1/4 2xl:w-127 flex-shrink-0 '}>
            <ClaimPannel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockPage
