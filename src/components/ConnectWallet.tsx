import {Button, Icon} from '@chakra-ui/react';
import React from 'react';
import ConnectWalletModal from './ConnectWalletModal';
import {useDispatch, useSelector} from 'react-redux';
import ModalActions from 'actions/modal.actions';
import {RootState} from 'stores/reduxStore';
import {useAppDispatch} from 'hooks/hooks';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {BiWallet} from 'react-icons/bi';

const ConnectWallet = (props: any) => {
  const {connectWalletModalVisible} = useSelector((state: RootState) => state.Modal);
  const dispatch = useAppDispatch();

  return (
    <>
      <ConnectWalletModal
        visible={connectWalletModalVisible}
        onClose={() => dispatch(ModalActions.hideConnectWalletModal())}
      />
      <Button
        leftIcon={<Icon as={BiWallet} />}
        rightIcon={<ChevronRightIcon />}
        bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
        borderRadius="16px"
        fontFamily="Druk Wide Web"
        py="25px"
        onClick={() => dispatch(ModalActions.showConnectWalletModal())}
        width="auto !important"
        {...props}
      >
        Connect Wallet
      </Button>
    </>
  );
};

export default ConnectWallet;
