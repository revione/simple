import React, { useState } from "react"

const ToggleSwitch = ({
  text,
  active,
  onChange,
}: {
  text?: string
  active: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [isChecked, setIsChecked] = useState(active)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked)
    onChange && onChange(e)
  }

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleOnChange}
      />
      <div
        style={{
          backgroundColor: isChecked ? "#9333ea" : "#E5E7EB",
        }}
        className="relative w-11 h-6 rounded-full transition-all
          peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
          dark:bg-gray-700 dark:border-gray-600"
      >
        <div
          style={{
            left: isChecked ? "calc(100% - 22px)" : "2px",
          }}
          className="absolute top-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 
          peer-checked:border-white transition-all"
        />
      </div>
      {text && (
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {text}
        </span>
      )}
    </label>
  )
}

export default ToggleSwitch
