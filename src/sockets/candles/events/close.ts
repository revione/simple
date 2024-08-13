import { state } from "+local"
import connect from "sockets/candles"

export const close = (event: Event) => {
  if (state.reconnect) connect()
}
