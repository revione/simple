import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "+redux"
import { rewrite_editables } from "+redux/reducer/slices/editables"
import { set_amounts_and_renew_proposals } from "sockets/buyer/utils/set_amounts_and_create_proposals"
import type { TypeUseBalance } from "types/Options"
import { isEmpty } from "lodash"

export interface EditableDataBalance {
  type_use_balance?: TypeUseBalance
  custom_balance?: number
}

export type ChangeEventHTMLInputElement = React.ChangeEvent<HTMLInputElement>

export const Balance = () => {
  const dispatch = useDispatch()
  const { total_balance, custom_balance, type_use_balance } = useSelector(
    state => state.editables
  )

  const [selectedOption, setSelectedOption] =
    useState<TypeUseBalance>(type_use_balance)
  const [customBalance, setCustomBalance] = useState(custom_balance)

  useEffect(() => {
    setCustomBalance(custom_balance)
  }, [custom_balance])

  const updateBalanceToUse = (options: {
    _selectedOption?: TypeUseBalance
    _customBalance?: number
  }) => {
    const { _selectedOption, _customBalance } = options
    const _editables: EditableDataBalance = {}

    if (_selectedOption && type_use_balance !== _selectedOption)
      _editables.type_use_balance = _selectedOption
    if (_customBalance !== undefined && _customBalance !== customBalance)
      _editables.custom_balance = _customBalance || customBalance

    if (!isEmpty(_editables)) {
      dispatch(rewrite_editables(_editables))
      set_amounts_and_renew_proposals()
    }
  }

  const handleOptionChange = (event: ChangeEventHTMLInputElement) => {
    const _selectedOption = event.target.value as TypeUseBalance
    setSelectedOption(_selectedOption)
    updateBalanceToUse({ _selectedOption })
  }

  const handleCustomBalanceChange = (event: ChangeEventHTMLInputElement) => {
    const _customBalance = Number(event.target.value)
    setCustomBalance(_customBalance)
    updateBalanceToUse({ _customBalance })
  }

  return (
    <div className="flex flex-col gap-5">
      <div>Balance</div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-3 text-center">
          <label>
            <input
              type="radio"
              value="total"
              checked={selectedOption === "total"}
              onChange={handleOptionChange}
            />
          </label>
          <div>
            <div>Total</div>
            <div className="text-center mt-1">{total_balance}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-center">
          <label>
            <input
              type="radio"
              value="custom"
              checked={selectedOption === "custom"}
              onChange={handleOptionChange}
            />
          </label>
          <div>
            <div>Custom</div>
            <input
              type="number"
              className="text-center mt-1"
              value={customBalance}
              onChange={handleCustomBalanceChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
