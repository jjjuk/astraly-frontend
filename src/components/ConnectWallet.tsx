import {Button} from '@chakra-ui/react';
import React from 'react';
import ConnectWalletModal from './ConnectWalletModal';
import {useDispatch, useSelector} from 'react-redux';
import ModalActions from 'actions/modal.actions';
import {RootState} from 'stores/reduxStore';
import {useAppDispatch} from 'hooks/hooks';

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
        borderColor="none"
        bg="purple.900"
        borderRadius="4px"
        color="#fff"
        _hover={{bg: 'purple.700'}}
        _active={{}}
        m="auto"
        onClick={() => dispatch(ModalActions.showConnectWalletModal())}
        {...props}
      >
        Connect Wallet
      </Button>
    </>
  );
};

export default ConnectWallet;
