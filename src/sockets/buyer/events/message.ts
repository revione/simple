import { resetProposals, state } from "+local"
import { store } from "+redux"

import type { Data, AuthorizeData, BuyData, ProposalData } from "types"

import { authorize } from "./messages/authorize"
import { proposal_open_contract } from "./messages/proposal_open_contract"
import { buy } from "./messages/buy"
import { proposal } from "./messages/proposal"

import { make_proposals } from "../sends/make_proposals"

import { disabled_purchase } from "+redux/reducer/slices/buyer"

// import { convertidor_de_hora } from "utils"

// Messages
export const message = (messageEvent: MessageEvent<string>) => {
  // console.log(":: socket message : ", messageEvent);

  const data: Data = JSON.parse(messageEvent.data)

  // console.log(data.msg_type)
  // console.log(data)

  if (data.error) {
    store.dispatch(disabled_purchase())
    console.log(":: socket buyer error message : ", { data })
    return
  }

  const { msg_type } = data

  switch (msg_type) {
    case "authorize":
      authorize(data as AuthorizeData)
      break

    case "proposal_open_contract":
      proposal_open_contract(data.proposal_open_contract)
      break

    case "buy":
      buy(data as BuyData)
      break

    case "forget_all":
      forget_all()
      break

    case "proposal": // this function will be trigger after the make_proposals
      proposal(data as ProposalData)
      break

    case "time":
      time()
      break

    default:
      console.log(":: socket buyer message default : ", data)
      break
  }
}

const forget_all = () => {
  resetProposals()
  if (state.app.waiting_for_proposal) make_proposals()
}

const time = () => {}
