import { store } from "+redux"
import { state } from "+local"
import { make_proposals } from "./make_proposals"
// Funciones que iremos usando en el tiempo

// aqui vamos a poder enviar la data
// sin que tengamos que escribir todo lo mismo una y otra vez
export const send = (data: object) => {
  if (!store.getState().sockets.buyer.connected) return
  if (state.logs.show_send_logs) console.log(":: socket buyer send : ", data)
  if (typeof state.sockets.buyer === "undefined")
    return console.log(" state.sockets.buyer not defined", data)
  state.sockets.buyer.send(JSON.stringify(data))
}

export const send_time = () => {
  send({ time: 1 })
}

export const send_time_repet = () => {
  setInterval(() => {
    send_time()
  }, 30 * 1000)
}

// autorizacion
export const authorization = () => {
  const actualAccount = store.getState().access.actualAccount
  if (!actualAccount)
    return console.error("authorization: No actual account stablished.")

  send({ authorize: actualAccount.token })
}

export const forget_all = () => {
  send({ forget_all: ["proposal"] })
}

//

export const forget_and_make_proposal = () => {
  forget_all()
  make_proposals()
}

//

export const subscribe_transactions = () => {
  send({ proposal_open_contract: 1, subscribe: 1 })
}

// logout deriv
export const logoutDeriv = () => {
  send({ logout: 1 })
}
