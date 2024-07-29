import { useState } from "react"

import { useDispatch } from "+redux"

import {
  active_run_sockets_after_launch_app,
  desactive_run_sockets_after_launch_app
} from "+redux/reducer/slices/editables"

export const Sockets = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive(!active)
    if (!active) {
      dispatch(active_run_sockets_after_launch_app())
    } else {
      dispatch(desactive_run_sockets_after_launch_app())
    }
  }

  return (
    <div className="flex flex-col ">
      <h3>Sockets</h3>

      <label className="flex flex-col gap-2 items-center cursor-pointer">
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Run Sockets after lunch app
        </span>

        <input
          type="checkbox"
          className="sr-only peer"
          checked={active}
          onChange={handleToggle}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
      </label>
    </div>
  )
}
