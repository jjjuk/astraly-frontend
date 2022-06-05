import ToastConstants from '../constants/toast.constants'
import { ToastNotification } from '../components/ui/Toast/utils'

const initialState: {
  toasts: ToastNotification[]
} = {
  toasts: [],
}

export function Toast(state = initialState, action: any) {
  if (action.type === ToastConstants.ADD_TOAST) {
    return {
      ...state,
      toasts: [...state.toasts, action.toast],
    }
  }

  if (action.type === ToastConstants.REMOVE_TOAST) {
    return {
      ...state,
      toasts: state.toasts.filter((x) => x.id != action.id),
    }
  }

  return state
}
