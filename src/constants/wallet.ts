// import COINBASE_ICON_URL from 'assets/svgs/coinbase.svg';
import {argentXConnector} from '../connectors';

// import BRAAVOS_ICON from 'assets/imgs/walletconnect.png';

export const SUPPORTED_WALLETS: any = {
  ARGENT_X: {
    connector: argentXConnector,
    name: 'Argent X',
    icon: '/assets/imgs/argent_x.png'
  }
};
