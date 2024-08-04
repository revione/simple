import { useState, useEffect } from "react"
import Chart from "./fragments/Chart"
import { state_observer } from "+local/lists"

const ChartData = () => {
  const [_, setUpdate] = useState(false)

  useEffect(() => {
    const handleUpdate = () => {
      setUpdate((prev) => !prev)
    }

    state_observer.subscribe(handleUpdate)

    return () => {
      state_observer.unsubscribe(handleUpdate)
    }
  }, [])

  return <Chart yValues={state_observer.lists.ticks} />
}

export default ChartData
