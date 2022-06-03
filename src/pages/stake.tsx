import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  NumberInput,
  NumberInputField,
  Spinner,
  Text,
  VStack,
  Tooltip,
} from '@chakra-ui/react'
import { useStarknetReact } from '@web3-starknet-react/core'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import { forwardRef, useEffect, useMemo, useReducer, useState } from 'react'
import DatePicker from 'react-datepicker'
import { number, Result, uint256 } from 'starknet'

import Layout from '../layout'

import 'react-datepicker/dist/react-datepicker.css'
import { CalendarIcon, InfoIcon, LockIcon } from '@chakra-ui/icons'

import { useTokenContract } from 'contracts'
import { useStakingContract } from 'contracts/staking'
import ConnectWallet from 'components/ConnectWallet'
import { Contracts } from 'constants/networks'
import LockPage from '../components/Pages/Lock/LockPage'

const StakePage: NextPage = () => {
  return <LockPage />
  const { account } = useStarknetReact()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [zkpBalance, setZkpBalance] = useState('0')
  const [lpBalance, setLPBalance] = useState('0')
  const [stakeInfo, setStakeInfo] = useState<Result>({} as Result)
  const [xzkpBalance, setXZkpBalance] = useState('0')
  const [previewXZKP, setPreviewXZKP] = useState('0')
  const [updatingPreview, setUpdatingPreview] = useState(false)
  const [locking, setLocking] = useState(false)
  const [harvesting, setHarvesting] = useState(false)
  const [withdrawing, setWithdrawing] = useState(false)
  const [zkpAmount, setZKPAmount] = useState('10.0')
  const [currentAPY, setCurrentAPY] = useState(0)
  const [zkpLPAmount, setZKPLPAmount] = useState('0')
  const { getZKPBalance, getXZKPBalance, getLPBalance } = useTokenContract()
  const {
    previewDeposit,
    depositAll,
    redeem,
    getUserStakeInfo,
    previewDepositLP,
    harvestRewards,
    getStakingAPY,
  } = useStakingContract()

  const [isLockScreen, toggleScreen] = useReducer((s) => !s, true)

  const unlockRemainingTime = useMemo(
    () => new Date(stakeInfo?.unlock_time?.toNumber() * 1000).getTime() - new Date().getTime(),
    [stakeInfo]
  )
  const lockTime = useMemo(() => startDate.getTime() - new Date().getTime(), [startDate])

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

      if (Number(_xformattedBalance) > 0) toggleScreen()
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

  const updatePreview = async () => {
    try {
      setUpdatingPreview(true)
      const _daysPassed = lockTime / (3600 * 24 * 1000)
      const _preview = await previewDeposit(zkpAmount, _daysPassed)
      const _formattedShares = ethers.utils.formatUnits(
        uint256.uint256ToBN(_preview.shares).toString(),
        'ether'
      )
      if (Number(zkpLPAmount) > 0) {
        const _previewLP = await previewDepositLP(
          Contracts['SN_GOERLI'].lp_token,
          zkpLPAmount,
          _daysPassed
        )
        const _formattedSharesLP = ethers.utils.formatUnits(
          uint256.uint256ToBN(_previewLP.shares).toString(),
          'ether'
        )
        const _sharesSum = Number(_formattedShares) + Number(_formattedSharesLP)
        setPreviewXZKP(_sharesSum.toString())
      } else {
        setPreviewXZKP(_formattedShares)
      }

      setUpdatingPreview(false)
    } catch (e) {
      console.error(e)
      setUpdatingPreview(false)
    }
  }

  const handleLock = async () => {
    if (!account?.address) return

    try {
      setLocking(true)
      const _daysPassed = lockTime / (3600 * 24 * 1000)
      const tx = await depositAll(
        Contracts['SN_GOERLI'].lp_token,
        zkpLPAmount,
        zkpAmount,
        account,
        _daysPassed
      )
      setLocking(false)
    } catch (e) {
      console.error(e)
      setLocking(false)
    }
  }

  const handleHarvest = async () => {
    if (!account?.address) return

    try {
      setHarvesting(true)
      const tx = await harvestRewards()
      setHarvesting(false)
    } catch (e) {
      console.error(e)
      setHarvesting(false)
    }
  }

  const handleWithdraw = async () => {
    if (!account?.address) return

    try {
      setWithdrawing(true)
      const tx = await redeem(xzkpBalance, account)
      console.log(tx)
      setWithdrawing(false)
    } catch (e) {
      console.error(e)
      setWithdrawing(false)
    }
  }

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

  useEffect(() => {
    if (account?.address) {
      fetchBalances()
      fetchStakeInfo()
      fetchAPYs()
    }
  }, [account])

  useEffect(() => {
    updatePreview()
  }, [zkpAmount, zkpLPAmount, startDate])

  const CustomDatePicker = forwardRef<
    HTMLButtonElement,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  >(({ value, onClick }, ref) => (
    <Button
      leftIcon={<CalendarIcon />}
      bg="#fff"
      borderRadius="8px"
      border="1px solid #C89CFF"
      onClick={onClick}
      ref={ref}
      _hover={{ bg: '#C89CFF' }}
      fontFamily="Druk Wide Web"
      fontSize={'10px'}
      height="56px">
      <span style={{ marginRight: '20px', color: '#9D69DE' }}>Date</span> {value}
    </Button>
  ))

  return (
    <Layout>
      <Heading size="2xl" color="purple.700" textShadow="-2px 2px 0px #8f00ff" mb={'64px'}>
        LOCK ZKP
      </Heading>
      <Flex>
        <Flex flexDir={'row'} gridGap="20px">
          <Flex flexDir={'column'} width="75%">
            <Flex flexDir={'row'} gridGap="20px" width={'100%'}>
              <Flex flexDir="column" gridGap={'16px'} width="36%">
                <Heading
                  pl={'45px'}
                  size="26px"
                  color="#370063"
                  // textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                >
                  LOCK YOUR ZKP
                </Heading>
                <Flex
                  flexDir={'column'}
                  filter="drop-shadow(0px 32px 48px rgba(55, 0, 99, 0.08))"
                  borderRadius={'24px'}
                  backgroundColor="#fff"
                  border={'2px #fff solid'}
                  width="100%"
                  height={'100%'}>
                  <Flex
                    borderRadius={'24px'}
                    background="purple.600"
                    width={'100%'}
                    flexDir="row"
                    padding="20px"
                    minH={'50%'}>
                    <Flex flexDir={'column'} margin="auto">
                      <Text
                        color="#9D69DE"
                        fontWeight={'700'}
                        onClick={() => setZKPAmount(zkpBalance)}
                        fontSize="12px"
                        pb="5px">
                        <span
                          style={{
                            color: '#C89CFF',
                            paddingRight: '30px',
                            fontWeight: '400',
                            fontSize: '16px',
                          }}>
                          Tokens
                        </span>
                        <span
                          style={{
                            color: '#C89CFF',
                            fontSize: '12px',
                            paddingRight: '15px',
                            fontWeight: '900',
                            marginLeft: '40px',
                          }}>
                          Available
                        </span>
                        {zkpBalance}
                      </Text>
                      <NumberInput
                        max={Number(zkpBalance)}
                        clampValueOnBlur={false}
                        width="100%"
                        onChange={(valueString: string) => setZKPAmount(valueString)}
                        value={zkpAmount}
                        position="relative">
                        <NumberInputField
                          bg="#fff"
                          textAlign="right"
                          borderRadius="8px"
                          _hover={{ bg: '#C89CFF' }}
                          fontFamily="Druk Wide Web"
                          fontSize={'10px'}
                          height="56px"
                          border="1px solid #C89CFF !important"
                        />
                        <Text
                          position={'absolute'}
                          left="14px"
                          top={'21px'}
                          fontFamily="Druk Wide Web"
                          fontSize={'10px'}
                          zIndex="10">
                          ZKP
                        </Text>
                      </NumberInput>
                    </Flex>
                  </Flex>
                  <Flex
                    padding="20px"
                    marginTop="auto"
                    marginBottom="auto"
                    justifyContent={'center'}>
                    <Flex flexDir={'column'} margin="auto">
                      <Text
                        color="#9D69DE"
                        fontWeight={'700'}
                        onClick={() => setZKPLPAmount(lpBalance)}
                        fontSize="12px"
                        pb="5px">
                        <span
                          style={{
                            color: '#C89CFF',
                            paddingRight: '20px',
                            fontWeight: '400',
                            fontSize: '16px',
                          }}>
                          Liquid Pools
                        </span>
                        <span
                          style={{
                            color: '#C89CFF',
                            fontSize: '12px',
                            paddingRight: '15px',
                            fontWeight: '900',
                            marginLeft: '40px',
                          }}>
                          Available
                        </span>
                        {lpBalance}
                      </Text>
                      <NumberInput
                        max={Number(lpBalance)}
                        clampValueOnBlur={false}
                        width="100%"
                        onChange={(valueString: string) => setZKPLPAmount(valueString)}
                        value={zkpLPAmount}
                        position="relative">
                        <NumberInputField
                          bg="#fff"
                          textAlign="right"
                          borderRadius="8px"
                          _hover={{ bg: '#C89CFF' }}
                          fontFamily="Druk Wide Web"
                          fontSize={'10px'}
                          height="56px"
                          border="1px solid #C89CFF !important"
                        />
                        <Text
                          position={'absolute'}
                          left="14px"
                          top={'21px'}
                          fontFamily="Druk Wide Web"
                          fontSize={'10px'}
                          zIndex="10">
                          ZKP-LP
                        </Text>
                      </NumberInput>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex width={'100%'} flexDir="column" gridGap={'16px'}>
                <Flex height={'28px'} />
                <Flex
                  flexDir={'column'}
                  filter="drop-shadow(0px 32px 48px rgba(55, 0, 99, 0.08))"
                  borderRadius={'24px'}
                  backgroundColor="#fff"
                  width="100%"
                  border={'2px #fff solid'}
                  height="100%">
                  <Flex
                    borderRadius={'24px'}
                    background="purple.600"
                    width={'100%'}
                    flexDir="row"
                    padding="20px">
                    <Flex flexDir={'column'}>
                      <Text
                        fontStyle="normal"
                        fontWeight="400"
                        fontSize="16px"
                        lineHeight="22px"
                        color="#9D69DE">
                        Lock until
                      </Text>
                      <Flex flexDir={'row'} gridGap="10px" pt={'15px'}>
                        <Button
                          bg="#8F00FF"
                          color="white"
                          width="30%"
                          fontSize="xs"
                          borderRadius="8px"
                          height="30px"
                          _hover={{ bg: 'purple.400' }}
                          onClick={() => {
                            const d = new Date()
                            d.setMonth(d.getMonth() + 6)
                            setStartDate(d)
                          }}>
                          6 Months
                        </Button>
                        <Button
                          bg="#8F00FF"
                          color="white"
                          width="30%"
                          fontSize="xs"
                          borderRadius="8px"
                          height="30px"
                          _hover={{ bg: 'purple.400' }}
                          onClick={() => {
                            const d = new Date()
                            d.setMonth(d.getMonth() + 12)
                            setStartDate(d)
                          }}>
                          1 year
                        </Button>
                        <Button
                          bg="#8F00FF"
                          color="white"
                          width="30%"
                          fontSize="xs"
                          borderRadius="8px"
                          height="30px"
                          _hover={{ bg: 'purple.400' }}
                          onClick={() => {
                            const d = new Date()
                            d.setMonth(d.getMonth() + 24)
                            setStartDate(d)
                          }}>
                          2 Year
                        </Button>
                      </Flex>
                    </Flex>
                    <Flex flexDir={'column'} marginLeft={'auto'}>
                      <Flex height={'23px'} />
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date || new Date())}
                        customInput={<CustomDatePicker />}
                      />
                    </Flex>
                  </Flex>
                  <Flex
                    padding="20px"
                    marginTop="auto"
                    marginBottom="auto"
                    justifyContent={'center'}>
                    <Button
                      leftIcon={
                        <Image height={'19px'} width="15px" src={'/assets/imgs/locker.png'} />
                      }
                      bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
                      borderRadius="16px"
                      boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
                      width="100%"
                      fontFamily="Druk Wide Web"
                      py="25px"
                      color="white"
                      _hover={{ bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)' }}
                      onClick={handleLock}
                      disabled={
                        lockTime < unlockRemainingTime ||
                        Number(zkpAmount) > Number(zkpBalance) ||
                        Number(zkpLPAmount) > Number(lpBalance)
                      }>
                      Lock
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDir={'row'} gridGap="20px" width={'100%'} pt={'60px'}>
              <Flex width={'64%'} flexDir="column" gridGap={'16px'}>
                <Heading
                  pl={'45px'}
                  size="26px"
                  color="purple.500"
                  // textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                >
                  STAKING CALCULATOR
                </Heading>
                <Flex
                  flexDir={'column'}
                  filter="drop-shadow(0px 32px 48px rgba(55, 0, 99, 0.08))"
                  borderRadius={'24px'}
                  backgroundColor="#fff"
                  width="100%"
                  border={'2px #fff solid'}
                  height="100%">
                  <Flex
                    borderRadius={'24px'}
                    background="purple.600"
                    width={'100%'}
                    flexDir="row"
                    padding="20px">
                    <Flex flexDir={'column'}>
                      <Text
                        fontStyle="normal"
                        fontWeight="400"
                        fontSize="16px"
                        lineHeight="22px"
                        color="#9D69DE">
                        $ZKP staked
                      </Text>
                      <Flex flexDir={'row'} gridGap="10px" pt={'15px'}>
                        <Button
                          bg="#8F00FF"
                          color="white"
                          width="30%"
                          fontSize="xs"
                          borderRadius="8px"
                          height="30px"
                          _hover={{ bg: 'purple.400' }}
                          onClick={() => {
                            setZKPAmount('100')
                          }}>
                          100
                        </Button>
                        <Button
                          bg="#8F00FF"
                          color="white"
                          width="30%"
                          fontSize="xs"
                          borderRadius="8px"
                          height="30px"
                          _hover={{ bg: 'purple.400' }}
                          onClick={() => {
                            setZKPAmount('1000')
                          }}>
                          1,000
                        </Button>
                        <Button
                          bg="#8F00FF"
                          color="white"
                          width="30%"
                          fontSize="xs"
                          borderRadius="8px"
                          height="30px"
                          _hover={{ bg: 'purple.400' }}
                          onClick={() => {
                            setZKPAmount('10000')
                          }}>
                          10,000
                        </Button>
                      </Flex>
                    </Flex>
                    <Flex flexDir={'column'} marginLeft={'auto'}>
                      <Text
                        color="#9D69DE"
                        fontWeight={'700'}
                        onClick={() => setZKPAmount(zkpBalance)}
                        fontSize="13px"
                        pb="5px"
                        ml={'auto'}>
                        <span style={{ color: '#C89CFF', paddingRight: '15px', fontWeight: '900' }}>
                          Available
                        </span>
                        {zkpBalance}
                      </Text>
                      <NumberInput
                        max={Number(zkpBalance)}
                        clampValueOnBlur={false}
                        width="100%"
                        onChange={(valueString: string) => setZKPAmount(valueString)}
                        value={zkpAmount}>
                        <NumberInputField
                          bg="#fff"
                          textAlign="right"
                          borderRadius="8px"
                          _hover={{ bg: '#C89CFF' }}
                          fontFamily="Druk Wide Web"
                          fontSize={'10px'}
                          height="56px"
                          border="1px solid #C89CFF !important"
                        />
                      </NumberInput>
                    </Flex>
                  </Flex>
                  <Flex
                    padding="20px"
                    marginTop="auto"
                    marginBottom="auto"
                    justifyContent={'center'}>
                    <Flex flexDir={'column'}>
                      <Text
                        fontStyle="normal"
                        fontWeight="400"
                        fontSize="16px"
                        lineHeight="22px"
                        color="#9D69DE">
                        Lock until
                      </Text>
                      <Flex flexDir={'row'} gridGap="10px" pt={'15px'}>
                        <Button
                          bg="#8F00FF"
                          color="white"
                          width="30%"
                          fontSize="xs"
                          borderRadius="8px"
                          height="30px"
                          _hover={{ bg: 'purple.400' }}
                          onClick={() => {
                            const d = new Date()
                            d.setMonth(d.getMonth() + 6)
                            setStartDate(d)
                          }}>
                          6 Months
                        </Button>
                        <Button
                          bg="#8F00FF"
                          color="white"
                          width="30%"
                          fontSize="xs"
                          borderRadius="8px"
                          height="30px"
                          _hover={{ bg: 'purple.400' }}
                          onClick={() => {
                            const d = new Date()
                            d.setMonth(d.getMonth() + 12)
                            setStartDate(d)
                          }}>
                          1 year
                        </Button>
                        <Button
                          bg="#8F00FF"
                          color="white"
                          width="30%"
                          fontSize="xs"
                          borderRadius="8px"
                          height="30px"
                          _hover={{ bg: 'purple.400' }}
                          onClick={() => {
                            const d = new Date()
                            d.setMonth(d.getMonth() + 24)
                            setStartDate(d)
                          }}>
                          2 Year
                        </Button>
                      </Flex>
                    </Flex>
                    <Flex flexDir={'column'} marginLeft={'auto'}>
                      <Flex height={'23px'} />
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date || new Date())}
                        customInput={<CustomDatePicker />}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir="column" gridGap={'16px'} width="100%">
                <Heading
                  pl={'45px'}
                  size="26px"
                  color="purple.500"
                  // textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                >
                  RESULTS
                </Heading>
                <Flex
                  flexDir={'column'}
                  filter="drop-shadow(0px 32px 48px rgba(55, 0, 99, 0.08))"
                  borderRadius={'24px'}
                  backgroundColor="#fff"
                  border={'2px #fff solid'}
                  width="100%"
                  height={'100%'}>
                  <Flex
                    borderRadius={'24px'}
                    background="purple.600"
                    width={'100%'}
                    flexDir="row"
                    padding="20px"
                    minH={'50%'}>
                    <Text
                      fontStyle="normal"
                      fontWeight="400"
                      fontSize="16px"
                      lineHeight="22px"
                      color="#9D69DE"
                      marginTop={'auto'}
                      marginBottom={'auto'}>
                      Total Estimated Number of lottery tickets earned per IDO
                    </Text>
                    <Flex
                      padding="13px 19px"
                      gap="10px"
                      background="#FFFFFF"
                      boxShadow="0px 32px 48px rgba(55, 0, 99, 0.08)"
                      borderRadius="12px"
                      fontWeight=" 700"
                      fontSize="24px"
                      lineHeight="31px"
                      textAlign="center"
                      color="#8F00FF"
                      fontFamily={'Druk Wide Web'}
                      marginTop={'auto'}
                      marginBottom={'auto'}>
                      {Math.round(Math.pow(Number(xzkpBalance) + Number(previewXZKP), 0.6))}
                    </Flex>
                  </Flex>
                  <Flex
                    padding="20px"
                    marginTop="auto"
                    marginBottom="auto"
                    justifyContent={'center'}>
                    <Text
                      fontStyle="normal"
                      fontWeight="400"
                      fontSize="16px"
                      lineHeight="22px"
                      color="#9D69DE"
                      mt="auto"
                      mb="auto">
                      Estimated APY
                    </Text>
                    <Tooltip
                      label="This is estimated APY bruh don't panick, it may change or it may not, god knows, and I'm not god at all, I'm just a nice looking dev."
                      fontSize="md"
                      padding="20px"
                      background={'purple.600'}
                      border="1px #fff solid"
                      borderRadius={'26px'}
                      color="#9D69DE"
                      fontWeight={'600'}
                      textAlign="justify">
                      <Image
                        src={'/assets/imgs/info.png'}
                        width="24px"
                        height={'24px'}
                        marginTop={'auto'}
                        marginBottom="auto"
                        marginLeft={'10px'}
                      />
                    </Tooltip>
                    <Flex
                      padding="13px 19px"
                      gap="10px"
                      background="#FFFFFF"
                      boxShadow="0px 32px 48px rgba(55, 0, 99, 0.08)"
                      borderRadius="12px"
                      fontWeight=" 700"
                      fontSize="24px"
                      lineHeight="31px"
                      textAlign="center"
                      color="#8F00FF"
                      fontFamily={'Druk Wide Web'}
                      marginTop="auto"
                      marginLeft={'auto'}>
                      {currentAPY}%
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Image src="/assets/imgs/divider.png" height={'630px'} zIndex="100" />
          <Flex width="35%" flexDir="column" height={'100%'} gridGap="20px" paddingTop={'40px'}>
            <Flex width={'full'} flexDir="column" gridGap={'16px'}>
              <Flex height={'28px'} />
              <Flex
                flexDir={'column'}
                filter="drop-shadow(0px 32px 48px rgba(55, 0, 99, 0.08))"
                borderRadius={'24px'}
                backgroundColor="#fff"
                width="100%"
                border={'2px #fff solid'}
                height="100%">
                <Flex
                  borderRadius={'24px'}
                  background="purple.600"
                  width={'100%'}
                  flexDir="row"
                  padding="20px">
                  <Flex flexDir={'column'} width="full">
                    <Heading
                      fontStyle="normal"
                      fontWeight="400"
                      lineHeight="22px"
                      size="sm"
                      color="purple.700">
                      Harvest rewards
                    </Heading>
                    <Flex flexDir="row" justifyContent="space-between">
                      <Text pt={2} fontWeight="bold" color="purple.500">
                        $ZKP Available
                      </Text>
                      <Text pt={2} fontWeight="bold" fontFamily="Druk Wide Web" color="purple.500">
                        135
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex padding="20px" marginTop="auto" marginBottom="auto" justifyContent={'center'}>
                  <Button
                    bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
                    borderRadius="16px"
                    boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
                    width="100%"
                    fontFamily="Druk Wide Web"
                    py="25px"
                    color="white"
                    _hover={{ bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)' }}
                    onClick={handleHarvest}>
                    Claim 135 ZKP
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDir="row" gap="20px">
              <Flex
                width="60%"
                flexDir="column"
                bg={'#fff'}
                borderRadius="24px"
                padding={'30px'}
                className="How it works">
                <Text
                  fontFamily="Druk Wide Web"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="21px"
                  display="flex"
                  alignItems="center"
                  color="#9D69DE">
                  How it Works
                  <Tooltip
                    label="This is estimated APY bruh don't panick, it may change or it may not, god knows, and I'm not god at all, I'm just a nice looking dev."
                    fontSize="md"
                    padding="20px"
                    background={'purple.600'}
                    border="1px #fff solid"
                    borderRadius={'26px'}
                    color="#9D69DE"
                    fontWeight={'600'}
                    textAlign="justify">
                    <Image
                      src={'/assets/imgs/info.png'}
                      width="24px"
                      height={'24px'}
                      marginTop={'auto'}
                      marginBottom="auto"
                      marginLeft={'10px'}
                    />
                  </Tooltip>
                </Text>
                <Text
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="22px"
                  color="#9D69DE"
                  pt={'10px'}
                  textAlign="left">
                  Owning ZKP tokens or ZKP-LP is requirement in order to participate in IDOs on
                  ZkPad.
                </Text>
                <Text
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="22px"
                  color="#9D69DE"
                  pt={'10px'}
                  textAlign="left">
                  You can lock your tokens and receive lottery tickets to invest in the listed
                  projects.
                </Text>
              </Flex>
              <Flex
                padding={'30px'}
                borderRadius="24px"
                border={'2px solid #fff'}
                bg="#FAF3FF"
                flexDir={'column'}
                justifyContent="center"
                className="Steps">
                <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Step 1
                </Text>
                <Text fontWeight="900" fontSize="16px" lineHeight="19px" color="#9D69DE">
                  Buy ZKP tokens
                </Text>
                <Image
                  src="/assets/imgs/star.png"
                  width={'20px'}
                  my="10px"
                  transform={'translateX(-9px)'}
                />
                <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Step 2
                </Text>
                <Text fontWeight="900" fontSize="16px" lineHeight="19px" color="#9D69DE">
                  Stake ZKP tokens
                </Text>
                <Image
                  src="/assets/imgs/star.png"
                  width={'20px'}
                  my="10px"
                  transform={'translateX(-9px)'}
                />
                <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Step 3
                </Text>
                <Text fontWeight="900" fontSize="16px" lineHeight="19px" color="#9D69DE">
                  Claim lottery tickets
                </Text>
                <Image
                  src="/assets/imgs/star.png"
                  width={'20px'}
                  my="10px"
                  transform={'translateX(-9px)'}
                />
                <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Step 4
                </Text>
                <Text fontWeight="900" fontSize="16px" lineHeight="19px" color="#9D69DE">
                  Invest in IDOs
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* {isLockScreen ? (
        <Flex gap="20px">
          <Flex bg="#8f00ff" width="40%" p={7} flexDir="column" gap="10px" margin="50px 0">
            <Flex justifyContent="space-between" width="100%">
              <Heading size="md">LOCK YOUR ZKP</Heading>
              <IconButton
                variant="outline"
                colorScheme="white"
                aria-label="Switch to Stake Screen"
                icon={<InfoIcon />}
                onClick={toggleScreen}
              />
            </Flex>
            <Flex gap="10px">
              <Flex
                bg="purple.700"
                color="white"
                width="100px"
                justifyContent="center"
                alignItems="center"
                px={3}
                height="50px"
              >
                ZKP
              </Flex>
              <Flex flex="auto" flexDir="column" gap="5px">
                <NumberInput
                  max={Number(zkpBalance)}
                  clampValueOnBlur={false}
                  width="100%"
                  onChange={(valueString: string) => setZKPAmount(valueString)}
                  value={zkpAmount}
                >
                  <NumberInputField
                    bg="purple.700"
                    height="50px"
                    textAlign="right"
                    borderRadius="0"
                  />
                </NumberInput>
                <Text fontSize="xs" textAlign="right" onClick={() => setZKPAmount(zkpBalance)}>
                  Available : {zkpBalance}
                </Text>
              </Flex>
            </Flex>
            <Flex gap="10px">
              <Flex
                bg="purple.700"
                color="white"
                width="100px"
                justifyContent="center"
                alignItems="center"
                px={3}
                height="50px"
              >
                ZKP-LP
              </Flex>
              <Flex flex="auto" flexDir="column" gap="5px">
                <NumberInput
                  max={Number(lpBalance)}
                  clampValueOnBlur={false}
                  width="100%"
                  onChange={(valueString: string) => setZKPLPAmount(valueString)}
                  value={zkpLPAmount}
                >
                  <NumberInputField
                    bg="purple.700"
                    height="50px"
                    textAlign="right"
                    borderRadius="0"
                  />
                </NumberInput>
                <Text fontSize="xs" textAlign="right" onClick={() => setZKPLPAmount(lpBalance)}>
                  Available : {lpBalance}
                </Text>
              </Flex>
            </Flex>

            <Flex gap="10px">
              <Flex
                bg="none"
                color="white"
                width="100px"
                justifyContent="center"
                alignItems="center"
                px={3}
                height="50px"
              >
                Lock Until
              </Flex>
              <Flex flex="auto" flexDir="column" gap="5px">
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date || new Date())}
                  customInput={<CustomDatePicker />}
                />
                <Flex justifyContent="space-between" alignItems="center" mt={1}>
                  <Button
                    bg="purple.700"
                    color="white"
                    width="22%"
                    fontSize="xs"
                    borderRadius="none"
                    height="30px"
                    onClick={() => {
                      const d = new Date();
                      d.setMonth(d.getMonth() + 3);
                      setStartDate(d);
                    }}
                  >
                    3 Months
                  </Button>
                  <Button
                    bg="purple.700"
                    color="white"
                    width="22%"
                    fontSize="xs"
                    borderRadius="none"
                    height="30px"
                    onClick={() => {
                      const d = new Date();
                      d.setMonth(d.getMonth() + 6);
                      setStartDate(d);
                    }}
                  >
                    6 Months
                  </Button>
                  <Button
                    bg="purple.700"
                    color="white"
                    width="22%"
                    fontSize="xs"
                    borderRadius="none"
                    height="30px"
                    onClick={() => {
                      const d = new Date();
                      d.setMonth(d.getMonth() + 12);
                      setStartDate(d);
                    }}
                  >
                    1 Year
                  </Button>
                  <Button
                    bg="purple.700"
                    color="white"
                    width="22%"
                    fontSize="xs"
                    borderRadius="none"
                    height="30px"
                    onClick={() => {
                      const d = new Date();
                      d.setMonth(d.getMonth() + 24);
                      setStartDate(d);
                    }}
                  >
                    2 Years
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            {account ? (
              <Box mt={6} width="full">
                {Number(xzkpBalance) > 0 && (
                  <Text fontStyle="italic">+ Current Stake ({xzkpBalance} xZKP)</Text>
                )}
                <Button
                  borderRadius="none"
                  bg="none"
                  color="white"
                  border="2px solid"
                  borderColor="purple.700"
                  fontWeight="bold"
                  onClick={handleLock}
                  width="full"
                  disabled={
                    lockTime < unlockRemainingTime ||
                    Number(zkpAmount) > Number(zkpBalance) ||
                    Number(zkpLPAmount) > Number(lpBalance)
                  }
                >
                  {locking ? <Spinner /> : 'Lock'}
                </Button>
              </Box>
            ) : (
              <ConnectWallet width="full" />
            )}
          </Flex>
          <Flex bg="#8f00ff" width="60%" p={7} flexDir="column" gap="10px" margin="50px 0">
            <Heading size="md">REWARDS</Heading>
            <HStack spacing="30px" margin="50px 0">
              <Flex
                p="50px"
                bg="purple.700"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="md">
                  {updatingPreview
                    ? '...'
                    : Math.round(Math.pow(Number(previewXZKP) + Number(xzkpBalance), 0.6))}
                </Heading>
                <Text fontSize="sm" textAlign="center">
                  Estimated number of lottery tickets earned per IDO
                </Text>
              </Flex>
              <Flex
                p="50px"
                bg="purple.700"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="md">84%</Heading>
                <Text fontSize="sm" textAlign="center">
                  Estimated APY
                </Text>
              </Flex>
              <Flex
                p="50px"
                bg="purple.700"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="md">84%</Heading>
                <Text fontSize="sm" textAlign="center">
                  Estimated APY
                </Text>
              </Flex>
            </HStack>
          </Flex>
        </Flex>
      ) : (
        <Flex gap="20px">
          <Flex bg="#8f00ff" width="40%" p={7} flexDir="column" gap="10px" margin="50px 0">
            <Flex justifyContent="space-between" width="100%">
              <Heading size="md">YOUR STAKE</Heading>
              <IconButton
                variant="outline"
                colorScheme="white"
                aria-label="Switch to Lock Screen"
                icon={<LockIcon />}
                onClick={toggleScreen}
              />
            </Flex>
            <Heading size="lg">{xzkpBalance} xZKP</Heading>
            {unlockRemainingTime > 0 && (
              <Text fontStyle="italic">
                Locked until{' '}
                {new Date(stakeInfo?.unlock_time?.toNumber() * 1000).toLocaleDateString()} (
                {Math.round(unlockRemainingTime / (1000 * 3600 * 24))} days)
              </Text>
            )}
            <VStack spacing="10px">
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Heading size="sm">Staked ZKP</Heading>
                <Text>0</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Heading size="sm">Staked ZKP-LP</Heading>
                <Text>0</Text>
              </Flex>
            </VStack>
            {account ? (
              <Button
                borderRadius="none"
                bg="none"
                color="white"
                border="2px solid"
                borderColor="purple.700"
                fontWeight="bold"
                mt={6}
                onClick={handleWithdraw}
                disabled={unlockRemainingTime > 0}
              >
                {withdrawing ? <Spinner /> : 'Withdraw'}
              </Button>
            ) : (
              <ConnectWallet width="full" />
            )}
          </Flex>
          <Flex bg="#8f00ff" width="60%" p={7} flexDir="column" gap="10px" margin="50px 0">
            <Heading size="md">REWARDS</Heading>
            <HStack spacing="30px" margin="50px 0">
              <Flex
                p="50px"
                bg="purple.700"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="md">{Math.round(Math.pow(Number(xzkpBalance), 0.6))}</Heading>
                <Text fontSize="sm" textAlign="center">
                  Estimated number of lottery tickets earned per IDO
                </Text>
              </Flex>
              <Flex
                p="50px"
                bg="purple.700"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="md">84%</Heading>
                <Text fontSize="sm" textAlign="center">
                  Estimated APY
                </Text>
              </Flex>
              <Flex
                p="50px"
                bg="purple.700"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="md">84%</Heading>
                <Text fontSize="sm" textAlign="center">
                  Estimated APY
                </Text>
              </Flex>
            </HStack>
          </Flex>
        </Flex>
      )} */}
    </Layout>
  )
}

export default StakePage
