import { useState } from "react"
import { useDispatch, useSelector } from "+redux"
import { rewrite_editables } from "+redux/reducer/slices/editables"
import type { TypePurchase } from "types/Options"
import { isEmpty } from "lodash"

export interface EditableDataPurchases {
  purchase_type?: TypePurchase
  custom_purchase?: number
}

export type ChangeEventHTMLInputElement = React.ChangeEvent<HTMLInputElement>

export const Purchases = () => {
  const dispatch = useDispatch()
  const { purchase_type, custom_purchase } = useSelector((s) => s.editables)

  const [multipleCount, setMultipleCount] = useState(custom_purchase)
  const [selectedOption, setSelectedOption] =
    useState<TypePurchase>(purchase_type)

  const items = [
    { label: "Just one", count: 1, key: "justOne" },
    {
      label: "Multiple",
      count: multipleCount,
      isEditable: true,
      key: "multiple"
    },
    { label: "Infinite", count: "∞", key: "infinite" }
  ]

  const updateOptionInRedux = (options: {
    _selectedOption?: TypePurchase
    _multipleCount?: number
  }) => {
    const { _selectedOption, _multipleCount } = options
    const _editables: EditableDataPurchases = {}

    if (_selectedOption && _selectedOption !== purchase_type)
      _editables.purchase_type = _selectedOption
    if (_multipleCount !== undefined && _multipleCount !== multipleCount) {
      _editables.custom_purchase = _multipleCount
    }

    if (!isEmpty(_editables)) dispatch(rewrite_editables(_editables))
  }

  const handleOptionChange = (event: ChangeEventHTMLInputElement) => {
    const _selectedOption = event.target.value as TypePurchase
    setSelectedOption(_selectedOption)
    updateOptionInRedux({ _selectedOption })
  }

  const handleMultipleCountChange = (event: ChangeEventHTMLInputElement) => {
    const _multipleCount = Number(event.target.value)
    setMultipleCount(_multipleCount)
    updateOptionInRedux({ _multipleCount })
  }

  return (
    <div className="flex flex-col gap-5">
      <div>Purchases</div>
      <div className="flex gap-5">
        {items.map((item) => (
          <div key={item.key} className="flex flex-col gap-3 text-center">
            <div>
              <input
                type="radio"
                name="purchaseOption"
                value={item.key}
                checked={selectedOption === item.key}
                onChange={handleOptionChange}
              />
            </div>
            <div>
              <div>{item.label}</div>
              <div>
                {item.isEditable ? (
                  <input
                    type="number"
                    className="text-center mt-1"
                    value={item.count}
                    onChange={handleMultipleCountChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="text-center mt-1">{item.count}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Purchases
