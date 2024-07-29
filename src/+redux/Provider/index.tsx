import { ReactNode } from "react"
import { Provider as ProviderRedux } from "react-redux"
import { store } from "+redux"

export const Provider = ({ children }: { children: ReactNode }) => (
  <ProviderRedux {...{ store, children }} />
)
