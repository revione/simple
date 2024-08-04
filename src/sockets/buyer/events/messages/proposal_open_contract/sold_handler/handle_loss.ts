import { state } from "+local"
import { State, store } from "+redux"
import { disabled_purchase } from "+redux/reducer/slices/buyer"
import { rewrite_editables } from "+redux/reducer/slices/editables"
import { set_initial_amount } from "sockets/buyer/utils/set_amounts"
import { numFix } from "utils"

export const set_multiplied_amount = () => {
  const {
    amount,
    max_lost: { dopel_multiplier },
  } = store.getState().editables
  const new_amount = Number((amount * dopel_multiplier).toFixed(2))
  store.dispatch(rewrite_editables({ amount: new_amount }))
}

export const handle_loss = ({
  info,
  amount,
}: {
  info: State["info"]
  amount: number
}) => {
  const { max_loss_count } = state.internal
  info.continue_won_contracts = 0
  info.round_loss_contracts++
  info.total_loss_contracts++
  info.continue_loss_contracts++
  info.position++
  state.info.total_lost = numFix(amount + state.info.total_lost)
  state.info.accumulate_lost = numFix(amount + state.info.accumulate_lost)

  check_balance()

  if (info.position > info.max_position) info.max_position = info.position

  if (!(info.continue_loss_contracts < max_loss_count)) {
    store.dispatch(disabled_purchase())
    set_initial_amount()
    console.log(":: limite alcanzado : ", max_loss_count)
  }
}

const check_balance = () => {
  const { type_use_balance, custom_balance, total_balance } =
    store.getState().editables

  if (type_use_balance === "custom") {
    if (custom_balance <= 0) {
      store.dispatch(disabled_purchase())
      set_initial_amount()
      console.log(":: Sin dinero : ", custom_balance)
    }
  } else {
    if (total_balance <= 0) {
      store.dispatch(disabled_purchase())
      set_initial_amount()
      console.log(":: Sin dinero : ", custom_balance)
    }
  }
}
