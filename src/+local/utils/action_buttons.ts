// actions

import { state } from "+local"
import { store } from "+redux"
import { disabled_purchase, enable_purchase } from "+redux/reducer/slices/buyer"
import { buy } from "sockets/buyer/sends/buy"

export const play = () => {
  state.internal.contract_type = "CALL"
  store.dispatch(enable_purchase())
  buy()
}

export const pausa = () => {
  store.dispatch(disabled_purchase())
}

export const stop = () => {
  store.dispatch(disabled_purchase())
}
