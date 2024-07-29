import { createSlice } from "@reduxjs/toolkit"

import initial, { Info } from "+redux/initial"

const info_slice = createSlice({
  name: "info",
  initialState: initial.info,
  reducers: {
    rewrite_info: (state, action: { payload: Partial<Info> }) => ({
      ...state,
      ...action.payload
    }),

    set_balance: (state, { payload }: { payload: number }) => ({
      ...state,
      balance: payload
    }),

    clean_info: () => initial.info
  }
})

export const { rewrite_info, set_balance, clean_info } = info_slice.actions

export const reducer = info_slice.reducer
