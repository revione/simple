import { state } from "+local"
import { ProposalOpenContract } from "types"
import { actual_track_contract } from "."

export const grafica_handler = (contract: ProposalOpenContract) => {
  const { entry_spot, exit_tick, profit } = contract

  if (entry_spot && !actual_track_contract.entry_spot) {
    actual_track_contract.entry_spot = entry_spot
    state.grafica.compras.push({ tick: entry_spot, type: "start" })
  }

  if (exit_tick && !actual_track_contract.exit_tick) {
    actual_track_contract.exit_tick = exit_tick
    const type = profit > 0 ? "won" : "lost"
    state.grafica.compras.push({ tick: exit_tick, type })
  }
}
