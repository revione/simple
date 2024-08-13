import { buy } from "sockets/buyer/sends/buy"
import { makeDecision } from "./utils/analisis3"

import { Tick } from "types/History"

import { state_observer } from "+local/lists"

interface UpdateTicks {
  echo_req: any
  msg_type: "tick"
  subscription: {
    id: string // "adab59d9-a81b-6b1f-9f32-a6967d6e13b8"
  }
  tick: Tick
}

export const update_ticks = (data: UpdateTicks) => {
  state_observer.updateTicks(data.tick.quote)

  // set CALL or PUT or wait
  makeDecision()

  buy()
}
