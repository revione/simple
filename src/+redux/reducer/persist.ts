import createWebStorage from "redux-persist/lib/storage/createWebStorage"

import reducers from "./reducers"

import { persistReducer } from "redux-persist"

// documentation https://github.com/vercel/next.js/discussions/15687
type StorageValue = string | null

const createNoopStorage = () => {
  return {
    getItem(_key: string): Promise<StorageValue> {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: string): Promise<string> {
      return Promise.resolve(value)
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve()
    },
  }
}
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage()

const persistConfig = {
  key: "root",
  storage,
}

export const reducer = persistReducer(persistConfig, reducers)
