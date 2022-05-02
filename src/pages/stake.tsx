import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Spinner,
  Text
} from '@chakra-ui/react';
import {useStarknetReact} from '@web3-starknet-react/core';
import {ethers} from 'ethers';
import type {NextPage} from 'next';
import {forwardRef, useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {number, uint256} from 'starknet';

import Layout from '../layout';

import 'react-datepicker/dist/react-datepicker.css';
import {CalendarIcon} from '@chakra-ui/icons';

import {useTokenContract} from 'contracts';
import {useStakingContract} from 'contracts/staking';

const StakePage: NextPage = () => {
  const {account} = useStarknetReact();
  const [startDate, setStartDate] = useState(new Date());
  const [zkpBalance, setZkpBalance] = useState('0');
  const [previewXZKP, setPreviewXZKP] = useState('0');
  const [updatingPreview, setUpdatingPreview] = useState(false);
  const [locking, setLocking] = useState(false);
  const [zkpAmount, setZKPAmount] = useState('10.0');
  const {getZKPBalance} = useTokenContract();
  const {previewDeposit, depositForTime} = useStakingContract();

  const fetchBalances = async () => {
    try {
      const _balance = await getZKPBalance(account?.address);
      const _formattedBalance = ethers.utils.formatUnits(
        uint256.uint256ToBN(_balance.balance).toString(),
        'ether'
      );
      setZkpBalance(_formattedBalance);
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
      console.log(_daysPassed);
      const tx = await depositForTime(zkpAmount, account, _daysPassed);
      console.log(tx);
      setLocking(false);
    } catch (e) {
      console.error(e);
      setLocking(false);
    }
  };

  useEffect(() => {
    if (account?.address) fetchBalances();
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
      <Flex gap="20px">
        <Flex bg="#8f00ff" width="40%" p={7} flexDir="column" gap="10px" margin="50px 0">
          <Heading size="md">LOCK YOUR ZKP</Heading>
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

          <Button
            borderRadius="none"
            bg="none"
            color="white"
            border="2px solid"
            borderColor="purple.700"
            fontWeight="bold"
            mt={6}
            onClick={handleLock}
          >
            {locking ? <Spinner /> : 'Lock'}
          </Button>
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
                {updatingPreview ? '...' : Math.round(Math.pow(Number(previewXZKP), 0.6))}
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
    </Layout>
  );
};

export default StakePage;
