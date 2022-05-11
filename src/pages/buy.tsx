import {Box, Button, Flex, Heading, Text} from '@chakra-ui/react';
import {useStarknetReact} from '@web3-starknet-react/core';
import {useFaucetContract} from 'contracts/faucet';
import {ethers} from 'ethers';
import Layout from 'layout';
import React, {useEffect, useMemo, useState} from 'react';
import {uint256} from 'starknet';

const BuyPage = () => {
  const {account} = useStarknetReact();
  const [mintAmount, setMintAmount] = useState('0');
  const [roundTimer, setRoundTimer] = useState('...');
  const [unlockTime, setUnlockTime] = useState(0);
  const [allowed, setAllowed] = useState(true);

  const {getWait, getAmount, getUnlockTime, allowedToWithdraw, faucetTransfer} =
    useFaucetContract();

  const handleTransfer = async () => {
    try {
      await faucetTransfer();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInfo = async () => {
    try {
      const _amount = await getAmount();
      const _formattedAmount = ethers.utils.formatUnits(
        uint256.uint256ToBN(_amount.res).toString(),
        'ether'
      );
      setMintAmount(_formattedAmount);

      const _allowedToWithdraw = await allowedToWithdraw(account?.address);
      setAllowed(_allowedToWithdraw.success.toNumber() as boolean);

      const _unlockTime = await getUnlockTime(account?.address);
      setUnlockTime(_unlockTime.res.toNumber());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (account) fetchInfo();
  }, [account]);

  useEffect(() => {
    const _interval = setInterval(() => {
      const _remainingTime = new Date(unlockTime * 1000).getTime() - new Date().getTime();
      const minutes = Math.floor((_remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((_remainingTime % (1000 * 60)) / 1000);
      setRoundTimer(`${minutes}m${seconds}s`);
    }, 1000);

    return () => clearInterval(_interval);
  }, [unlockTime]);

  return (
    <Layout>
      <Flex
        borderRadius="24px"
        bg="white"
        p={10}
        width="30%"
        justifyContent="center"
        flexDir="column"
        margin="auto"
        gap="10px"
      >
        <Heading size="sm">Mint Amount: {mintAmount} ZKP</Heading>
        <Button
          bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
          boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
          borderRadius="16px"
          fontFamily="Druk Wide Web"
          py="25px"
          width="auto !important"
          color="white"
          disabled={!allowed}
          onClick={handleTransfer}
        >
          Mint ZKP
        </Button>
        {!allowed && <Text>You will be able to whitdraw in {roundTimer}</Text>}
      </Flex>
    </Layout>
  );
};

export default BuyPage;
