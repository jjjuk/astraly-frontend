import {HamburgerIcon, LockIcon} from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Flex,
  Image,
  useDisclosure,
  Link as ChakraLink,
  Stack,
  Hide,
  Text,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import {useStarknetReact} from '@web3-starknet-react/core';
import cx from 'classnames';
import React, {useEffect, useState} from 'react';

import styles from '../styles/Header.module.scss';
import ConnectWallet from 'components/ConnectWallet';
import {truncateAddress} from 'utils';
import Link from 'next/link';
import {MdHome, MdOutlineShoppingCart, MdOutlineHome, MdLockOutline} from 'react-icons/md';
import {BiRocket} from 'react-icons/bi';
import {useApi} from 'api';
import {useAppDispatch} from 'hooks/hooks';
import WalletConnectActions from 'actions/walletconnect.actions';
import AuthActions from 'actions/auth.actions';

interface Props {}

const Header = (props: Props) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const {account, deactivate, chainId} = useStarknetReact();
  const textColor = useColorModeValue('black', 'white');
  const [loading, setLoading] = useState(false);
  const {getAuthToken, getAccountDetails} = useApi();
  const dispatch = useAppDispatch();

  const login = async () => {
    try {
      setLoading(true);
      const token = await getAuthToken(account?.address);
      // const isModerator = await getIsModerator(account);

      dispatch(WalletConnectActions.connectWallet(token, false));
      dispatch(AuthActions.fetchStart());
      try {
        const {data} = await getAccountDetails(token);
        console.log(data);
        dispatch(AuthActions.fetchSuccess(data));
      } catch {
        dispatch(AuthActions.fetchFailed());
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    deactivate();
    dispatch(WalletConnectActions.disconnectWallet());
    dispatch(AuthActions.signOut());
  };

  useEffect(() => {
    if (account) {
      login();
    } else {
      handleSignOut();
    }
  }, [account, chainId]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px={0}
      py={6}
      color="white"
      {...props}
    >
      <Link href="/">
        <Flex align="center" mr={5}>
          <Image src="/images/logo.png" alt="zkPad" mr="4" h="57px" />
          <Heading fontSize="24px" mt="5px" color={textColor}>
            ZKPAD
          </Heading>
        </Flex>
      </Link>

      <Box display={{base: 'block', md: 'none'}} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{base: 'column', md: 'row'}}
        display={{base: isOpen ? 'block' : 'none'}}
        width={{base: 'full', md: 'auto'}}
        alignItems="center"
        flexGrow={1}
        mt={{base: 4, md: 0}}
      >
        <Flex gap="5px" color="purple.900">
          <Icon as={MdOutlineHome} mt="2px" />
          <Link href="/">Home</Link>
        </Flex>
        <Flex gap="5px" color="purple.900">
          <Icon as={BiRocket} mt="2px" />
          <Link href="/launchpad">Launchpad</Link>
        </Flex>
        <Flex gap="5px" color="purple.900">
          <Icon as={MdLockOutline} mt="2px" />
          <Link href="/stake">Lock</Link>
        </Flex>
        <Flex gap="5px" color="purple.900">
          <Icon as={MdOutlineShoppingCart} mt="2px" />
          <Link href="/buy">Buy ZKP</Link>
        </Flex>
        <ConnectWallet />
      </Stack>

      <Box display={{base: isOpen ? 'block' : 'none', md: 'block'}} mt={{base: 4, md: 0}}>
        <Stack
          direction={{base: 'column', md: 'row'}}
          display={{base: isOpen ? 'block' : 'none', md: 'flex'}}
          width={{base: 'full', md: 'auto'}}
          alignItems="center"
          flexGrow={1}
          mt={{base: 0}}
          spacing={{base: '0', md: '40px'}}
        >
          <Hide below="md">
            <Flex gap="5px" color="purple.900">
              <Icon as={MdHome} mt="2px" />
              <Link href="/">Home</Link>
            </Flex>
            <Flex gap="5px" color="purple.900">
              <Icon as={BiRocket} mt="2px" />
              <Link href="/launchpad">Launchpad</Link>
            </Flex>
            <Flex gap="5px" color="purple.900">
              <Icon as={MdLockOutline} mt="2px" />
              <Link href="/stake">Lock</Link>
            </Flex>
            <Flex gap="5px" color="purple.900">
              <Icon as={MdOutlineShoppingCart} mt="2px" />
              <Link href="/buy">Buy ZKP</Link>
            </Flex>
          </Hide>
          <Hide below="md">
            {account ? (
              <div className={cx(styles.account, styles.menuUser)} onClick={deactivate}>
                <div className={styles.profile}>
                  <div className={styles.address} data-title={truncateAddress(account.address)}>
                    {truncateAddress(account.address)}
                  </div>
                </div>
              </div>
            ) : (
              <ConnectWallet px="18px" py="12px" fontSize="14px" h="42px" />
            )}
          </Hide>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Header;
