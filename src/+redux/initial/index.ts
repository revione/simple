import type { PurchaseRedux } from "types"
import type { TypePurchase, TypeUseBalance } from "types/Options"

export interface Account {
  acct: string
  cur: string
  token: string
}

export interface Access {
  actualAccount?: Account
  deriv?: Account[]
}

const access = {
  actualAccount: undefined as Account | undefined,
  deriv: undefined as Account[] | undefined,
}

const buyer = {
  purchase_enabled: false, // for buttons and analysis
  purchase_running: false,
}

const editables = {
  initial_amount_contract: 0.35, // initial amount for a contract
  initial_multiplier: 0.00666, // value to get the initial contract price ... 0.0018, 0.00321, 0.00666

  type_use_balance: "custom" as TypeUseBalance,
  total_balance: 0,
  custom_balance: 109, // Interacts as an option in the Balance component associated with Options

  amount: 0.35, // amount used for a contract

  duration: 1,
  duration_unit: "t",

  symbol: "R_10",

  sma: 8,

  purchase_type: "justOne" as TypePurchase,
  custom_purchase: 5, // Interacts as an option in the Purchases component associated with Options

  run_sockets_after_launch_app: false,

  max_lost: {
    selected: 7,
    dopel_multiplier: 2.064, // 2,3
  },
}

export type Editables = typeof editables
export type Info = typeof info

const info = {
  round_loss_contracts: 0,
  round_won_contracts: 0,
  continue_loss_contracts: 0,
  continue_won_contracts: 0,
  max_position: 1,
  new_amount: 0,
  position: 1,
  random_seconds_wait: 1,
  total_contracts: 0,
  total_loss_contracts: 0,
  total_profit: 0,
  total_won_contracts: 0,
}

export const purchases = {
  ids: [] as number[],
  items: {} as Record<string, PurchaseRedux>,
}

const sockets = {
  ticks: {
    connected: false,
  },
  buyer: {
    connected: false,
  },
}

const initial = {
  access,
  buyer,
  editables,
  info,
  purchases,
  sockets,
}

export default initial

export type Initial = typeof initial
