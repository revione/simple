import { send_time_repet, subscribe_ohcl_with_history } from "../sends"

// Connection opened
export const open = () => {
  send_time_repet()
  subscribe_ohcl_with_history()
}
