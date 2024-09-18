import { state } from "+local"
import { store } from "+redux"

import { numFix } from "utils"

import { ProposalOpenContract } from "types"

import { rewrite_editables } from "+redux/reducer/slices/editables"
import { rewrite_info } from "+redux/reducer/slices/info"

import { handle_loss } from "./sold_handler/handle_loss"
import { handle_win } from "./sold_handler/handle_win"
import { process_new_purchase } from "./sold_handler/process_new_purchase"
import { false_is_purchase_running } from "+redux/reducer/slices/buyer"

let list_contracts_running: number[] = []

export const sold_handler = (contract: ProposalOpenContract) => {
  store.dispatch(false_is_purchase_running())

  const { contract_id, profit, status, sell_price } = contract

  const info = { ...store.getState().info }

  const { total_balance, purchase_type, custom_purchase, custom_balance } =
    store.getState().editables

  const { amount } = state.internal

  info.total_profit = numFix(info.total_profit + profit)

  store.dispatch(
    rewrite_editables({
      total_balance: numFix(total_balance + profit),
      custom_balance: numFix(custom_balance + profit),
    })
  )

  info.total_contracts++

  if (status === "lost") handle_loss({ info, amount })
  if (status === "won") handle_win({ info, sell_price, amount })

  list_contracts_running = list_contracts_running.filter(
    (id) => id !== contract_id
  )

  const allow_new_buy = should_allow_new_buy({
    purchase_type,
    round_won_contracts: info.round_won_contracts,
    custom_purchase,
  })

  if (list_contracts_running.length === 0)
    process_new_purchase({ info, allow_new_buy })

  store.dispatch(rewrite_info(info))
}

export const should_allow_new_buy = ({
  purchase_type,
  round_won_contracts,
  custom_purchase,
}: {
  purchase_type: string
  round_won_contracts: number
  custom_purchase: number
}) => {
  switch (purchase_type) {
    case "justOne":
      return round_won_contracts < 1
    case "multiple":
      return round_won_contracts < custom_purchase
    case "infinite":
      return true
    default:
      console.warn(":: process_new_purchase, Unknown purchase type:", {
        purchase_type,
      })
      return false
  }
}
