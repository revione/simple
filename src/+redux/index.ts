import type { TypedUseSelectorHook } from "react-redux"

import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from "react-redux"

import { configureStore } from "@reduxjs/toolkit"

import { persistStore } from "redux-persist"

import { reducer } from "./reducer/persist"
import { middleware } from "./middleware"

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware
})

export const persistor = persistStore(store)

export type State = ReturnType<typeof store.getState>

// Hooks

export const useDispatch = () => useReduxDispatch<typeof store.dispatch>()
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector
