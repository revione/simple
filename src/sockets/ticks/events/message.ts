import { set_history } from "./messages/set_history"
import { update_ticks } from "./messages/update_ticks"

// Listen for messages
export const message = (messageEvent: MessageEvent<string>) => {
  //

  const data = JSON.parse(messageEvent.data)

  if (data.error) console.log("socket ticks message : ", data)

  const { msg_type } = data

  switch (msg_type) {
    case "forget_all":
      break

    case "history":
      set_history(data)
      break

    case "tick":
      update_ticks(data)
      break

    default:
      console.log(":: socket ticks message default : ", data)
      break
  }
}
