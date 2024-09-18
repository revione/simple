import { useState } from "react"

import { useDispatch } from "+redux"

import {
  active_run_sockets_after_launch_app,
  desactive_run_sockets_after_launch_app,
} from "+redux/reducer/slices/editables"
import ToggleSwitch from "./ToggleSwitch"

export const Sockets = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive((s) => !s)
    if (!active) {
      dispatch(active_run_sockets_after_launch_app())
    } else {
      dispatch(desactive_run_sockets_after_launch_app())
    }
  }

  return (
    <div className="flex flex-col ">
      <h3 className="mb-2">Sockets</h3>

      <ToggleSwitch
        active={active}
        onChange={handleToggle}
        text="Run Sockets after lunch app"
      />
    </div>
  )
}
