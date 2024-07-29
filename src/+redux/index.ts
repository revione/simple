import type { TypedUseSelectorHook } from "react-redux"

import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux"

import { combineReducers, configureStore } from "@reduxjs/toolkit"

import reducer from "+redux/reducer"

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers(reducer))

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type State = ReturnType<typeof store.getState>

// Hooks

export const useDispatch = () => useReduxDispatch<typeof store.dispatch>()
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector
