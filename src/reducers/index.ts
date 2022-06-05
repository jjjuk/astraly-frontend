import { combineReducers } from 'redux'

import { Auth } from './auth.reducers'
import { ConnectWallet } from './connectwallet.reducers'
import { Modal } from './modal.reducers'
import { Toast } from './toast.reducers'
// import { Collections } from './collections.reducers';

const rootReducer = combineReducers({
  Auth,
  ConnectWallet,
  Modal,
  Toast,
  // Collections,
})

export default rootReducer
