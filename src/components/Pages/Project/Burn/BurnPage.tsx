import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Project } from '../../../../interfaces'
import ProjectLayout from '../ProjectLayout'
import AllocationInfo from '../Main/AllocationInfo'
import BaseInput from '../../../ui/inputs/BaseInput'
import BaseButton from '../../../ui/buttons/BaseButton'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useSelector } from 'react-redux'
import { useTokenContract, useIDOContract, useLotteryTokenContract } from 'contracts'
import { RootState } from 'stores/reduxStore'
import { useApi } from 'api'
import { Result, uint256, hash } from 'starknet'
import { FireIcon } from 'components/ui/Icons/Icons'
import ToastActions from 'actions/toast.actions'
import { useAppDispatch } from 'hooks/hooks'
import { useTransactions } from 'context/TransactionsProvider'
import { ToastState } from 'components/ui/Toast/utils'
import { useQuery } from '@apollo/client'
import { PROJECT } from '../../../../api/gql/querries'
import Spinner from '../../../ui/Spinner/Spinner'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

const BurnPage = () => {
  const router = useRouter()
  const { account } = useStarknetReact()
  const { pid } = router.query
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [ticketsBalance, setTicketsBalance] = useState('0')
  const [userInfo, setUserInfo] = useState<Result>({} as Result)
  const [amountToBurn, setAmountToBurn] = useState('0')
  const [nbQuestsCompleted, setNbQuestsCompleted] = useState(0)
  const [burning, setBurning] = useState(false)
  const [loading, setLoading] = useState(false)

  const [merkleProof, setMerkleProof] = useState<string[]>([])

  const { user } = useSelector((state: RootState) => state.Auth)

  const { burn: burnTickets, getTicketsBalance, burnWithQuest } = useLotteryTokenContract()
  const { getUserInfo } = useIDOContract()

  const { fetchProof, getNumberQuestsCompleted } = useApi()

  const dispatch = useAppDispatch()

  const { addTransaction } = useTransactions()

  const { data } = useQuery(PROJECT, {
    variables: {
      idoId: pid,
    },
  })

  useEffect(() => {
    data && setProject(data.project)
  }, [data])

  const handleBurnTickets = async () => {
    if (!pid) return
    try {
      setBurning(true)
      const tx = await burnTickets(account, pid.toString(), amountToBurn)
      // let tx
      // if (nbQuestsCompleted === 0 || merkleProof.length === 0) {
      //   tx = await burnTickets(account, pid?.toString(), amountToBurn)
      // } else {
      //   tx = await burnWithQuest(
      //     account,
      //     pid?.toString(),
      //     amountToBurn,
      //     nbQuestsCompleted,
      //     merkleProof
      //   )
      // }
      if (!tx) throw Error('no tx')
      addTransaction(
        tx,
        'Burn Tickets',
        () => fetchBalances(),
        () => {}
      )

      setBurning(false)
    } catch (e) {
      dispatch(
        ToastActions.addToast({
          title: String(e),
          action: <div className="font-heading text-12 text-primary">Try again</div>,
          state: ToastState.ERROR,
          autoClose: true,
        })
      )
      console.error(e)
      setBurning(false)
    }
  }

  const fetchBalances = async () => {
    if (!project) return
    try {
      setLoading(true)
      const _ticketsBalance = await getTicketsBalance(account?.address, project.idoId.toString())
      // console.log(_ticketsBalance)
      setTicketsBalance(uint256.uint256ToBN(_ticketsBalance.balance).toString())

      const _userInfo = await getUserInfo(account?.address, project.idoId.toString(), project.type)
      setUserInfo(_userInfo)

      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

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
      fetchBalances()
      fetchQuestsInfo()
    }
  }, [account, project])

  return (
    <>
      {project && (
        <ProjectLayout project={project}>
          <div className="block mb-4">
            <div className="block--contrast">
              <div className="title--medium mb-1">Lottery tickets to burn</div>

              <div className="flex items-center justify-between">
                <div className="text-primaryClear font-bold transform translate-y-px">
                  Available
                </div>

                <div className="font-heading text-primary ml-6">{ticketsBalance}</div>
                <div className="text-primaryClear font-bold transform translate-y-px">Winning</div>

                <div className="font-heading text-primary ml-6">
                  {userInfo?.tickets ? (
                    uint256.uint256ToBN(userInfo.tickets).toString()
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>

            <div className="block__item">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <BaseInput
                  label="Tickets"
                  value={amountToBurn}
                  max={ticketsBalance ? Number(ticketsBalance) : 0}
                  onChange={(e) => setAmountToBurn(e.target.value)}
                  size="xl"
                />

                <BaseButton onClick={handleBurnTickets} disabled={burning}>
                  <FireIcon />
                  {burning ? <Spinner /> : <ButtonTitle title="Burn Tickets" />}
                </BaseButton>
              </div>
            </div>
          </div>
          <AllocationInfo type="burn" projectType={project.type} />
        </ProjectLayout>
      )}
    </>
  )
}

export default BurnPage
