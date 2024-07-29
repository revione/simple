import initial, { Access } from "+redux/initial"
import { createSlice } from "@reduxjs/toolkit"

const access_slice = createSlice({
  name: "access",
  initialState: initial.access,
  reducers: {
    set_actual_account: (
      state,
      { payload }: { payload: Access["actualAccount"] }
    ) => ({
      ...state,
      actualAccount: payload,
    }),
    set_deriv: (state, { payload }: { payload: Access["deriv"] }) => ({
      ...state,
      deriv: payload,
    }),
  },
})

export const { set_actual_account, set_deriv } = access_slice.actions

export const reducer = access_slice.reducer
