import { state } from "+local"

interface Props {
  width: number
  height: number
  yValues: number[]
  color: string
  circleRadius: number
}

export const calculateCirclePositions = ({
  height,
  width,
  yValues,
  color,
  circleRadius,
}: Props) => {
  const highestValue = Math.max(...yValues)
  const lowestValue = Math.min(...yValues)

  const totalCircles = yValues.length
  const margin = 25
  const spaceBetweenCircles = (width - margin * 2) / (totalCircles - 1)

  const keepOnlyExistingContracts = () => {
    const contracts = state.grafica.compras

    if (contracts.length === 0) return

    const validContracts = contracts.filter((contract) =>
      yValues.includes(contract.tick)
    )

    state.grafica.compras = validContracts
  }

  keepOnlyExistingContracts()

  return yValues.map((tickValue, index) => {
    let radius = circleRadius
    let currentColor = color

    state.grafica.compras.some((contract) => {
      if (contract.tick === tickValue) {
        currentColor = pickColor(contract.type, color)
        if (currentColor !== color) {
          radius = circleRadius + 1
        }
        return true
      }
      return false
    })

    const distanceToHighest = highestValue - tickValue
    const totalValueRange = highestValue - lowestValue
    const circleHeightPosition = distanceToHighest / totalValueRange
    const realAvailableHeight = height - margin * 2
    const yPosition = circleHeightPosition * realAvailableHeight + margin
    const xPosition = index * spaceBetweenCircles + margin

    return {
      x: xPosition,
      y: yPosition,
      color: currentColor,
      radius: radius,
    }
  })
}

const pickColor = (type: string, defaultColor: string) => {
  switch (type) {
    case "start":
      return "orange"
    case "inprocess":
    case "open":
      return "purple"
    case "won":
      return "green"
    case "lost":
      return "red"
    default:
      return defaultColor
  }
}
