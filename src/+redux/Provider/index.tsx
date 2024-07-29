"use client"

import { persistor, store } from "+redux/configureStore"
import { ReactNode } from "react"
import { Provider as ProviderRedux } from "react-redux"

import { PersistGate } from "redux-persist/integration/react"

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ProviderRedux store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ProviderRedux>
  )
}
