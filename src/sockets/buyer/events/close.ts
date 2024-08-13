import { state } from "+local"
import { store } from "+redux"

import connect from "sockets/buyer"

import { disconnected_buyer_socket } from "+redux/reducer/slices/sockets"

export const close = (event: Event) => {
  console.trace("buyer close")
  store.dispatch(disconnected_buyer_socket())
  if (state.reconnect) connect()
}
