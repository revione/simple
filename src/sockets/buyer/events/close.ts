import { state } from "+local"
import { store } from "+redux"
import { disconnected_buyer_socket } from "+redux/reducer/slices/sockets"

import connect from "sockets/buyer"

export const close = (event: Event) => {
  if (state.logs.show_error_logs) {
    store.dispatch(disconnected_buyer_socket())
    console.log(":: socket buyer closed : ", { event })
  }
  if (state.reconnect) connect()
}
