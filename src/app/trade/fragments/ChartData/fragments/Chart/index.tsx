import {
  memo,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react"
import { motion } from "framer-motion"

import { calculateCirclePositions } from "./calculateCirclePositions"

interface ChartProps {
  yValues?: number[] // [5000, 4000, 3000, 4500, 3500, ...]
  circleRadius?: number
}

const Chart = ({
  yValues = [
    5000, 4000, 3000, 4500, 3500, 5000, 4000, 3000, 4500, 3500, 5000, 4000,
    3000, 4500, 3500,
  ],
  circleRadius = 3,
}: ChartProps) => {
  const color = "deeppink"
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.5,
  })

  const updateDimensions = useCallback(() => {
    if (svgRef.current) {
      setDimensions({
        width: svgRef.current.clientWidth,
        height: svgRef.current.clientHeight,
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

  const circles = useMemo(
    () =>
      calculateCirclePositions({
        width: dimensions.width,
        height: dimensions.height,
        yValues,
        color,
        circleRadius,
      }),
    [circleRadius, dimensions.height, dimensions.width, yValues]
  )

  if (!circles || circles.length < 2) {
    return (
      <motion.div>
        {!circles ? "There are no circles." : "Set more than two circles"}
      </motion.div>
    )
  }

  const linePoints = circles
    .map((circle) => `${circle.x},${circle.y}`)
    .join(" ")

  return (
    <motion.svg
      ref={svgRef}
      style={{ width: "100%", height: "100%" }}
      className="flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <motion.path
        d={`M ${linePoints}`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.2 } }}
      />
      {circles.map((circle, index) => (
        <motion.circle
          key={index}
          cx={circle.x}
          cy={circle.y}
          r={circle.radius}
          fill={circle.color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1 } }}
        />
      ))}
    </motion.svg>
  )
}

export default memo(Chart)
