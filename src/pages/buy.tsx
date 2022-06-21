import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useFaucetContract } from 'contracts/faucet'
import { ethers } from 'ethers'
import Layout from 'layout'
import React, { useEffect, useMemo, useState } from 'react'
import { uint256 } from 'starknet'
import { Contracts } from 'constants/networks'
import { verifyQuest } from 'utils/decode'
import { quests } from 'utils/data'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/reduxStore'
import BuyPage from 'components/Pages/Buy/BuyPage'
import BaseButton from 'components/ui/buttons/BaseButton'
import { WalletIcon } from 'components/ui/Icons/Icons'
import Chevron from 'assets/icons/Chevron.svg?inline'
import { useTransactions } from 'context/TransactionsProvider'

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET'
const CHAIN = isMainnet ? 'SN_MAIN' : 'SN_GOERLI'

const BuyPageContainer = () => {
  // return <BuyPage />
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
    // <Layout>
    <Flex minH={'74vh'}>
      <Flex
        borderRadius="24px"
        bg="white"
        p={10}
        width={{ base: '90%', sm: '70%', md: '50%', lg: '40%', xl: '30%' }}
        justifyContent="center"
        flexDir="column"
        margin="auto"
        gap="10px">
        <Heading size="sm">Mint Amount: {mintAmount} ASTR</Heading>
        {/* <Button
          bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
          boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
          borderRadius="16px"
          fontFamily="Druk Wide Web"
          py="25px"
          width="auto !important"
          color="white"
          disabled={!allowed}
          onClick={handleTransfer}>
          Mint ASTR
        </Button> */}

        <BaseButton onClick={handleTransfer} disabled={!allowed} className={'px-3 lg:px-12 group'}>
          Mint
        </BaseButton>
        {!allowed && <Text>You will be able to whitdraw in {roundTimer}</Text>}

        <BaseButton onClick={handleToWallet} className={'px-3 lg:px-12 group'} medium={true} small>
          <WalletIcon className={'mr-3'} />
          Add ASTR to Wallet
          <Chevron className={'ml-3 icon-right'} />
        </BaseButton>
      </Flex>
    </Flex>

    // </Layout>
  )
}

export default BuyPageContainer
