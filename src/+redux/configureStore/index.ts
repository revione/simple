import { configureStore, Tuple } from "@reduxjs/toolkit"

import reducer from "+redux/reducer"

import initial, { Initial } from "+redux/initial"
import middleware from "./middleware"
import enhancers from "./enhancers"

const preloadedState: Initial = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state")!).state
  : initial

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: { ...preloadedState },
  middleware,
  enhancers,
})
