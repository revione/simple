import { pausa, play } from "+local/utils/action_buttons"
import { useDispatch, useSelector } from "+redux"
import { clean_info } from "+redux/reducer/slices/info"
import { clean_purchases } from "+redux/reducer/slices/purchases"
import cleanIcon from "icons/clean.svg"
import pauseIcon from "icons/pause.svg"
import playIcon from "icons/play.svg"
import stopIcon from "icons/stop.svg"

export const ButtonPanel = () => {
  const dispatch = useDispatch()
  const { purchase_enabled } = useSelector((s) => s.buyer)

  const clean = () => {
    dispatch(clean_purchases())
    dispatch(clean_info())
  }

  return (
    <div className="flex flex-col gap-3">
      {!purchase_enabled && (
        <button onClick={play} className="panel-button">
          <img className="w-6 h-6 " src={playIcon} alt="play" />
        </button>
      )}
      {purchase_enabled && (
        <button onClick={pausa} className="panel-button">
          <img
            className="w-8 h-8 hover:scale-125"
            src={pauseIcon}
            alt="pausa"
          />
        </button>
      )}
      {purchase_enabled && (
        <button onClick={stop} className="panel-button">
          <img className="w-6 h-6" src={stopIcon} alt="stop" />
        </button>
      )}
      {!purchase_enabled && (
        <button onClick={clean} className="panel-button">
          <img className="w-7 h-7" src={cleanIcon} alt="clean" />
        </button>
      )}
    </div>
  )
}
