import { resetProposals, state } from "+local"
import { store } from "+redux"

import { isEmpty } from "lodash"

import { set_multiplied_amount } from "../events/messages/proposal_open_contract/sold_handler/handle_loss"
import { make_proposals } from "./make_proposals"

import { true_is_purchase_running } from "+redux/reducer/slices/buyer"

import { send } from "."

export const buy = () => {
  const {
    internal: { contract_type },
    app: { waiting_for_proposal }
  } = state
  const { purchase_enabled, purchase_running } = store.getState().buyer

  if (!purchase_enabled) {
    // console.log(":: buy : purchase is not enabled")
    return
  }

  if (purchase_running) {
    console.log(":: buy : purchase is running")
    return
  }

  if (waiting_for_proposal) {
    console.log(":: buy : waiting_for_proposal")
    return
  }

  if (!contract_type) {
    console.log(`:: buy, contract_type is not defined`, { contract_type })
    return
  }

  if (isEmpty(state.proposals[contract_type])) {
    console.log(
      `:: buy, proposal with contract_type "${contract_type}" is empty`,
      {
        contract_type,
        proposals: state.proposals,
        isEmpty: isEmpty(state.proposals[contract_type]),
        [contract_type]: state.proposals[contract_type]
      }
    )
    return
  }

  if (
    !state.proposals[contract_type].id ||
    !state.proposals[contract_type].ask_price
  ) {
    console.log(`
    no defined...
    buy: ${state.proposals[contract_type].id}
    price: ${state.proposals[contract_type].ask_price}
  `)
    return
  }

  const data = {
    buy: state.proposals[contract_type].id,
    price: state.proposals[contract_type].ask_price
  }

  send(data)

  resetProposals()
  set_multiplied_amount()
  store.dispatch(true_is_purchase_running())
  make_proposals()
}
