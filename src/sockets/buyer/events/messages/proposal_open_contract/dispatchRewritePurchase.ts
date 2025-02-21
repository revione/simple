import { store } from "+redux"
import { rewrite_purchase } from "+redux/reducer/slices/purchases"
import { ProposalOpenContract } from "types"
import { numFix } from "utils"

let continues = 0
let firstWin = false

export const dispatchRewritePurchase = (contract: ProposalOpenContract) => {
  if (contract.is_sold) {
    continues = numFix(continues + contract.profit)

    if (contract.status === "won" && !firstWin) {
      firstWin = true
    }

    if (contract.status === "lost" && firstWin) {
      continues = -contract.buy_price
      firstWin = false
    }
  }

  const data_for_update_purchase = {
    contract_id: contract.contract_id,
    buy_price: contract.buy_price,
    payout: contract.payout,
    profit: contract.profit,
    profit_percentage: contract.profit_percentage,
    sell_price: contract.sell_price,
    status: contract.status,
    contract_type: contract.contract_type,
    is_sold: contract.is_sold,
    position: store.getState().info.position,
    continues
  }

  store.dispatch(rewrite_purchase(data_for_update_purchase))
}
