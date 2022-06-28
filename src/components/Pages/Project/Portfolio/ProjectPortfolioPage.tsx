import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Project } from '../../../../interfaces'
import ProjectLayout from '../ProjectLayout'
import InvestmentOverview from '../../../ui/Investment/InvestmentOverview'
import { useQuery } from '@apollo/client'
import { PROJECT } from '../../../../api/gql/querries'
import { useIDOContract } from 'contracts'
import BaseButton from 'components/ui/buttons/BaseButton'
import { SendIcon } from 'components/ui/Icons/Icons'
import { useTransactions } from 'context/TransactionsProvider'
import { useAppDispatch } from 'hooks/hooks'
import ToastActions from 'actions/toast.actions'
import { ToastState } from 'components/ui/Toast/utils'
import { Spinner } from '@chakra-ui/react'
import { uint256ToBN } from 'starknet/utils/uint256'
import { Area, AreaChart, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts'
import { add, differenceInCalendarDays, format } from 'date-fns'
import { useStarknetReact } from '@web3-starknet-react/core'
import { Result } from 'starknet'
import { formatUnits } from 'ethers/lib/utils'

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
  } = useIDOContract()
  const { addTransaction } = useTransactions()

  // const [selectedPortions, setSelectedPortions] = useState<number[]>([1])
  const [vestingPercents, setVestingPercents] = useState<number[]>([])
  const [unlockTimes, setUnlockTimes] = useState<Date[]>([])

  const [withdrawing, setWithdrawing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [userInfo, setUserInfo] = useState<Result>({} as Result)

  const [roundTimer, setRoundTimer] = useState('...')

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
      console.log(_percents, _unlockTimes)
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
  }, [getNumberVestingPortions, getVestingPercent, getVestingUnlockTime])

  const updateUserInfo = useCallback(async () => {
    try {
      const _userInfo = await getUserInfo(account?.address, project?.idoId.toString())
      setUserInfo(_userInfo)
    } catch (e) {
      console.error(e)
    }
  }, [getUserInfo])

  const handleWithdraw = async () => {
    try {
      setWithdrawing(true)
      const tx = await withdrawTokens(
        project?.idoId.toString(),
        Array.from({ length: currentPortion }, (v, i) => i + 1)
      )
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

  useEffect(() => {
    data && setProject(data.project)
  }, [data])

  useEffect(() => {
    if (project) {
      updateVestingInfo()
      updateUserInfo()
    }
  }, [project])

  useEffect(() => {
    if (unlockTimes.length === 0) return

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
        <div className="block">
          <div className="block--contrast">
            {/* <div className="title--medium mb-6">Distribution Info</div> */}
            <div>
              {loading || graphData.length === 0 ? (
                <Spinner color="#8F00FF" />
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
              <div className="text-primaryClear">Time until next release</div>
              <div className="font-heading text-primary">{roundTimer}</div>
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
                    userInfo.participation.last_portion_withdrawn === currentPortion
                  : true)
              }>
              <SendIcon className={'mr-2'} />
              {withdrawing ? <Spinner /> : 'Withdraw'}
            </BaseButton>
          </div>
        </div>
      </ProjectLayout>
    </>
  )
}

export default ProjectPortfolioPage
