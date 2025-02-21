import { useState } from "react"
import type { SingleValue } from "react-select"

import { state } from "+local"
import { useDispatch, useSelector } from "+redux"

import buyer from "sockets/buyer"

import Select from "react-select"
import { set_actual_account } from "+redux/reducer/slices/access"

interface Account {
  acct: string
  cur: string
  token: string
}

type Option = SingleValue<{
  value: Account
  label: string
  isDisabled?: boolean
}>

export const Accounts = () => {
  const dispatch = useDispatch()
  const { deriv: _deriv, actualAccount } = useSelector(s => s.access)

  const [selectedAccount, setSelectedAccount] = useState<Account>(
    actualAccount || ({} as Account)
  )

  if (!_deriv || !actualAccount) {
    window.location.replace("/")
    return null
  }

  const handleChange = (selectedOption: Option) => {
    if (selectedOption) {
      const account = selectedOption.value
      setSelectedAccount(account)
      dispatch(set_actual_account(account))
      state.sockets.buyer?.close()
      buyer()
    }
  }

  const options = _deriv.map(account => ({
    value: account,
    label: `${account.acct} (${account.cur})`,
    isDisabled: selectedAccount ? account.acct === selectedAccount.acct : false
  }))

  return (
    <div className="flex flex-col gap-5">
      <div>Accounts</div>
      <div>
        <Select
          classNamePrefix="_"
          options={options}
          onChange={handleChange}
          value={
            selectedAccount
              ? {
                  value: selectedAccount,
                  label: `${selectedAccount.acct} (${selectedAccount.cur})`
                }
              : null
          }
          placeholder="Select an account"
        />
      </div>
    </div>
  )
}
