import { state } from "+local"
import { State } from "+redux"
import { numFix } from "utils"
import { set_initial_amount } from "sockets/buyer/utils/set_amounts"
import { forget_all } from "sockets/buyer/sends"

export const handle_win = ({
  info,
  sell_price,
  amount
}: {
  info: State["info"]
  sell_price: number
  amount: number
}) => {
  info.continue_won_contracts++
  info.round_won_contracts++
  info.total_won_contracts++
  info.continue_loss_contracts = 0
  info.position = 1

  state.info.total_win = numFix(sell_price + state.info.total_win)
  state.info.win_without_lost = numFix(
    sell_price - (state.info.accumulate_lost + amount)
  )
  state.info.accumulate_lost = 0
  state.info.total_won_app = numFix(state.info.total_win * 0.02)
  state.app.waiting_for_proposal = true

  forget_all()
  set_initial_amount()
}
