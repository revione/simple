import { state } from "+local"
import { State, store } from "+redux"
import { disabled_purchase } from "+redux/reducer/slices/buyer"
import { buy } from "sockets/buyer/sends/buy"
import { make_proposals } from "sockets/buyer/sends/make_proposals"

export const process_new_purchase = ({
  info,
  allow_new_buy
}: {
  info: State["info"]
  allow_new_buy: boolean
}) => {
  if (!allow_new_buy) {
    state.app.waiting_for_proposal = false

    store.dispatch(disabled_purchase())

    info.round_loss_contracts = 0
    info.round_won_contracts = 0

    make_proposals()
  }

  allow_new_buy && buy()
}
