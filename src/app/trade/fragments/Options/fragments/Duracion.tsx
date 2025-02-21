import { useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "+redux"
import Select from "react-select"
import type { ActionMeta } from "react-select"

import { set_amounts_and_renew_proposals } from "sockets/buyer/utils/set_amounts_and_create_proposals"

import { rewrite_editables } from "+redux/reducer/slices/editables"

import type { Editables } from "+redux/initial"

interface Option {
  value: string
  label: string
}

const options_duration_unit: Option[] = [
  { value: "t", label: "ticks" },
  { value: "s", label: "seconds" },
  { value: "m", label: "minutes" },
  { value: "h", label: "hours" }
]

type DurationUnit = "ticks" | "seconds" | "minutes" | "hours"

const limits_duration_units: Record<
  DurationUnit,
  { min: number; max: number }
> = {
  ticks: { min: 1, max: 10 },
  seconds: { min: 15, max: 59 },
  minutes: { min: 1, max: 59 },
  hours: { min: 1, max: 23 }
}

export const Duracion = () => {
  const dispatch = useDispatch()
  const { duration, duration_unit } = useSelector(state => state.editables)
  const [actualUnit, setActualUnit] = useState<DurationUnit>("ticks")
  const defaultDurationUnit = useMemo(
    () => options_duration_unit.find(option => option.value === duration_unit),
    [duration_unit]
  )

  const setEditables = useCallback((partialEditables: Partial<Editables>) => {
    dispatch(rewrite_editables(partialEditables))
    set_amounts_and_renew_proposals()
  }, [])

  const change_select = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    if (option) {
      const newUnit = option.label as DurationUnit
      const minDuration = limits_duration_units[newUnit].min
      setActualUnit(newUnit)
      setEditables({
        [actionMeta.name || ""]: option?.value,
        duration: minDuration
      })
    }
  }

  const change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditables({ [e.target.name]: e.target.value })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>Duracion</div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-4">
          <div>Unidad</div>
          <Select
            classNamePrefix="_"
            name="duration_unit"
            onChange={change_select}
            options={options_duration_unit}
            defaultValue={defaultDurationUnit}
          />
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>Cantidad</div>
          <input
            name="duration"
            type="number"
            className="text-center mt-1"
            onChange={change_input}
            value={duration}
            min={limits_duration_units[actualUnit].min}
            max={limits_duration_units[actualUnit].max}
          />
        </div>
      </div>
    </div>
  )
}
