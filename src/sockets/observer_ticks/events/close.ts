import { state } from "+local"
import { store } from "+redux"

import { disconnected_ticks_socket } from "+redux/reducer/slices/sockets"

// import connect from "../."

export const close = (event: Event) => {
  if (state.logs.show_error_logs) {
    console.log(":: socket observer ticks closed : ", { event })

    store.dispatch(disconnected_ticks_socket())
  }
  // connect()
}
