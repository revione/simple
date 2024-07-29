import { store } from "+redux"
import { state } from "+local"

// here we gonna send the data
// without to rewrite the same code
export const send = (data: Object) => {
  if (state.logs.show_send_logs)
    console.log(":: socket observer ticks send : ", data)
  if (typeof state.sockets.observer === "undefined")
    return console.log("WebSocket observer ticks is undefined")
  state.sockets.observer.send(JSON.stringify(data))
}

// this function is just to ping with the time
// to avoid close the socket conection
const send_time = () => {
  send({ time: 1 })
}

// repeat the time request every 30 seconds
export const send_time_repet = () => {
  setInterval(() => {
    send_time()
  }, 30 * 1000)
}

export const subscribe_history = () => {
  const message = {
    ticks_history: store.getState().editables.symbol,
    count: 25,
    end: "latest",
    start: 1,
    style: "ticks",
    subscribe: 1
  }

  send(message)
}

export const forget_all = () => {
  const data = { forget_all: ["ticks"] }
  send(data)
}

export const forget_all_and_subscribe = () => {
  forget_all()
  subscribe_history()
}
