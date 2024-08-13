import { state } from "+local"
import { store } from "+redux"

import { connected_ticks_socket } from "+redux/reducer/slices/sockets"

import { subscribe_history } from "../sends"

// Connection opened
export const open = (event: Event) => {
  store.dispatch(connected_ticks_socket())
  subscribe_history()
}
