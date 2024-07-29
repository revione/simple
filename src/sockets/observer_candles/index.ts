import { message } from "./events/message"
import { open } from "./events/open"
import { close } from "./events/close"
import { error } from "./events/error"
import { state } from "+local"

const app_id = "35134"
const url = process.env.NEXT_PUBLIC_BRO
const uri = `${url}${app_id}`

const candles = () => {
  console.log(" :: socket observer launched")
  const ws = new WebSocket(uri)
  ws.onopen = open
  ws.onclose = close
  ws.onerror = error
  ws.onmessage = message
  state.sockets.observer = ws
}

export default candles
