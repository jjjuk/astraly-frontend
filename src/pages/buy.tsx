import { useStarknetReact } from '@web3-starknet-react/core'
import { useFaucetContract } from 'contracts'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { uint256 } from 'starknet'
import { Contracts } from 'constants/networks'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/reduxStore'
import BaseButton from 'components/ui/buttons/BaseButton'
import { WalletIcon, SwapIcon } from 'components/ui/Icons/Icons'
import Chevron from 'assets/icons/Chevron.svg?inline'
import { useTransactions } from 'context/TransactionsProvider'
import LotteryTicket from 'assets/animations/lottery-ticket.gif'

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET'
const CHAIN = isMainnet ? 'SN_MAIN' : 'SN_GOERLI'

const BuyPageContainer = () => {
  const { account, connector } = useStarknetReact()
  const [mintAmount, setMintAmount] = useState('0')
  const [roundTimer, setRoundTimer] = useState('...')
  const [unlockTime, setUnlockTime] = useState(0)
  const [allowed, setAllowed] = useState(true)

  const { getWait, getAmount, getUnlockTime, allowedToWithdraw, faucetTransfer } =
    useFaucetContract()

  const { authToken } = useSelector((state: RootState) => state.ConnectWallet)
  const { addTransaction } = useTransactions()
  const handleTransfer = async () => {
    try {
      const tx = await faucetTransfer()
      addTransaction(tx, 'Mint Tokens', fetchInfo, () => {})
    } catch (error) {
      console.error(error)
    }
  }

  const handleToWallet = async () => {
    try {
      const _address = Contracts[CHAIN].token
      await (window as any).starknet?.request({
        type: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: _address,
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchInfo = async () => {
    try {
      const _amount = await getAmount()
      const _formattedAmount = ethers.utils.formatUnits(
        uint256.uint256ToBN(_amount.res).toString(),
        'ether'
      )
      setMintAmount(_formattedAmount)

      const _allowedToWithdraw = await allowedToWithdraw(account?.address)
      setAllowed(_allowedToWithdraw.success.toNumber() as boolean)

      const _unlockTime = await getUnlockTime(account?.address)
      setUnlockTime(_unlockTime.res.toNumber())
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (account) fetchInfo()
  }, [account])

  useEffect(() => {
    const _interval = setInterval(() => {
      const _remainingTime = new Date(unlockTime * 1000).getTime() - new Date().getTime()
      // const days = Math.floor(_remainingTime / (1000 * 60 * 60 * 24))
      const hours = Math.floor((_remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((_remainingTime % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((_remainingTime % (1000 * 60)) / 1000)
      setRoundTimer(`${hours}h${minutes}m${seconds}s`)
    }, 1000)

    return () => clearInterval(_interval)
  }, [unlockTime])

  return (
    <>
      <div className={'g-container gap-5 justify-center flex flex-col md:flex-row'}>
        <div className="flex flex-col gap-10">
          <div className="block h-fit">
            <div className="block--contrast">
              <h3 className={'small-title'}>Mint Amount: {mintAmount} ASTR</h3>

              <div className="relative z-10">
                <BaseButton
                  onClick={handleTransfer}
                  disabled={!allowed}
                  className={'px-3 lg:px-12 group'}>
                  Mint
                </BaseButton>
              </div>

              {!allowed && <p>You will be able to mint again in {roundTimer}</p>}
            </div>
            <div className="block__item">
              <div className="relative z-10">
                <BaseButton
                  onClick={handleToWallet}
                  className={'px-3 lg:px-12 group'}
                  medium={true}>
                  <WalletIcon className={'mr-3'} />
                  Add ASTR to Wallet
                  <Chevron className={'ml-3 icon-right'} />
                </BaseButton>
              </div>
            </div>
          </div>
          <div className="block h-fit">
            <div className="block--contrast">
              <div className="title--medium mt-1">Trade $ASTR on other DEXs</div>
            </div>
            <div className="block__item">
              <a href="https://testnet.app.alpharoad.fi/" target="_blank" rel="noreferrer">
                <div className="relative z-10">
                  <BaseButton>
                    <SwapIcon className={'mr-3'} />
                    AlphaRoad
                  </BaseButton>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="block">
          <div className="block--contrast flex flex-col items-center">
            <div className="title--medium mt-1">Trade NFT Lottery!</div>
            <div className="title--small mt-1">You can buy and sell NFT lottery tickets!</div>
            <img src={LotteryTicket.src} alt="lottery-ticket" width="250" />
          </div>
          <div className="block__item">
            <a
              href={`https://testnet.aspect.co/collection/${Contracts['SN_GOERLI'].lottery_token}`}
              target="_blank"
              rel="noreferrer">
              <div className="relative z-10">
                <BaseButton>
                  <SwapIcon className={'mr-3'} />
                  Trade on Aspect
                </BaseButton>
              </div>
            </a>
            <a
              href={`https://mintsquare.io/collection/starknet-testnet/${Contracts['SN_GOERLI'].lottery_token}/nfts`}
              target="_blank"
              rel="noreferrer">
              <div className="relative z-10">
                <BaseButton className="mt-5">
                  <SwapIcon className={'mr-3'} />
                  Trade on MintSquare
                </BaseButton>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="h-40"></div>
    </>
  )
}

export default BuyPageContainer
