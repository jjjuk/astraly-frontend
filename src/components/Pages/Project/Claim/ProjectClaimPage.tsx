import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
import { useTokenContract } from 'contracts'
import { useLotteryTokenContract } from 'contracts/lottery'
import { ethers } from 'ethers'
import { uint256 } from 'starknet'
import { Spinner } from '@chakra-ui/react'

const ProjectClaimPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const { account } = useStarknetReact()
  const [xzkpBalance, setXZkpBalance] = useState('0')
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [claiming, setClaiming] = useState(false)
  const [loading, setLoading] = useState(false)

  const { getXZKPBalance } = useTokenContract()
  const { claimLotteryTickets } = useLotteryTokenContract()

  useEffect(() => {
    setProject(projects.find((p) => p.id === Number(pid)))
  }, [pid])

  if (!project) {
    return <></>
  }

  const handleClaimTickets = async () => {
    try {
      setClaiming(true)
      const tx = await claimLotteryTickets(project.id.toString())
      console.log(tx)
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

  return (
    <>
      <ProjectLayout project={project}>
        <div className="block mb-4">
          <div className="block--contrast">
            <div className="title--medium mb-1">Total Claimable Tickets</div>

            <div className="flex items-center">
              <div className="text-primaryClear font-bold transform translate-y-px">Available</div>

              <div className="font-heading text-primary ml-6">
                {loading ? '...' : Math.floor(Math.pow(Number(xzkpBalance), 0.6))}
              </div>
            </div>
          </div>

          <div className="block__item">
            <div className="grid grid-cols-3 gap-4">
              <BaseButton className="col-span-2" onClick={handleClaimTickets} disabled={claiming}>
                <img src={UploadIcon} alt={''} /> {claiming ? <Spinner /> : 'Claim Tokens'}
              </BaseButton>
              <BaseButton className="col-span-1">
                <Unlock />
                Lock more $ZKP
              </BaseButton>
            </div>
          </div>
        </div>
        <AllocationInfo />
      </ProjectLayout>
    </>
  )
}

export default ProjectClaimPage
