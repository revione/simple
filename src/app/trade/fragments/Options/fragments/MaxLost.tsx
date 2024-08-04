import { useSelector, useDispatch } from "+redux"
import { rewrite_editables } from "+redux/reducer/slices/editables"

import { CarouselSelector } from "./CarouselSelector"

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ideal: { [key: number]: number } = {
  1: 0.35,
  2: 1.07,
  3: 2.56,
  4: 5.64,
  5: 11.99,
  6: 25.1,
  7: 52.16,
  8: 108.01,
  9: 223.29,
  10: 470,
}

const multipliers: { [key: number]: number } = {
  1: 0.35 / 0.35,
  2: 0.35 / 1.07,
  3: 0.35 / 2.56,
  4: 0.35 / 5.64,
  5: 0.35 / 11.99,
  6: 0.35 / 25.1,
  7: 0.35 / 52.16,
  8: 0.35 / 108.01,
  9: 0.35 / 223.29,
  10: 0.35 / 470,
}

export const MaxLost = () => {
  const { selected } = useSelector((s) => s.editables.max_lost)
  const dispatch = useDispatch()

  const handlerOnChange = (selector: number) => {
    dispatch(
      rewrite_editables({
        max_lost: {
          selected: selector,
          dopel_multiplier: multipliers[selector],
        },
      })
    )
  }
  return (
    <div className="flex flex-col gap-3 w-[400px] text-center">
      <h4>Max lost</h4>
      <div>ideal: {ideal[selected]}</div>
      <CarouselSelector
        options={options}
        onChange={handlerOnChange}
        initialOption={selected}
        modifiers={{
          z: 100,
        }}
      />
    </div>
  )
}
