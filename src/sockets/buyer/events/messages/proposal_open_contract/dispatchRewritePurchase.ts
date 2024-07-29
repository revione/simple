import { store } from "+redux"
import { rewrite_purchase } from "+redux/reducer/slices/purchases"
import { ProposalOpenContract } from "types"

export const dispatchRewritePurchase = (contract: ProposalOpenContract) => {
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
    position: store.getState().info.position
  }

  store.dispatch(rewrite_purchase(data_for_update_purchase))
}
