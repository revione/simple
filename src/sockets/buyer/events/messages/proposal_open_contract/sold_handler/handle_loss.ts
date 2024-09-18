import { state } from "+local"
import { State, store } from "+redux"
import { disabled_purchase } from "+redux/reducer/slices/buyer"
import { rewrite_editables } from "+redux/reducer/slices/editables"
import { set_initial_amount } from "sockets/buyer/utils/set_amounts"
import { numFix } from "utils"

export const set_multiplied_amount = () => {
  const { amount, multiplier } = store.getState().editables
  const new_amount = Number((amount * (multiplier + 2)).toFixed(2))
  store.dispatch(rewrite_editables({ amount: new_amount }))
}

export const handle_loss = ({ info }: { info: State["info"] }) => {
  const { max_lost, amount } = store.getState().editables
  info.continue_won_contracts = 0
  info.round_loss_contracts++
  info.total_loss_contracts++
  info.continue_loss_contracts++
  info.position++

  state.info.total_lost = numFix(amount + state.info.total_lost)

  check_balance()

  if (info.position > info.max_position) info.max_position = info.position

  if (!(info.continue_loss_contracts < max_lost)) {
    store.dispatch(disabled_purchase())
    set_initial_amount()
    console.log(":: limite alcanzado : ", max_lost) // TODO: show a notification.
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
