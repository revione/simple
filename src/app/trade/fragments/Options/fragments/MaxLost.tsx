import { useSelector, useDispatch } from "+redux"
import { rewrite_editables } from "+redux/reducer/slices/editables"
import { set_amounts_and_renew_proposals } from "sockets/buyer/utils/set_amounts_and_create_proposals"

import { CarouselSelector } from "./CarouselSelector"

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ideal: { [key: number]: number } = {
  1: 0.35,
  2: 1.07,
  3: 2.56,
  4: 5.64,
  5: 12,
  6: 25,
  7: 52,
  8: 108,
  9: 223,
  10: 461
}

const multipliers: { [key: number]: number } = {
  1: 0.35 / 0.35,
  2: 0.35 / 1.07,
  3: 0.35 / 2.56,
  4: 0.35 / 5.64,
  5: 0.35 / 12,
  6: 0.35 / 25,
  7: 0.35 / 52,
  8: 0.35 / 108,
  9: 0.35 / 223,
  10: 0.35 / 470
}

export const MaxLost = () => {
  const { max_lost } = useSelector(s => s.editables)
  const dispatch = useDispatch()

  const handlerOnChange = (selector: number) => {
    dispatch(
      rewrite_editables({
        max_lost: selector,
        multiplier: multipliers[selector]
      })
    )
    set_amounts_and_renew_proposals()
  }
  return (
    <div className="flex flex-col gap-3 w-[400px] text-center">
      <h4>Max lost</h4>
      <div>
        ideal: {ideal[max_lost]} : {multipliers[max_lost]}
      </div>
      <CarouselSelector
        options={options}
        onChange={handlerOnChange}
        initialOption={max_lost}
        modifiers={{
          z: 100
        }}
      />
    </div>
  )
}
