import { compact, isEmpty } from "lodash"
import { ProposalOpenContract } from "types"

import { grafica_handler } from "./grafica_handler"
import { sold_handler } from "./sold_handler"
import { dispatchRewritePurchase } from "./dispatchRewritePurchase"
import { state } from "+local"

export let list_contracts_running: number[] = []
export const initial_track_contract = {
  entry_spot: undefined as number | undefined,
  exit_tick: undefined as number | undefined
}
export let actual_track_contract = { ...initial_track_contract }

export const proposal_open_contract = (contract?: ProposalOpenContract) => {
  depureContract(contract)
}

const depureContract = (contract?: ProposalOpenContract) => {
  if (isEmpty(contract) || !contract) {
    if (state.app.first_time_proposal_header) {
      state.app.first_time_proposal_header = false
      return
    }
    // It might be the first time when the app init that there is no open contract.
    return console.log(
      ":: proposal_open_contract, empty contrat or no contract"
      // {
      //   contract,
      //   "isEmpty(contract)": isEmpty(contract),
      //   "!contract": !contract
      // }
    )
  }

  handleContract(contract)
}

const handleContract = (contract: ProposalOpenContract) => {
  dispatchRewritePurchase(contract)

  grafica_handler(contract)

  const { contract_id, is_sold } = contract

  if (contract.is_sold) actual_track_contract = { ...initial_track_contract }

  if (!list_contracts_running.includes(contract_id))
    list_contracts_running = compact([...list_contracts_running, contract_id])

  if (is_sold) sold_handler(contract)
}
