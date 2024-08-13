import { state_observer } from "+local/lists"

export const set_history = (data: {
  echo_req: any
  msg_type: "history"
  pip_size: number // 2,
  subscription: {
    id: string // "adab59d9-a81b-6b1f-9f32-a6967d6e13b8"
  }
  history: {
    prices: number[]
    times: number[]
  }
}) => {
  // console.log(JSON.stringify(data.history.prices, null, 2))
  state_observer.initTicks(data.history.prices)
}
