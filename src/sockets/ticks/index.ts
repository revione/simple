import { message } from "./events/message"
import { open } from "./events/open"
import { close } from "./events/close"
import { error } from "./events/error"
import { state } from "+local"

const app_id = process.env.NEXT_PUBLIC_TICKS_ID
const url = process.env.NEXT_PUBLIC_BRO
const uri = `${url}${app_id}`

const ticks = () => {
  if (!state.sockets.run_sockets) return
  console.log(":: socket ticks launched")
  const ws = new WebSocket(uri)
  ws.onopen = open
  ws.onclose = close
  ws.onerror = error
  ws.onmessage = message
  state.sockets.ticks = ws
}

export default ticks
