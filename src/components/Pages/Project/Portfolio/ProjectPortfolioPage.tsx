import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Project, ProjectType } from '../../../../interfaces'
import ProjectLayout from '../ProjectLayout'
import { useQuery } from '@apollo/client'
import { PROJECT } from '../../../../api/gql/querries'
import { useIDOContract } from 'contracts'
import BaseButton from 'components/ui/buttons/BaseButton'
import { SendIcon } from 'components/ui/Icons/Icons'
import { useTransactions } from 'context/TransactionsProvider'
import { useAppDispatch } from 'hooks/hooks'
import ToastActions from 'actions/toast.actions'
import { ToastState } from 'components/ui/Toast/utils'
import { uint256ToBN } from 'starknet/utils/uint256'
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts'
import { format } from 'date-fns'
import { useStarknetReact } from '@web3-starknet-react/core'
import { Result } from 'starknet'
import { formatUnits } from 'ethers/lib/utils'
import axios from 'axios'
import Spinner from '../../../ui/Spinner/Spinner'
import { useApi } from 'api'

const dateFormatter = (date: number) => {
  return format(new Date(date), 'dd/MMM')
}

const toPercent = (decimal: number) => `${decimal / 10}%`

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p className="text-12 font-heading text-black">{toPercent(payload[0].value)}</p>
        <p className="text-black">Released on {format(new Date(label), 'dd/MMM HH:mm')}</p>
      </div>
    )
  }

  return null
}

const ProjectPortfolioPage = () => {
  const router = useRouter()
  const { account } = useStarknetReact()
  const { pid } = router.query
  const [project, setProject] = useState<Project | undefined>(undefined)
  const { data } = useQuery(PROJECT, {
    variables: {
      idoId: pid,
    },
  })
  const {
    getNumberVestingPortions,
    getVestingPercent,
    withdrawTokens,
    getUserInfo,
    getVestingUnlockTime,
    claimNFTs,
    claimNFTs2,
  } = useIDOContract()
  const { addTransaction } = useTransactions()

  // const [selectedPortions, setSelectedPortions] = useState<number[]>([1])
  const [vestingPercents, setVestingPercents] = useState<number[]>([])
  const [unlockTimes, setUnlockTimes] = useState<Date[]>([])

  const [withdrawing, setWithdrawing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingNFTs, setLoadingNFTs] = useState(false)

  const [userInfo, setUserInfo] = useState<Result>({} as Result)

  const [userNFTs, setUserNFTs] = useState<any[]>([])

  const [roundTimer, setRoundTimer] = useState('...')

  const [nbQuestsCompleted, setNbQuestsCompleted] = useState(0)
  const [merkleProof, setMerkleProof] = useState<string[]>([])
  const { fetchProof, getNumberQuestsCompleted } = useApi()

  const currentPortion = useMemo(
    () =>
      unlockTimes.reduce(
        (prev, cur, curIndex) => (cur.getTime() <= new Date().getTime() ? curIndex + 1 : prev),
        0
      ),
    [unlockTimes]
  )

  const graphData = useMemo(() => {
    return [
      ...unlockTimes.map((_time, index) => {
        return {
          date: _time.getTime(),
          vestingPercent: vestingPercents[index],
        }
      }),
    ]
  }, [unlockTimes, vestingPercents])

  const dispatch = useAppDispatch()

  const updateVestingInfo = useCallback(async () => {
    if (!project) return
    try {
      setLoading(true)
      const _numberVestingPortions = await getNumberVestingPortions(project?.idoId.toString())

      const _percents: number[] = []
      const _unlockTimes: Date[] = []
      for (let index = 1; index <= _numberVestingPortions.res; index++) {
        const _percent = await getVestingPercent(project?.idoId.toString(), index)
        const _unlockTime = await getVestingUnlockTime(project?.idoId.toString(), index)
        const _prevPercent = index === 1 ? 0 : _percents[index - 2]
        _percents.push(Number(uint256ToBN(_percent.res)) + _prevPercent)
        _unlockTimes.push(new Date(Number(_unlockTime.res) * 1000))
      }
      // console.log(_percents, _unlockTimes)
      setVestingPercents(_percents)
      setUnlockTimes(_unlockTimes)

      setLoading(false)
    } catch (error) {
      console.error(error)
      dispatch(
        ToastActions.addToast({
          title: String(error),
          action: <div className="font-heading text-12 text-primary">Try again</div>,
          state: ToastState.ERROR,
          autoClose: true,
        })
      )
      setLoading(false)
    }
  }, [getNumberVestingPortions, getVestingPercent, getVestingUnlockTime, project])

  const updateUserInfo = useCallback(async () => {
    if (!project) return
    try {
      const _userInfo = await getUserInfo(account?.address, project?.idoId.toString(), project.type)
      setUserInfo(_userInfo)
    } catch (e) {
      console.error(e)
      dispatch(
        ToastActions.addToast({
          title: String(e),
          action: <div className="font-heading text-12 text-primary">Try again</div>,
          state: ToastState.ERROR,
          autoClose: true,
        })
      )
    }
  }, [getUserInfo, account, project])

  const loadUserNFTs = useCallback(async () => {
    if (!account || !project) return
    try {
      setLoadingNFTs(true)
      const _url = `https://api-testnet.aspect.co/api/v0/assets`
      const params = new URLSearchParams()
      params.append('contract_address', project.tokenAddress)
      params.append('owner_address', account.address)
      params.append('limit', '50')
      const { data } = await axios.get(_url, { headers: { Accept: 'application/json' }, params })
      setUserNFTs(data.assets.map((asset: any) => asset.animation_url_copy || asset.image_url_copy))
      setLoadingNFTs(false)
    } catch (error) {
      console.error(error)
      dispatch(
        ToastActions.addToast({
          title: String(error),
          action: <div className="font-heading text-12 text-primary">Try again</div>,
          state: ToastState.ERROR,
          autoClose: true,
        })
      )
      setLoadingNFTs(false)
    }
  }, [account, project])

  const handleWithdraw = async () => {
    if (!project) return
    try {
      setWithdrawing(true)
      const _portionIds = Array.from(
        { length: currentPortion - Number(userInfo.participation.last_portion_withdrawn) },
        (v: number, i) => i + Number(userInfo.participation.last_portion_withdrawn) + 1
      )
      // console.log(_portionIds)
      const tx = await withdrawTokens(project?.idoId.toString(), _portionIds)
      addTransaction(
        tx,
        'Withdraw Tokens',
        () => updateUserInfo(),
        () => undefined
      )
      setWithdrawing(false)
    } catch (error) {
      console.error(error)
      dispatch(
        ToastActions.addToast({
          title: String(error),
          action: <div className="font-heading text-12 text-primary">Try again</div>,
          state: ToastState.ERROR,
          autoClose: true,
        })
      )
      setWithdrawing(false)
    }
  }

  const handleClaimNFTs = async () => {
    if (!project) return
    try {
      setWithdrawing(true)
      // const tx = await claimNFTs(project?.idoId.toString())
      const tx = await claimNFTs2(account?.address, nbQuestsCompleted, merkleProof)
      addTransaction(
        tx,
        'Claim NFTs',
        () => updateUserInfo(),
        () => undefined
      )
      setWithdrawing(false)
    } catch (error) {
      console.error(error)
      dispatch(
        ToastActions.addToast({
          title: String(error),
          action: <div className="font-heading text-12 text-primary">Try again</div>,
          state: ToastState.ERROR,
          autoClose: true,
        })
      )
      setWithdrawing(false)
    }
  }

  useEffect(() => {
    data && setProject(data.project)
  }, [data])

  const fetchQuestsInfo = async () => {
    if (!project || !account?.address) return
    try {
      const nbQuestsCompleted = await getNumberQuestsCompleted(project.idoId.toString())
      setNbQuestsCompleted(nbQuestsCompleted)
      const proof = await fetchProof(project.idoId.toString())
      console.log('proof', proof, nbQuestsCompleted)
      setMerkleProof(proof)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (account?.address && project) {
      fetchQuestsInfo()
    }
  }, [account, project])

  useEffect(() => {
    if (project) {
      if (project.type === ProjectType.IDO) updateVestingInfo()
      if (project.type === ProjectType.INO) loadUserNFTs()
      updateUserInfo()
    }
  }, [project])

  useEffect(() => {
    if (unlockTimes.length === 0 || !unlockTimes[currentPortion]) return

    const _interval = setInterval(() => {
      const _remainingTime = unlockTimes[currentPortion].getTime() - new Date().getTime()
      const days = Math.floor(_remainingTime / (1000 * 60 * 60 * 24))
      const hours = Math.floor((_remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((_remainingTime % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((_remainingTime % (1000 * 60)) / 1000)
      setRoundTimer(`${days}d${hours}h${minutes}m${seconds}s`)
    }, 1000)

    return () => clearInterval(_interval)
  }, [unlockTimes, currentPortion])

  if (!project) {
    return <></>
  }

  return (
    <>
      <ProjectLayout project={project}>
        {project.type === ProjectType.IDO ? (
          <div className="block">
            <div className="block--contrast">
              {/* <div className="title--medium mb-6">Distribution Info</div> */}
              <div>
                {loading || graphData.length === 0 ? (
                  <Spinner />
                ) : (
                  <AreaChart
                    width={730}
                    height={250}
                    data={graphData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8F00FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8F00FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tickFormatter={dateFormatter} />
                    <YAxis tickFormatter={toPercent} />
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="vestingPercent"
                      stroke="#8F00FF"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                )}
              </div>
              <div className="title--medium mb-6 mt-6">Information</div>
              <div className="flex items-center justify-between text-16 mb-0.5">
                <div className="text-primaryClear">Currently released</div>
                <div className="font-heading text-primary">
                  {currentPortion > 0 ? toPercent(vestingPercents[currentPortion - 1]) : '0%'}
                </div>
              </div>
              <div className="flex items-center justify-between text-16 mb-0.5">
                <div className="text-primaryClear">Last withdrawn</div>
                <div className="font-heading text-primary">
                  {userInfo?.participation?.last_portion_withdrawn > 0
                    ? toPercent(vestingPercents[userInfo.participation.last_portion_withdrawn - 1])
                    : '0%'}
                </div>
              </div>
              <div className="flex items-center justify-between text-16 mb-0.5">
                <div className="text-primaryClear">Amount paid</div>
                <div className="font-heading text-primary">
                  {userInfo?.participation ? (
                    `${formatUnits(
                      uint256ToBN(userInfo.participation.amount_paid).toString(),
                      'ether'
                    )} ETH`
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-16 mb-0.5">
                <div className="text-primaryClear">Tokens bought</div>
                <div className="font-heading text-primary">
                  {userInfo?.participation ? (
                    `${uint256ToBN(userInfo.participation.amount_bought).toString()} $${
                      project.ticker
                    }`
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-16 mb-0.5">
                {currentPortion < unlockTimes.length && (
                  <>
                    <div className="text-primaryClear">Time until next release</div>
                    <div className="font-heading text-primary">{roundTimer}</div>{' '}
                  </>
                )}
              </div>
            </div>
            <div className="block__item">
              <BaseButton
                onClick={handleWithdraw}
                disabled={
                  withdrawing ||
                  currentPortion === 0 ||
                  (userInfo
                    ? !userInfo.has_participated ||
                      Number(uint256ToBN(userInfo.participation.amount_bought)) === 0 ||
                      Number(userInfo.participation.last_portion_withdrawn) === currentPortion
                    : true)
                }>
                <SendIcon className={'mr-2'} />
                {withdrawing ? <Spinner /> : 'Withdraw'}
              </BaseButton>
            </div>
          </div>
        ) : (
          <>
            <div className="block mb-5">
              {/* <div className="block--contrast">
                <div className="title--medium mb-6">Claim information</div>
                <div className="flex items-center gap-[100px]">
                  <div className="flex flex-col">
                    <div className="text-primaryClear">Total NFTs Minted</div>
                    <div className="font-heading text-primary">
                      {userInfo?.participation ? (
                        `${uint256ToBN(userInfo.participation.amount_bought).toString()}`
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-primaryClear">Total Invested</div>
                    <div className="font-heading text-primary">
                      {userInfo?.participation ? (
                        `${formatUnits(
                          uint256ToBN(userInfo.participation.amount_paid).toString(),
                          'ether'
                        )} ETH`
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="block__item">
                <BaseButton
                  onClick={handleClaimNFTs}
                  disabled={
                    userNFTs?.length > 0 || withdrawing
                    // (userInfo
                    //   ? !userInfo.has_participated ||
                    //     Number(uint256ToBN(userInfo.participation.amount_bought)) === 0
                    //   : true)
                  }>
                  <SendIcon className={'mr-2'} />
                  {withdrawing ? <Spinner /> : 'Claim NFTs'}
                </BaseButton>
              </div>
            </div>

            <div className="block">
              <div className="block--contrast">
                {loadingNFTs ? (
                  <Spinner />
                ) : (
                  <div className="flex">
                    {userNFTs.map((_uri, index) => (
                      <div className="block w-50" key={index}>
                        {_uri?.includes('animation') ? (
                          // eslint-disable-next-line jsx-a11y/media-has-caption
                          <video controls autoPlay loop className="rounded-3xl">
                            <source src={_uri} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={_uri} alt={`minted nft ${index}`} className="rounded-3xl" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </ProjectLayout>
    </>
  )
}

export default ProjectPortfolioPage
