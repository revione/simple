import { useDispatch, useSelector } from "+redux"

import { clean_info } from "+redux/reducer/slices/info"
import { clean_purchases } from "+redux/reducer/slices/purchases"

import { pausa, play, stop } from "+local/utils/action_buttons"

import Image from "next/image"

export const ButtonPanel = () => {
  const dispatch = useDispatch()
  const { purchase_enabled } = useSelector(s => s.buyer)

  const clean = () => {
    dispatch(clean_purchases())
    dispatch(clean_info())
  }

  return (
    <div className="flex flex-col gap-3">
      {!purchase_enabled && (
        <button onClick={play} className="panel-button">
          <Image
            src="/icons/play.svg"
            alt="clean"
            width="8"
            height="8"
            className="w-6 h-6"
          />
        </button>
      )}
      {purchase_enabled && (
        <button onClick={pausa} className="panel-button">
          <Image
            className="w-8 h-8"
            src="/icons/pause.svg"
            width="8"
            height="8"
            alt="pausa"
          />
        </button>
      )}

      <button onClick={stop} className="panel-button">
        <Image
          className="w-6 h-6"
          src="/icons/stop.svg"
          width="8"
          height="8"
          alt="stop"
        />
      </button>

      {!purchase_enabled && (
        <button onClick={clean} className="panel-button">
          <Image
            className="w-7 h-7"
            src="/icons/clean.svg"
            width="8"
            height="8"
            alt="clean"
          />
        </button>
      )}
    </div>
  )
}
