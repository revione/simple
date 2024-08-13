import { state } from "+local"
import { store } from "+redux"

import { disconnected_ticks_socket } from "+redux/reducer/slices/sockets"

export const close = () => {
  store.dispatch(disconnected_ticks_socket())
}
