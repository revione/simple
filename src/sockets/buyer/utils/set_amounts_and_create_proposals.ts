import { set_initial_amount } from "./set_amounts"
import { forget_and_make_proposal } from "../sends"

export const set_amounts_and_renew_proposals = () => {
  set_initial_amount()
  forget_and_make_proposal()
}
