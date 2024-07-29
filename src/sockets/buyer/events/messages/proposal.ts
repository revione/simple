import { state } from "+local"

import { buy } from "sockets/buyer/sends/buy"

import type { ProposalData } from "types"

export const proposal = (data: ProposalData) => {
  const {
    echo_req: { contract_type },
    proposal
  } = data

  if (contract_type === "CALL") state.proposals.CALL = proposal
  if (contract_type === "PUT") state.proposals.PUT = proposal

  state.app.waiting_for_proposal = false

  buy()
}
