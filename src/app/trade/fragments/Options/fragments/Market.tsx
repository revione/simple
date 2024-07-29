import Select from "react-select"
import type { SingleValue } from "react-select"

import { useDispatch, useSelector } from "+redux"
import { rewrite_editables } from "+redux/reducer/slices/editables"

import { set_amounts_and_renew_proposals } from "sockets/buyer/utils/set_amounts_and_create_proposals"
import { useMemo } from "react"
import { state } from "+local"

const options_symbols = [
  { value: "RDBEAR", label: "Bear Market Index" },
  { value: "RDBULL", label: "Bull Market Index" },
  { value: "R_10", label: "Volatility 10 Index" },
  { value: "R_25", label: "Volatility 25 Index" },
  { value: "R_50", label: "Volatility 50 Index" },
  { value: "R_75", label: "Volatility 75 Index" },
  { value: "R_100", label: "Volatility 100 Index" },
  { value: "1HZ10V", label: "Volatility 10 (1s) Index" },
  { value: "1HZ25V", label: "Volatility 25 (1s) Index" },
  { value: "1HZ50V", label: "Volatility 50 (1s) Index" },
  { value: "1HZ75V", label: "Volatility 75 (1s) Index" },
  { value: "1HZ100V", label: "Volatility 100 (1s) Index" }
]

type Option = SingleValue<{ value: string; label: string }>

export const Market = () => {
  const dispatch = useDispatch()
  const { symbol } = useSelector((s) => s.editables)
  const defaultSymbol = useMemo(
    () => options_symbols.find((option) => option.value === symbol),
    [symbol]
  )

  const change_symbol = (option: Option) => {
    if (option?.value) {
      dispatch(rewrite_editables({ symbol: option.value }))
      set_amounts_and_renew_proposals()
      state.sockets.observer?.close()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>Market</div>
      <div>
        <Select
          classNamePrefix="_"
          name="symbol"
          onChange={change_symbol}
          options={options_symbols}
          defaultValue={defaultSymbol}
        />
      </div>
    </div>
  )
}
