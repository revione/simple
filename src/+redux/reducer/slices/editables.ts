import { createSlice } from "@reduxjs/toolkit"

import initial from "+redux/initial"

// editables slice

const editables_slice = createSlice({
  name: "editables",
  initialState: initial.editables,
  reducers: {
    rewrite_editables: (
      state,
      { payload }: { payload: Partial<(typeof initial)["editables"]> }
    ) => ({
      ...state,
      ...payload,
    }),

    reset_amount: (state) => ({
      ...state,
      amount: initial.editables.initial_amount_contract,
    }),

    set_amount: (state, { payload }: { payload: number }) => ({
      ...state,
      amount: payload,
    }),

    set_total_balance: (state, { payload }: { payload: number }) => ({
      ...state,
      total_balance: payload,
    }),

    active_run_sockets_after_launch_app: (state) => ({
      ...state,
      run_sockets_after_launch_app: true,
    }),

    desactive_run_sockets_after_launch_app: (state) => ({
      ...state,
      run_sockets_after_launch_app: false,
    }),
  },
})

export const {
  rewrite_editables,
  reset_amount,
  set_amount,
  set_total_balance,
  active_run_sockets_after_launch_app,
  desactive_run_sockets_after_launch_app,
} = editables_slice.actions

export const reducer = editables_slice.reducer
