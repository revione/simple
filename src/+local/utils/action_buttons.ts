// actions

import { state } from "+local"
import { store } from "+redux"
import { disabled_purchase, enable_purchase } from "+redux/reducer/slices/buyer"
import { reset_amount } from "+redux/reducer/slices/editables"
import { forget_and_make_proposal } from "sockets/buyer/sends"
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
  store.dispatch(reset_amount())
  store.dispatch(disabled_purchase())
  forget_and_make_proposal()
}
