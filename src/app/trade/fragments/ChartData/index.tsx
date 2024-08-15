import { useState, useEffect } from "react"
import Chart from "./fragments/Chart"
import { state_observer } from "+local/lists"
import SMAChart from "./fragments/SMAChart"

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

  return (
    <div>
      <div className="h-[50vh]">
        <Chart yValues={state_observer.lists.ticks} />
      </div>
      <div className="h-[50vh]">
        <SMAChart yValues={state_observer.lists.ticks} />
      </div>
    </div>
  )
}

export default ChartData
