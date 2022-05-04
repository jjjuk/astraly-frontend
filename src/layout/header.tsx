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
  Text
} from '@chakra-ui/react';
import {useStarknetReact} from '@web3-starknet-react/core';
import cx from 'classnames';
import React from 'react';

import styles from '../styles/Header.module.scss';
import ConnectWallet from 'components/ConnectWallet';
import {truncateAddress} from 'utils';
import Link from 'next/link';

interface Props {}

const Header = (props: Props) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const {account, deactivate} = useStarknetReact();

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
          <Heading fontSize="24px" mt="5px">
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
        <Flex fontWeight="bold" gap="5px">
          <LockIcon mt="2px" />
          <Link href="/stake">Lock</Link>
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
            <Flex fontWeight="bold" gap="5px">
              <LockIcon mt="2px" />
              <Link href="/stake">Lock</Link>
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
