import { useEffect } from "react"
import { useSelector } from "+redux"
import buyer from "sockets/buyer"

export const useActiveBuyer = () => {
  const { deriv } = useSelector((s) => s.access)
  const { run_sockets_after_launch_app } = useSelector((s) => s.editables)

  useEffect(() => {
    deriv && run_sockets_after_launch_app && buyer()
  }, [deriv])
}
