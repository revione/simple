import type { TypedUseSelectorHook } from "react-redux"

import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux"

import { store } from "./configureStore"

// store

export type State = ReturnType<typeof store.getState>

// Hooks

export const useDispatch = () => useReduxDispatch<typeof store.dispatch>()
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector
