import { store } from "+redux"
import { send } from "."

const basis = {
  payout: { basis: "payout" },
  stake: { basis: "stake" }
}

export const make_proposals = () => {
  const { amount, duration, duration_unit, symbol } = store.getState().editables
  const actualAccount = store.getState().access.actualAccount

  if (!actualAccount)
    return console.error("make_proposals: No actual account stablished.")

  const common_proposal = {
    subscribe: 1,
    proposal: 1,
    amount,
    duration,
    duration_unit,
    currency: actualAccount.cur,
    symbol
  }

  const proposal_call = {
    contract_type: "CALL",
    ...common_proposal,
    ...basis.stake
  }
  const proposal_put = {
    contract_type: "PUT",
    ...common_proposal,
    ...basis.stake
  }

  send(proposal_call)
  send(proposal_put)
}
