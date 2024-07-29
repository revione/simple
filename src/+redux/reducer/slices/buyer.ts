import { createSlice } from "@reduxjs/toolkit"
import initial from "+redux/initial"

// buyer slice

const buyer_slice = createSlice({
  name: "purchases",
  initialState: initial.buyer,
  reducers: {
    enable_purchase: (state) => ({ ...state, purchase_enabled: true }),

    disabled_purchase: (state) => ({ ...state, purchase_enabled: false }),

    true_is_purchase_running: (state) => ({ ...state, purchase_running: true }),

    false_is_purchase_running: (state) => ({
      ...state,
      purchase_running: false
    })
  }
})

export const {
  enable_purchase,
  disabled_purchase,
  true_is_purchase_running,
  false_is_purchase_running
} = buyer_slice.actions

export const reducer = buyer_slice.reducer
