import { store } from "+redux"

import { disconnected_ticks_socket } from "+redux/reducer/slices/sockets"

export const close = () => {
  console.trace("ticks close")
  store.dispatch(disconnected_ticks_socket())
}
