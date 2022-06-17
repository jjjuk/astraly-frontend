import React, { useEffect, useState } from 'react';
import { Button, Flex, Image, NumberInput, NumberInputField, Spinner, Text } from '@chakra-ui/react';
import { useStarknetReact } from '@web3-starknet-react/core';
import { ethers } from 'ethers';
import { uint256 } from 'starknet';
import { useTokenContract } from 'contracts';
import { useLotteryTokenContract } from 'contracts/lottery';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/reduxStore';
import { useApi } from 'api';

const ClaimOrBurn = ({ burn, idoID }: any) => {
  const { account } = useStarknetReact();
  const [xzkpBalance, setXZkpBalance] = useState('0');
  const [ticketsBalance, setTicketsBalance] = useState('0');
  const [amountToBurn, setAmountToBurn] = useState('0');
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [burning, setBurning] = useState(false);

  const [merkleProof, setMerkleProof] = useState<string[]>([]);

  const { authToken } = useSelector((state: RootState) => state.ConnectWallet);
  const { user } = useSelector((state: RootState) => state.Auth);

  const { getXZKPBalance } = useTokenContract();
  const {
    claimLotteryTickets,
    burn: burnTickets,
    getTicketsBalance,
    burnWithQuest
  } = useLotteryTokenContract();

  const { fetchProof } = useApi();

  const handleClaimTickets = async () => {
    try {
      setClaiming(true);
      const tx = await claimLotteryTickets(idoID);
      console.log(tx);
      setClaiming(false);
    } catch (e) {
      console.error(e);
      setClaiming(false);
    }
  };

  const handleBurnTickets = async () => {
    try {
      setBurning(true);
      if (user.questsCompleted.length === 0) {
        const tx = await burnTickets(account, idoID, amountToBurn);
        console.log(tx);
      } else {
        const tx = await burnWithQuest(
          account,
          idoID,
          amountToBurn,
          user.questsCompleted.length,
          merkleProof
        );
        console.log(tx);
      }
      setBurning(false);
    } catch (e) {
      console.error(e);
      setBurning(false);
    }
  };

  const fetchBalances = async () => {
    try {
      setLoading(true);
      const _xbalance = await getXZKPBalance(account?.address);
      const _xformattedBalance = ethers.utils.formatUnits(
        uint256.uint256ToBN(_xbalance.balance).toString(),
        'ether'
      );
      setXZkpBalance(_xformattedBalance);

      const _ticketsBalance = await getTicketsBalance(account?.address, idoID);
      console.log(_ticketsBalance);
      setTicketsBalance(uint256.uint256ToBN(_ticketsBalance.balance).toString());
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const fetchQuestsInfo = async () => {
    try {
      const proof = await fetchProof(authToken, idoID);
      setMerkleProof(proof.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (account?.address) {
      fetchBalances();
    }
  }, [account]);

  useEffect(() => {
    if (authToken) {
      fetchQuestsInfo();
    }
  }, [authToken]);

  return (
    <Flex width={'100%'} bg="#fff" border={'2px #fff solid'} borderRadius="24px" flexDir={'column'}>
      <Flex
        bg={'#FAF3FF'}
        borderRadius="24px"
        width={'100%'}
        padding="25px"
        gridGap={'8px'}
        flexDir="column"
      >
        {burn ? (
          <Text
            fontFamily="Druk Wide Web"
            fontWeight="700"
            fontSize="24px"
            lineHeight="31px"
            color="#370063"
          >
            Lottery tickets to burn
          </Text>
        ) : (
          <Text
            fontFamily="Druk Wide Web"
            fontWeight="700"
            fontSize="24px"
            lineHeight="31px"
            color="#370063"
          >
            Total Claimable Tickets
          </Text>
        )}
        <Flex gridGap={'20px'}>
          <Text fontWeight="750" fontSize="16px" lineHeight="22px" color="#9D69DE">
            Available
          </Text>
          <Text
            fontFamily="Druk Wide Web"
            fontWeight="700"
            fontSize="16px"
            lineHeight="21px"
            color="#8F00FF"
          >
            {burn
              ? loading
                ? '...'
                : Number(ticketsBalance)
              : loading
                ? '...'
                : Math.floor(Math.pow(Number(xzkpBalance), 0.6))}
          </Text>
        </Flex>
      </Flex>
      {burn ? (
        <Flex flexDir={'row'} padding="25px" gridGap={'16px'}>
          <NumberInput
            max={Number(ticketsBalance)}
            clampValueOnBlur={false}
            width="100%"
            onChange={(valueString: string) => setAmountToBurn(valueString)}
            value={amountToBurn}
            position={'relative'}
          >
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
              left="10px"
              top={'20px'}
              fontFamily="Druk Wide Web"
              fontWeight="700"
              fontSize="12px"
              color="#9D69DE"
              zIndex={'10'}
            >
              Tickets
            </Text>
          </NumberInput>
          <Button
            leftIcon={<Image src="/assets/imgs/fire.png" height="20px" />}
            bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
            height="56px"
            borderRadius="16px"
            boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
            width="100%"
            fontFamily="Druk Wide Web"
            py="25px"
            color="white"
            _hover={{ bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)' }}
            onClick={handleBurnTickets}
          >
            {burning ? <Spinner /> : 'Burn Tickets'}
          </Button>
        </Flex>
      ) : (
        <Flex flexDir={'row'} padding="25px" gridGap={'16px'}>
          <Button
            leftIcon={<Image src="/assets/imgs/upload.png" height="20px" />}
            bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
            borderRadius="16px"
            boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
            width="100%"
            fontFamily="Druk Wide Web"
            py="25px"
            color="white"
            _hover={{ bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)' }}
            onClick={handleClaimTickets}
          >
            {claiming ? <Spinner /> : 'Claim Tokens'}
          </Button>
          <Button
            leftIcon={<Image src="/assets/imgs/locker.png" height="20px" />}
            bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
            borderRadius="16px"
            boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
            width="350px"
            fontFamily="Druk Wide Web"
            py="25px"
            color="white"
            _hover={{ bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)' }}
          >
            Lock More ASTR
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default ClaimOrBurn;
