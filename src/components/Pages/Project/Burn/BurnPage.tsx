import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../../interfaces'
import { projects } from '../../../../utils/data'
import ProjectLayout from '../ProjectLayout'
import AllocationInfo from '../Main/AllocationInfo'
import BaseInput from '../../../ui/inputs/BaseInput'
import BaseButton from '../../../ui/buttons/BaseButton'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useSelector } from 'react-redux'
import { useTokenContract } from 'contracts'
import { useLotteryTokenContract } from 'contracts/lottery'
import { RootState } from 'stores/reduxStore'
import { useApi } from 'api'
import { uint256 } from 'starknet'
import { Spinner } from '@chakra-ui/react'
import { FireIcon } from 'components/ui/Icons/Icons'
import ToastActions from 'actions/toast.actions'
import { useAppDispatch } from 'hooks/hooks'

const BurnPage = () => {
  const router = useRouter()
  const { account } = useStarknetReact()
  const { pid } = router.query
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [ticketsBalance, setTicketsBalance] = useState('0')
  const [amountToBurn, setAmountToBurn] = useState('0')
  const [burning, setBurning] = useState(false)
  const [loading, setLoading] = useState(false)

  const [merkleProof, setMerkleProof] = useState<string[]>([])

  const { authToken } = useSelector((state: RootState) => state.ConnectWallet)
  const { user } = useSelector((state: RootState) => state.Auth)

  const { burn: burnTickets, getTicketsBalance, burnWithQuest } = useLotteryTokenContract()

  const { fetchProof } = useApi()

  const dispatch = useAppDispatch()

  useEffect(() => {
    setProject(projects.find((p) => p.id === Number(pid)))
  }, [pid])

  const handleBurnTickets = async () => {
    try {
      setBurning(true)
      let tx
      if (user.questsCompleted.length === 0) {
        tx = await burnTickets(account, pid, amountToBurn)
      } else {
        tx = await burnWithQuest(
          account,
          pid,
          amountToBurn,
          user.questsCompleted.length,
          merkleProof
        )
      }
      dispatch(
        ToastActions.addToast({
          title: 'Claim made',
          action: (
            <a
              className="font-heading text-12 text-primary"
              href={`https://goerli.voyager.online/tx/${tx.transaction_hash}`}>
              View on explorer
            </a>
          ),
        })
      )
      setBurning(false)
    } catch (e) {
      console.error(e)
      setBurning(false)
    }
  }

  const fetchBalances = async () => {
    try {
      setLoading(true)
      const _ticketsBalance = await getTicketsBalance(account?.address, project?.id.toString())
      // console.log(_ticketsBalance)
      setTicketsBalance(uint256.uint256ToBN(_ticketsBalance.balance).toString())
      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const fetchQuestsInfo = async () => {
    if (!project) return
    try {
      const proof = await fetchProof(authToken, project.id.toString())
      setMerkleProof(proof.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (account?.address && project) {
      fetchBalances()
    }
  }, [account, project])

  useEffect(() => {
    if (authToken && project) {
      fetchQuestsInfo()
    }
  }, [authToken, project])

  return (
    <>
      {project && (
        <ProjectLayout project={project}>
          <div className="block mb-4">
            <div className="block--contrast">
              <div className="title--medium mb-1">Lottery tickets to burn</div>

              <div className="flex items-center">
                <div className="text-primaryClear font-bold transform translate-y-px">
                  Available
                </div>

                <div className="font-heading text-primary ml-6">{ticketsBalance}</div>
              </div>
            </div>

            <div className="block__item">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <BaseInput
                  label={'Tickets'}
                  value={amountToBurn}
                  max={Number(ticketsBalance)}
                  onChange={(e) => setAmountToBurn(e.target.value)}
                />

                <BaseButton onClick={handleBurnTickets} disabled={burning}>
                  <FireIcon />
                  {burning ? <Spinner /> : 'Burn Tickets'}
                </BaseButton>
              </div>
            </div>
          </div>
          <AllocationInfo />
        </ProjectLayout>
      )}
    </>
  )
}

export default BurnPage
