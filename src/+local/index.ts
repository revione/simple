import type { Candle, Contract_type, OHLC, Proposal } from "types"

const initialProposals = {
  CALL: {} as Proposal,
  PUT: {} as Proposal,
}

export const state = {
  activeAccount: 0,
  deriv: [] as { acct: any; cur: any; token: any }[],

  internal: {
    contract_type: "" as Contract_type | "",

    multiplicador_del_balance_a_usar: 0.00175,

    initial_amount: 0.35,
    amount: 0.35,

    multiplicador1: 2.24,
    multiplicador2: 2.24,
    multiplicador3: 2.24,
  },

  candles: [] as Candle[],

  ohlc: {} as OHLC,

  proposals: { ...initialProposals },

  permisos: {
    iniciar: false,
    guardar: false,
    reiniciar: false,
  },

  analista: {
    analizar: false,
  },

  observer: {
    observar: false,
  },

  sockets: {
    run_sockets: false,
    buyer: <WebSocket | undefined>undefined,
    ticks: <WebSocket | undefined>undefined,
    candles: <WebSocket | undefined>undefined,
  },

  grafica: {
    compras: [] as {
      tick: number
      type: "start" | "inprocess" | "won" | "lost" | "open" | "ni idea"
    }[],
  },

  buyer: {
    type: "just-one" as "just-one" | "custom" | "ilimit",
    customNumber: 10,
  },

  info: {
    total_win: 0,
    total_lost: 0,
    accumulate_lost: 0,
    win_without_lost: 0,
    total_won_app: 0,
  },

  app: {
    first_time_proposal_header: true, // this just to avoid the first empty propoasl console
    waiting_for_proposal: false, // this case is for the win process
  },

  reconnect: false,
}

export type State = typeof state

export const resetProposals = () => {
  state.proposals = { ...initialProposals }
}
