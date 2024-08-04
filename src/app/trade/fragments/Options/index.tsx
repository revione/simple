import { Balance } from "./fragments/Balance"
import { Accounts } from "./fragments/Accounts"
import { Purchases } from "./fragments/Purchases"
import { Duracion } from "./fragments/Duracion"
import { Market } from "./fragments/Market"
import { Sockets } from "./fragments/Sockets"

export const Options = () => (
  <div className="mb-8">
    <div className="mb-5">Opciones</div>

    <div className="flex flex-col gap-6 ml-3 w-max">
      <div className="flex gap-12">
        <Purchases />
        <Balance />
      </div>
      <div className="flex justify-between">
        <Duracion />
        <Sockets />
        <Accounts />
      </div>
    </div>
  </div>
)
