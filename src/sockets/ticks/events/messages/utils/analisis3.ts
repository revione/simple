import { state } from "+local"
import { state_observer } from "+local/lists"

export const makeDecision = () => {
  const { increasingTrend, decreasingTrend } = determineTrend(
    state_observer.lists.ticks,
    0.55
  )

  state.internal.contract_type = increasingTrend
    ? "CALL"
    : decreasingTrend
    ? "PUT"
    : ""
}

const determineTrend = (data: number[], threshold: number) => {
  const increasingCount = countIncreasingTrend(data)
  const decreasingCount = countDecreasingTrend(data)

  // console.log({
  //   increasingTrend: increasingCount / data.length,
  //   decreasingTrend: decreasingCount / data.length
  // })

  const increasingTrend = increasingCount / data.length >= threshold
  const decreasingTrend = decreasingCount / data.length >= threshold

  return { increasingTrend, decreasingTrend }
}

const countIncreasingTrend = (data: number[]) =>
  data.reduce(
    (count, value, index, arr) =>
      index === 0 || value > arr[index - 1] ? count + 1 : count,
    0
  )

const countDecreasingTrend = (data: number[]) =>
  data.reduce(
    (count, value, index, arr) =>
      index === 0 || value < arr[index - 1] ? count + 1 : count,
    0
  )
