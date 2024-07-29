import { store } from "+redux"

import type { BuyData, AddPurchaseRedux } from "types"

import { set_balance } from "+redux/reducer/slices/info"
import { add_purchase } from "+redux/reducer/slices/purchases"

import { numFix } from "utils"

export const buy = (data: BuyData) => {
  const { contract_id, buy_price, payout, balance_after } = data.buy

  const purchase: AddPurchaseRedux = {
    contract_id,
    buy_price,
    payout
  }

  store.dispatch(add_purchase(purchase))

  store.dispatch(set_balance(numFix(balance_after)))
}
