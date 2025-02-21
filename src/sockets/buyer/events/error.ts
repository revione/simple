import { state } from "+local"

export const error = (event: Event) => {
  console.log(":: socket buyer has an error : ", { event })
}
