import { useEffect, useMemo, useState } from 'react'
import LockForm from './LockForm'
import Simulator from './Simulator'
import Withdraw from './Withdraw'
import ClaimPannel from './ClaimPannel'
import Vertical from '../../ui/Separator/Vertical'
import { useStakingContract } from 'contracts/staking'
import { useTokenContract } from 'contracts'
import { useStarknetReact } from '@web3-starknet-react/core'
import { Result, uint256 } from 'starknet'
import { ethers } from 'ethers'
import { Contracts } from 'constants/networks'

const LockPage = () => {
  const { account } = useStarknetReact()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [zkpBalance, setZkpBalance] = useState('0')
  const [lpBalance, setLPBalance] = useState('0')
  const [stakeInfo, setStakeInfo] = useState<Result>({} as Result)
  const [xzkpBalance, setXZkpBalance] = useState('0')
  const [previewXZKP, setPreviewXZKP] = useState('0')
  const [updatingPreview, setUpdatingPreview] = useState(false)
  const [zkpAmount, setZKPAmount] = useState('10.0')
  const [currentAPY, setCurrentAPY] = useState(0)
  const [zkpLPAmount, setZKPLPAmount] = useState('0')
  const { getZKPBalance, getXZKPBalance, getLPBalance } = useTokenContract()
  const { previewDeposit, getUserStakeInfo, previewDepositLP, getStakingAPY } = useStakingContract()

  const unlockRemainingTime = useMemo(
    () => new Date(stakeInfo?.unlock_time?.toNumber() * 1000).getTime() - new Date().getTime(),
    [stakeInfo]
  )

  const fetchAPYs = async () => {
    try {
      const apr = await getStakingAPY()
      const num_periods = 365 // Compound Daily
      console.log(apr)
      const apy = (1 + apr / num_periods) ** num_periods - 1
      console.log(apy)
      setCurrentAPY(apr)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchBalances = async () => {
    try {
      const _balance = await getZKPBalance(account?.address)
      const _formattedBalance = ethers.utils.formatUnits(
        uint256.uint256ToBN(_balance.balance).toString(),
        'ether'
      )
      setZkpBalance(_formattedBalance)

      const _lpBalance = await getLPBalance(account?.address, Contracts['SN_GOERLI'].lp_token)
      const _formattedLPBalance = ethers.utils.formatUnits(
        uint256.uint256ToBN(_lpBalance.balance).toString(),
        'ether'
      )
      setLPBalance(_formattedLPBalance)

      const _xbalance = await getXZKPBalance(account?.address)
      const _xformattedBalance = ethers.utils.formatUnits(
        uint256.uint256ToBN(_xbalance.balance).toString(),
        'ether'
      )
      setXZkpBalance(_xformattedBalance)

      // if (Number(_xformattedBalance) > 0) toggleScreen()
    } catch (e) {
      console.error(e)
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

  // const updatePreview = async () => {
  //   try {
  //     setUpdatingPreview(true)
  //     const _daysPassed = lockTime / (3600 * 24 * 1000)
  //     const _preview = await previewDeposit(zkpAmount, _daysPassed)
  //     const _formattedShares = ethers.utils.formatUnits(
  //       uint256.uint256ToBN(_preview.shares).toString(),
  //       'ether'
  //     )
  //     if (Number(zkpLPAmount) > 0) {
  //       const _previewLP = await previewDepositLP(
  //         Contracts['SN_GOERLI'].lp_token,
  //         zkpLPAmount,
  //         _daysPassed
  //       )
  //       const _formattedSharesLP = ethers.utils.formatUnits(
  //         uint256.uint256ToBN(_previewLP.shares).toString(),
  //         'ether'
  //       )
  //       const _sharesSum = Number(_formattedShares) + Number(_formattedSharesLP)
  //       setPreviewXZKP(_sharesSum.toString())
  //     } else {
  //       setPreviewXZKP(_formattedShares)
  //     }

  //     setUpdatingPreview(false)
  //   } catch (e) {
  //     console.error(e)
  //     setUpdatingPreview(false)
  //   }
  // }

  useEffect(() => {
    if (account?.address) {
      fetchBalances()
      fetchStakeInfo()
      fetchAPYs()
    }
  }, [account])

  // useEffect(() => {
  //   updatePreview()
  // }, [zkpAmount, zkpLPAmount, startDate])

  return (
    <div className="LockPage mb-10">
      <div className="g-container">
        <h1 className="page-title font-heading uppercase mb-16 text-primaryDark text-shadow">
          Lock $ZKP
        </h1>

        <div className="lg:flex gap-6">
          <div className={'w-full flex-grow'}>
            <div className="mb-10">
              <LockForm zkpBalance={zkpBalance} lpBalance={lpBalance} />
            </div>
            <div className="mb-10">
              <Simulator />
            </div>

            <Withdraw
              xzkpBalance={xzkpBalance}
              unlockRemainingTime={unlockRemainingTime}
              stakeInfo={stakeInfo}
            />
          </div>

          <div className={'hidden lg:block'}>
            <div className="sticky top-6 left-0">
              <Vertical />
            </div>
          </div>

          <div className={'mt-4 md:mt-0 lg:w-127 flex-shrink-0 '}>
            <ClaimPannel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockPage
