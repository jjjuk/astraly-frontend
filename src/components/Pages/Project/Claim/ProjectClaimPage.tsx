import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Project } from '../../../../interfaces'
import { projects } from '../../../../utils/data'
import ProjectLayout from '../ProjectLayout'
import AllocationInfo from '../Main/AllocationInfo'
import BaseButton from '../../../ui/buttons/BaseButton'
import UploadIcon from 'assets/icons/outline/Upload.svg'
import Unlock from 'assets/icons/outline/Unlock--current.svg?inline'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/reduxStore'
import { useTokenContract, useLotteryTokenContract } from 'contracts'
import { ethers } from 'ethers'
import { uint256 } from 'starknet'
import { Spinner } from '@chakra-ui/react'
import { LockIcon, SendIcon } from '../../../ui/Icons/Icons'
import Link from 'next/link'
import { useTransactions } from 'context/TransactionsProvider'

const ProjectClaimPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const { account } = useStarknetReact()
  const [ticketsBalance, setTicketsBalance] = useState(null)
  const [xzkpBalance, setXZkpBalance] = useState('0')
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [claiming, setClaiming] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasClaimed, setHasClaimed] = useState(false)

  const { getXZKPBalance } = useTokenContract()
  const { claimLotteryTickets, getTicketsBalance } = useLotteryTokenContract()

  const { addTransaction } = useTransactions()

  useEffect(() => {
    setProject(projects.find((p) => p.id === Number(pid)))
  }, [pid])

  const handleClaimTickets = async () => {
    try {
      setClaiming(true)
      const tx = await claimLotteryTickets(project?.id.toString())
      addTransaction(
        tx,
        'Claim Tickets',
        () => fetchBalances(),
        () => {}
      )
      setClaiming(false)
    } catch (e) {
      console.error(e)
      setClaiming(false)
    }
  }

  const fetchBalances = async () => {
    try {
      setLoading(true)
      const _xbalance = await getXZKPBalance(account?.address)
      const _xformattedBalance = ethers.utils.formatUnits(
        uint256.uint256ToBN(_xbalance.balance).toString(),
        'ether'
      )
      setXZkpBalance(_xformattedBalance)

      const _ticketsBalance = await getTicketsBalance(account?.address, project?.id.toString())
      setTicketsBalance(uint256.uint256ToBN(_ticketsBalance.balance).toString())

      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (account?.address) {
      fetchBalances()
    }
  }, [account])

  if (!project) {
    return <></>
  }

  return (
    <>
      <ProjectLayout project={project}>
        <div className="block mb-4">
          <div className="block--contrast">
            <div className="title--medium mb-1">Total Claimable Tickets</div>
            <div className="title--small mb-5">YOU CAN ONLY CLAIM TICKETS ONCE PER IDO!</div>
            <div className="flex items-center">
              {/* TODO: CHANGE THIS TO CHECK WITH API */}
              {loading ? (
                <Spinner />
              ) : Number(ticketsBalance) > 0 ? (
                <div className="text-primaryClear font-bold transform translate-y-px">
                  Tickets already claimed
                </div>
              ) : (
                <>
                  <div className="text-primaryClear font-bold transform translate-y-px">
                    Available
                  </div>
                  <div className="font-heading text-primary ml-6">
                    {Math.floor(Math.pow(Number(xzkpBalance), 0.6))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="block__item">
            <div className="flex flex-col md:flex-row gap-4">
              <BaseButton
                className="w-full"
                onClick={handleClaimTickets}
                disabled={claiming || Number(ticketsBalance) > 0}>
                <SendIcon className={'mr-2'} />
                {claiming ? <Spinner /> : 'Claim Tickets'}
              </BaseButton>
              <Link href="/stake">
                <BaseButton className="xl:col-span-1 whitespace-nowrap px-5">
                  <LockIcon className={'mr-2'} />
                  Lock more $ASTR
                </BaseButton>
              </Link>
            </div>
          </div>
        </div>
        <AllocationInfo />
      </ProjectLayout>
    </>
  )
}

export default ProjectClaimPage
