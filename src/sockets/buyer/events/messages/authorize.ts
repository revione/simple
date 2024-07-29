import { store } from "+redux"

import { AuthorizeData } from "types"

import { numFix } from "utils"

import { subscribe_transactions } from "sockets/buyer/sends"
import { set_initial_amount } from "sockets/buyer/utils/set_amounts"

import { set_total_balance } from "+redux/reducer/slices/editables"
import { make_proposals } from "sockets/buyer/sends/make_proposals"

export const authorize = (data: AuthorizeData) => {
  if (data.error) {
    console.error(":: authorize error: ", { data })
    window.location.replace("/")
    return
  }

  const fixedBalance = numFix(data.authorize.balance)
  if (store.getState().editables.total_balance !== fixedBalance)
    store.dispatch(set_total_balance(fixedBalance))

  set_initial_amount()

  subscribe_transactions()

  make_proposals()
}
