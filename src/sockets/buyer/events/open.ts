import { state } from "+local"
import { store } from "+redux"

import { connected_buyer_socket } from "+redux/reducer/slices/sockets"

import { authorization, send_time_repet } from "../sends"

// Connection opened
export const open = (event: Event) => {
  store.dispatch(connected_buyer_socket())

  send_time_repet()

  authorization()
  //
}
