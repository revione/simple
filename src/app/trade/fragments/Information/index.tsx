import { useCallback, useEffect, useState } from "react"
import { useSelector } from "+redux"

import { balance_function } from "../utils"
import { Times } from "../Times"

export function Information() {
  const {
    total_profit,
    total_contracts,
    total_won_contracts,
    total_loss_contracts,
    continue_won_contracts,
    continue_loss_contracts,
    position,
    max_position
  } = useSelector(s => s.info)
  const { custom_balance, amount, type_use_balance } = useSelector(
    s => s.editables
  )

  const { total_balance } = useSelector(s => s.editables)

  const balance = type_use_balance === "custom" ? custom_balance : total_balance

  return (
    <div
      className="information grid justify-items-start grid-cols-3 my-5 gap-0 
        sm:grid-cols-2 lg:grid-cols-3 md:gap-10
      "
    >
      <div className="flex flex-col gap-0.5 w-full">
        <div className="grid-2">
          <div>balance :</div>
          <div>{balance_function(balance)}</div>
        </div>

        <div className="grid-2">
          <div>amount:</div>
          <div>{amount}</div>
        </div>

        <div className="grid-2 ">
          <div>total profit :</div>
          <div>{total_profit}</div>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 w-full">
        <div className="font-bold">Contracts</div>
        <div className="grid-2">
          <div>total :</div>
          <div>{total_contracts}</div>
        </div>
        <div className="grid-2">
          <div>total won :</div>
          <div>{total_won_contracts}</div>
        </div>
        <div className="grid-2">
          <div>total loss :</div>
          <div>{total_loss_contracts}</div>
        </div>
        <div className="grid-2">
          <div>continue won :</div>
          <div>{continue_won_contracts}</div>
        </div>
        <div className="grid-2">
          <div>continue loss :</div>
          <div>{continue_loss_contracts}</div>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 w-full">
        <div className="grid-2">
          <div>max position :</div>
          <div>{max_position}</div>
        </div>
        <div className="grid-2">
          <div>actual position:</div>
          <div>{position}</div>
        </div>
        <Times />
        <CountDown />
      </div>
    </div>
  )
}

const CountDown = () => {
  const { random_seconds_wait } = useSelector(s => s.info)

  const [seconds, setSeconds] = useState<number | string>(0)

  const startCoundDown = useCallback(() => {
    let internal_seconds = random_seconds_wait
    setSeconds(internal_seconds)
    setTimeout(() => setSeconds(internal_seconds--), 1000)
    let interval = setInterval(() => {
      if (internal_seconds <= 0) {
        clearInterval(interval)
        setTimeout(() => {
          setSeconds("-")
        }, 500)
      } else setSeconds(internal_seconds--)
    }, 1000)
  }, [random_seconds_wait])

  useEffect(() => {
    startCoundDown()
  }, [random_seconds_wait])

  return (
    <div className="grid-2">
      <div>wait seconds:</div>
      <div>{seconds}</div>
    </div>
  )
}
