import {
  memo,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
  useMemo
} from "react"
import { motion } from "framer-motion"

interface ChartProps {
  yValues?: number[] // [5000, 4000, 3000, 4500, 3500, ...]
  circleRadius?: number
  smaPeriod?: number // Añadimos un periodo para el SMA
}

const calculateSMA = (data: number[], period: number): number[] => {
  const sma = []
  for (let i = 0; i <= data.length - period; i++) {
    const window = data.slice(i, i + period)
    const average = window.reduce((acc, val) => acc + val, 0) / period
    sma.push(average)
  }
  return sma
}

const Chart = ({
  yValues = [
    5000, 4000, 3000, 4500, 3500, 5000, 4000, 3000, 4500, 3500, 5000, 4000,
    3000, 4500, 3500
  ],
  circleRadius = 3,
  smaPeriod = 5 // Usamos un periodo de 5 por defecto para el SMA
}: ChartProps) => {
  const color = "skyblue"
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.5
  })

  const updateDimensions = useCallback(() => {
    if (svgRef.current) {
      setDimensions({
        width: svgRef.current.clientWidth,
        height: svgRef.current.clientHeight
      })
    }
  }, [svgRef])

  useLayoutEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [updateDimensions])

  const circles = useMemo(() => {
    const smaValues = calculateSMA(yValues, smaPeriod)
    const width = dimensions.width
    const height = dimensions.height
    const highestValue = Math.max(...smaValues)
    const lowestValue = Math.min(...smaValues)

    const totalCircles = smaValues.length
    const margin = 25
    const spaceBetweenCircles = (width - margin * 2) / (totalCircles - 1)

    return smaValues.map((smaValue, index) => {
      let radius = circleRadius

      const distanceToHighest = highestValue - smaValue
      const totalValueRange = highestValue - lowestValue
      const circleHeightPosition = distanceToHighest / totalValueRange
      const realAvailableHeight = height - margin * 2
      const yPosition = circleHeightPosition * realAvailableHeight + margin
      const xPosition = index * spaceBetweenCircles + margin

      return {
        x: xPosition,
        y: yPosition,
        radius: radius
      }
    })
  }, [circleRadius, dimensions.height, dimensions.width, yValues, smaPeriod])

  if (!circles || circles.length < 2) {
    return (
      <motion.div>
        {!circles ? "There are no circles." : "Set more than two circles"}
      </motion.div>
    )
  }

  const linePoints = circles.map(circle => `${circle.x},${circle.y}`).join(" ")

  const midYPosition = dimensions.height / 2

  return (
    <motion.svg
      ref={svgRef}
      style={{ width: "100%", height: "100%" }}
      className="flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      {/* Línea horizontal en el medio */}
      <motion.line
        x1={0}
        y1={midYPosition}
        x2={dimensions.width}
        y2={midYPosition}
        stroke="gray"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.2 } }}
      />

      {/* Línea que conecta los puntos del SMA */}
      <motion.path
        d={`M ${linePoints}`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.2 } }}
      />

      {/* Círculos del SMA */}
      {circles.map((circle, index) => (
        <motion.circle
          key={index}
          cx={circle.x}
          cy={circle.y}
          r={circle.radius}
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1 } }}
        />
      ))}
    </motion.svg>
  )
}

export default memo(Chart)
