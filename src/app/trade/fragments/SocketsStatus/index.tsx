import { useSelector } from "+redux"
import { state } from "+local"

import ArrowUpIcon from "icons/arrow-up.svg"
import ArrowDownIcon from "icons/arrow-down.svg"

import run_buyer from "sockets/buyer"
import run_ticks from "sockets/observer_ticks"

export const SocketsStatus = () => {
  const {
    buyer: { connected: buyerConnected },
    ticks: { connected: tickstConnected }
  } = useSelector((s) => s.sockets)

  const handleToggleTicks = () => {
    if (tickstConnected) {
      console.log("SocketsStatus Desconectando WS Ticks...")
      state.sockets.observer?.close()
    } else {
      console.log("SocketsStatus Reconectando WS Ticks...")

      run_ticks()
    }
  }

  const handleToggleBuyer = () => {
    if (buyerConnected) {
      console.log("SocketsStatus Desconectando WS Buyer...")
      state.sockets.buyer?.close()
    } else {
      console.log("SocketsStatus Reconectando WS Buyer...")
      run_buyer()
    }
  }

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex flex-col gap-2 items-center">
        <span>Ticks</span>
        <button
          onClick={handleToggleTicks}
          className={`
            w-8 h-8 cursor-pointer rounded-full flex items-center justify-center
            ${tickstConnected ? "bg-green-500" : "bg-red-500"} text-white
            scale-this
          `}
        >
          {tickstConnected ? (
            <img className="w-6 h-6" src={ArrowDownIcon} alt="disconnect" />
          ) : (
            <img className="w-6 h-6" src={ArrowUpIcon} alt="reconnect" />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span>Buyer</span>
        <button
          onClick={handleToggleBuyer}
          className={`
            w-8 h-8 cursor-pointer rounded-full flex items-center justify-center
            ${buyerConnected ? "bg-green-500" : "bg-red-500"} text-white
            scale-this
          `}
        >
          {buyerConnected ? (
            <img className="w-6 h-6" src={ArrowDownIcon} alt="disconnect" />
          ) : (
            <img className="w-6 h-6" src={ArrowUpIcon} alt="reconnect" />
          )}
        </button>
      </div>
    </div>
  )
}
