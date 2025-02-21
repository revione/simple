import Image from "next/image"

import { useSelector } from "+redux"
import { state } from "+local"

import run_buyer from "sockets/buyer"
import run_ticks from "sockets/ticks"

export const SocketsStatus = () => {
  const {
    buyer: { connected: buyerConnected },
    ticks: { connected: tickstConnected }
  } = useSelector(s => s.sockets)

  const handleToggleTicks = () => {
    if (tickstConnected) {
      console.log("SocketsStatus Desconectando WS Ticks...")
      state.sockets.ticks?.close()
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
            <Image
              className="w-8 h-8"
              src="/icons/arrow-up.svg"
              width="8"
              height="8"
              alt="disconnect"
            />
          ) : (
            <Image
              className="w-8 h-8"
              src="/icons/arrow-down.svg"
              width="8"
              height="8"
              alt="reconnect"
            />
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
            <Image
              className="w-8 h-8"
              src="/icons/arrow-up.svg"
              width="8"
              height="8"
              alt="disconnect"
            />
          ) : (
            <Image
              className="w-8 h-8"
              src="/icons/arrow-down.svg"
              width="8"
              height="8"
              alt="reconnect"
            />
          )}
        </button>
      </div>
    </div>
  )
}
