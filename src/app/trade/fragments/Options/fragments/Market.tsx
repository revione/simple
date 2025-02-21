import { useDispatch, useSelector } from "+redux"
import { rewrite_editables } from "+redux/reducer/slices/editables"

import { set_amounts_and_renew_proposals } from "sockets/buyer/utils/set_amounts_and_create_proposals"
import { useMemo } from "react"

import { CarouselSelector } from "./CarouselSelector"
import { forget_all_and_subscribe } from "sockets/ticks/sends"

const options = [
  "R_10",
  "R_25",
  "R_50",
  "R_75",
  "R_100",
  "1HZ10V",
  "1HZ25V",
  "1HZ50V",
  "1HZ75V",
  "1HZ100V",
  "RDBEAR",
  "RDBULL"
]

export const Market = () => {
  const dispatch = useDispatch()
  const { symbol } = useSelector(s => s.editables)

  const defaultSymbol = useMemo(
    () => options.find(option => option === symbol),
    [symbol]
  )

  const change_symbol = (symbol: string) => {
    if (symbol) {
      dispatch(rewrite_editables({ symbol }))
      set_amounts_and_renew_proposals()
      forget_all_and_subscribe()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>Market</div>
      <div>
        <CarouselSelector
          options={options}
          onChange={change_symbol}
          initialOption={defaultSymbol}
        />
      </div>
    </div>
  )
}
