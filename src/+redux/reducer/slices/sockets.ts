import initial from "+redux/initial"
import { createSlice } from "@reduxjs/toolkit"

// sockets slice

const sockets_slice = createSlice({
  name: "sockets",
  initialState: initial.sockets,
  reducers: {
    connected_ticks_socket: (state) => ({
      ...state,
      ticks: {
        ...state.ticks,
        connected: true
      }
    }),

    disconnected_ticks_socket: (state) => ({
      ...state,
      ticks: {
        ...state.ticks,
        connected: false
      }
    }),

    connected_buyer_socket: (state) => ({
      ...state,
      buyer: {
        ...state.buyer,
        connected: true
      }
    }),

    disconnected_buyer_socket: (state) => ({
      ...state,
      buyer: {
        ...state.buyer,
        connected: false
      }
    })
  }
})

export const {
  connected_ticks_socket,
  disconnected_ticks_socket,
  connected_buyer_socket,
  disconnected_buyer_socket
} = sockets_slice.actions
export const reducer = sockets_slice.reducer
