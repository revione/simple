"use client"

import { useEffect, useCallback } from "react"

import { useRouter } from "next/navigation"

import { set_actual_account, set_deriv } from "+redux/reducer/slices/access"
import { useDispatch, useSelector } from "+redux"

const Deriv = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { actualAccount } = useSelector((state) => state.access)

  const parseQueryParams = useCallback(() => {
    const paramsObject: Record<string, string> = {}
    const paramPairs = window.location.search.slice(1).split("&")

    paramPairs.forEach((paramPair) => {
      const [name, value] = paramPair.split("=")
      paramsObject[name] = value
    })

    return paramsObject
  }, [])

  const isolateForNumber = useCallback(
    (inputObject: Record<string, string>) => {
      const resultArray = []
      let counter = 1

      while (true) {
        const acctKey = `acct${counter}`
        const curKey = `cur${counter}`
        const tokenKey = `token${counter}`

        if (!(acctKey in inputObject)) break

        const newObj = {
          acct: inputObject[acctKey],
          cur: inputObject[curKey],
          token: inputObject[tokenKey],
        }

        resultArray.push(newObj)
        counter++
      }

      if (resultArray.length > 0) {
        !actualAccount && dispatch(set_actual_account(resultArray[0]))
        dispatch(set_deriv(resultArray))
      }

      router.replace("/trade")
    },
    [actualAccount, dispatch, router]
  )

  useEffect(() => {
    const queryParams = parseQueryParams()
    console.log({ queryParams })
    // isolateForNumber(queryParams)
  }, [parseQueryParams, isolateForNumber])

  return <div>Deriv</div>
}

export default Deriv
