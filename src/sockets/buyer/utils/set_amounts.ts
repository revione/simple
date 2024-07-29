import { store } from "+redux"
import { set_amount } from "+redux/reducer/slices/editables"

export const set_initial_amount = () => {
  const STRICT_MIN_AMOUNT = 0.35
  const {
    amount,
    total_balance,
    custom_balance,
    type_use_balance,
    initial_multiplier
  } = store.getState().editables

  const balance = type_use_balance === "custom" ? custom_balance : total_balance

  let new_amount = Number((balance * initial_multiplier).toFixed(2))

  new_amount = new_amount < STRICT_MIN_AMOUNT ? STRICT_MIN_AMOUNT : new_amount
  if (amount !== new_amount) store.dispatch(set_amount(new_amount))
}
