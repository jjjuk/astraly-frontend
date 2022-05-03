import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react';
import {useStarknetReact} from '@web3-starknet-react/core';
import {ethers} from 'ethers';
import type {NextPage} from 'next';
import {forwardRef, useEffect, useMemo, useReducer, useState} from 'react';
import DatePicker from 'react-datepicker';
import {number, Result, uint256} from 'starknet';

import Layout from '../layout';

import 'react-datepicker/dist/react-datepicker.css';
import {CalendarIcon, InfoIcon, LockIcon} from '@chakra-ui/icons';

import {useTokenContract} from 'contracts';
import {useStakingContract} from 'contracts/staking';
import ConnectWallet from 'components/ConnectWallet';

const StakePage: NextPage = () => {
  const {account} = useStarknetReact();
  const [startDate, setStartDate] = useState(new Date());
  const [zkpBalance, setZkpBalance] = useState('0');
  const [stakeInfo, setStakeInfo] = useState<Result>({});
  const [xzkpBalance, setXZkpBalance] = useState('0');
  const [previewXZKP, setPreviewXZKP] = useState('0');
  const [updatingPreview, setUpdatingPreview] = useState(false);
  const [locking, setLocking] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [zkpAmount, setZKPAmount] = useState('10.0');
  const {getZKPBalance, getXZKPBalance} = useTokenContract();
  const {previewDeposit, depositForTime, redeem, getUserStakeInfo} = useStakingContract();

  const [isLockScreen, toggleScreen] = useReducer(s => !s, true);

  const unlockRemainingTime = useMemo(
    () => new Date(stakeInfo?.unlock_time?.toNumber() * 1000).getTime() - new Date().getTime(),
    [stakeInfo]
  );
  const lockTime = useMemo(() => startDate.getTime() - new Date().getTime(), [startDate]);

  const fetchBalances = async () => {
    try {
      const _balance = await getZKPBalance(account?.address);
      const _formattedBalance = ethers.utils.formatUnits(
        uint256.uint256ToBN(_balance.balance).toString(),
        'ether'
      );
      setZkpBalance(_formattedBalance);

      const _xbalance = await getXZKPBalance(account?.address);
      const _xformattedBalance = ethers.utils.formatUnits(
        uint256.uint256ToBN(_xbalance.balance).toString(),
        'ether'
      );
      setXZkpBalance(_xformattedBalance);

      if (Number(_xformattedBalance) > 0) toggleScreen();
    } catch (e) {
      console.error(e);
    }
  };
  const fetchStakeInfo = async () => {
    try {
      const _stakeInfo = await getUserStakeInfo(account?.address);
      console.log(_stakeInfo);
      setStakeInfo(_stakeInfo);
    } catch (e) {
      console.error(e);
    }
  };

  const updatePreview = async () => {
    try {
      setUpdatingPreview(true);
      const _preview = await previewDeposit(zkpAmount);
      const _formattedShares = ethers.utils.formatUnits(
        uint256.uint256ToBN(_preview.shares).toString(),
        'ether'
      );
      setPreviewXZKP(_formattedShares);
      setUpdatingPreview(false);
    } catch (e) {
      console.error(e);
      setUpdatingPreview(false);
    }
  };

  const handleLock = async () => {
    if (!account?.address) return;

    try {
      setLocking(true);
      const _daysPassed = (startDate.getTime() - new Date().getTime()) / (3600 * 24 * 1000);
      const tx = await depositForTime(zkpAmount, account, _daysPassed);
      setLocking(false);
    } catch (e) {
      console.error(e);
      setLocking(false);
    }
  };

  const handleWithdraw = async () => {
    if (!account?.address) return;

    try {
      setWithdrawing(true);
      const tx = await redeem(xzkpBalance, account);
      console.log(tx);
      setWithdrawing(false);
    } catch (e) {
      console.error(e);
      setWithdrawing(false);
    }
  };

  useEffect(() => {
    if (account?.address) {
      fetchBalances();
      fetchStakeInfo();
    }
  }, [account]);

  useEffect(() => {
    updatePreview();
  }, [zkpAmount]);

  const CustomDatePicker = forwardRef(({value, onClick}, ref) => (
    <Button
      leftIcon={<CalendarIcon />}
      bg="purple.700"
      width="100%"
      borderRadius="none"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </Button>
  ));

  return (
    <Layout>
      <Heading>LOCK ZKP OR ZKP-LP</Heading>
      <Text>
        Owning ZKP tokens or ZKP-LP is requirement in order to participate in IDOs on ZkPad. You can
        lock your tokens and receive lottery tickets to invest in the listed projects.
      </Text>
      {isLockScreen ? (
        <Flex gap="20px">
          <Flex bg="#8f00ff" width="40%" p={7} flexDir="column" gap="10px" margin="50px 0">
            <Flex justifyContent="space-between" width="100%">
              <Heading size="md">LOCK YOUR ZKP</Heading>
              <IconButton
                variant="outline"
                colorScheme="purple"
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
                  max={zkpBalance}
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
                <NumberInput defaultValue={10} max={30} clampValueOnBlur={false} width="100%">
                  <NumberInputField
                    bg="purple.700"
                    height="50px"
                    textAlign="right"
                    borderRadius="0"
                  />
                </NumberInput>
                <Text fontSize="xs" textAlign="right">
                  Available : 2.1342
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
                  onChange={date => setStartDate(date)}
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
                    lockTime < unlockRemainingTime || Number(zkpAmount) > Number(zkpBalance)
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
                colorScheme="purple"
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
      )}
    </Layout>
  );
};

export default StakePage;
