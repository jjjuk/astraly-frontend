import React, {useEffect, useState} from 'react';
import {Button, Flex, Image, Text} from '@chakra-ui/react';
import {useStarknetReact} from '@web3-starknet-react/core';
import {ethers} from 'ethers';
import {uint256} from 'starknet';
import {useTokenContract} from 'contracts';
import {useLotteryTokenContract} from 'contracts/lottery';

const ClaimOrBurn = ({burn, idoID}: any) => {
  const {account} = useStarknetReact();
  const [xzkpBalance, setXZkpBalance] = useState('0');
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const {getXZKPBalance} = useTokenContract();
  const {claimLotteryTickets} = useLotteryTokenContract();

  const handleClaimTokens = async () => {
    try {
      setClaiming(true);
      const tx = await claimLotteryTickets(idoID);

      setClaiming(false);
    } catch (e) {
      console.error(e);
      setClaiming(false);
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
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account?.address) {
      fetchBalances();
    }
  }, [account]);

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
            Total Claimable Tickets
          </Text>
        ) : (
          <Text
            fontFamily="Druk Wide Web"
            fontWeight="700"
            fontSize="24px"
            lineHeight="31px"
            color="#370063"
          >
            Lottery tickets to burn
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
            {loading ? '...' : Math.round(Math.pow(Number(xzkpBalance), 0.6))}
          </Text>
        </Flex>
      </Flex>
      {burn ? (
        <Flex flexDir={'row'} padding="25px">
          ayooooo
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
            _hover={{bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)'}}
            onClick={handleClaimTokens}
          >
            Claim Tokens
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
            _hover={{bg: 'linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)'}}
          >
            Lock More ZKP
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default ClaimOrBurn;
