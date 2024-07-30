import { combineReducers } from "@reduxjs/toolkit"

import { reducer as access } from "+redux/reducer/slices/access"
import { reducer as buyer } from "+redux/reducer/slices/buyer"
import { reducer as editables } from "+redux/reducer/slices/editables"
import { reducer as info } from "+redux/reducer/slices/info"
import { reducer as purchases } from "+redux/reducer/slices/purchases"
import { reducer as sockets } from "+redux/reducer/slices/sockets"

const reducers = combineReducers({
  access,
  buyer,
  editables,
  info,
  purchases,
  sockets,
})

export default reducers
