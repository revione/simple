import React, { useState, useEffect, useRef, useCallback } from "react"

interface CarouselSelectorProps {
  options: any[]
  onChange: (itemAtFront: any) => any
  initialOption: any

  modifiers?: {
    z?: number
  }
}

export const CarouselSelector = ({
  options = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  onChange,
  initialOption,

  modifiers
}: CarouselSelectorProps) => {
  const initialIndex = options.indexOf(initialOption)
  const initialAngle = (initialIndex / options.length) * 360
  const [angle, setAngle] = useState(-initialAngle) // Rotate to make initialOption visible
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { z = 150 } = modifiers || {}

  const cubicBezier = useCallback(
    (
      controlPoint1X: number,
      controlPoint1Y: number,
      controlPoint2X: number,
      controlPoint2Y: number,
      time: number
    ) => {
      const coefficientX1 = 3 * controlPoint1X
      const coefficientX2 =
        3 * (controlPoint2X - controlPoint1X) - coefficientX1
      const coefficientX3 = 1 - coefficientX1 - coefficientX2

      const coefficientY1 = 3 * controlPoint1Y
      const coefficientY2 =
        3 * (controlPoint2Y - controlPoint1Y) - coefficientY1
      const coefficientY3 = 1 - coefficientY1 - coefficientY2

      const x =
        coefficientX3 * time * time * time +
        coefficientX2 * time * time +
        coefficientX1 * time
      const y =
        coefficientY3 * time * time * time +
        coefficientY2 * time * time +
        coefficientY1 * time

      return y
    },
    []
  )

  const notifyOnChange = useCallback(
    (newAngle: number) => {
      const itemAngle = 360 / options.length
      let adjustedAngle = newAngle % 360

      if (adjustedAngle < 0) {
        adjustedAngle += 360
      }

      const closestItemIndex =
        Math.round(adjustedAngle / itemAngle) % options.length
      const itemAtFront =
        options[(options.length - closestItemIndex) % options.length]

      onChange && onChange(itemAtFront)
    },
    [options, onChange]
  )

  const animateToAngle = useCallback(
    (targetAngle: number) => {
      const startAngle = angle
      let deltaAngle = targetAngle - startAngle

      if (deltaAngle > 180) {
        deltaAngle -= 360
      } else if (deltaAngle < -180) {
        deltaAngle += 360
      }

      const duration = 500
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        const easing = cubicBezier(0.42, 0, 0.58, 1, progress)
        setAngle(startAngle + deltaAngle * easing)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          notifyOnChange(targetAngle)
        }
      }

      requestAnimationFrame(animate)
    },
    [angle, cubicBezier, notifyOnChange]
  )

  const snapToClosestItem = useCallback(() => {
    const itemAngle = 360 / options.length
    const adjustedAngle = angle % 360
    let closestItemIndex = Math.round(adjustedAngle / itemAngle)

    if (adjustedAngle < 0) {
      closestItemIndex = options.length + Math.round(adjustedAngle / itemAngle)
    }

    const newAngle = closestItemIndex * itemAngle
    animateToAngle(newAngle)
  }, [angle, animateToAngle, options.length])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        const dx = event.clientX - startX
        setAngle(prevAngle => prevAngle + dx * 0.3)
        setStartX(event.clientX)
      }
    },
    [isDragging, startX]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    snapToClosestItem()
  }, [snapToClosestItem])

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(event.clientX)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseup", handleMouseUp)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  const calculateOpacity = (itemAngle: number) => {
    let angleDiff = (itemAngle + angle) % 360
    if (angleDiff < 0) {
      angleDiff += 360
    }

    if (angleDiff >= 310 && angleDiff <= 310) {
      return 0.7
    } else if (angleDiff >= 310 || angleDiff <= 30) {
      return 1
    } else if (angleDiff >= 30 && angleDiff <= 50) {
      return 0.7
    } else {
      return 0.1
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-16 mx-auto perspective-1000 cursor-pointer"
      onMouseDown={handleMouseDown}
    >
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
      <div
        className="w-full h-full relative preserve-3d transition-all"
        style={{ transform: `rotateY(${angle}deg)` }}
      >
        {options.map((item, index) => {
          const itemAngle = (index / options.length) * 360
          const opacity = calculateOpacity(itemAngle)
          return (
            <div
              key={index}
              className="absolute w-16 h-12 bg-blue-200 flex items-center justify-center select-none transition-all"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${z}px)`,
                opacity
              }}
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}
