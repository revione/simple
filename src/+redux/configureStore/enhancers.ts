import { debounce } from "lodash"
import { batchedSubscribe } from "redux-batched-subscribe"

const debounceNotify = debounce((notify: any) => notify())

const enhancers = (getDefaultEnhancers: any) =>
  getDefaultEnhancers({
    autoBatch: false,
  }).concat(batchedSubscribe(debounceNotify))

export default enhancers
