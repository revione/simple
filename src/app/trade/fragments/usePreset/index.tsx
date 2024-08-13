import { useEffect } from "react"

import { state } from "+local"

import { useDispatch, useSelector } from "+redux"

import ws_observer from "sockets/ticks"

import {
  disabled_purchase,
  false_is_purchase_running,
} from "+redux/reducer/slices/buyer"

import {
  disconnected_buyer_socket,
  disconnected_ticks_socket,
} from "+redux/reducer/slices/sockets"

export const usePreset = () => {
  const dispatch = useDispatch()
  const { purchase_enabled, purchase_running } = useSelector((s) => s.buyer)
  const { run_sockets_after_launch_app } = useSelector((s) => s.editables)

  useEffect(() => {
    dispatch(disconnected_buyer_socket())
    dispatch(disconnected_ticks_socket())

    purchase_running && dispatch(false_is_purchase_running())
    purchase_enabled && dispatch(disabled_purchase())

    state.app.first_time_proposal_header = true
    state.sockets.run_sockets = true

    run_sockets_after_launch_app && ws_observer()
  }, [])
}
