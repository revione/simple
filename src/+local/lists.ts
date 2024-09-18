// import { verificarCondiciones } from "app/trade/fragments/ChartData/fragments/analisis"

interface StateObserver {
  lists: {
    close_prices: number[]
    high_prices: number[]
    low_prices: number[]
    open_prices: number[]
    ticks: number[]
  }
  subscribers: Array<() => void>
  subscribe(callback: () => void): void
  unsubscribe(callback: () => void): void
  notify(): void
  initTicks(ticks: number[]): void
  updateTicks(new_tick: number): void
}

export const state_observer: StateObserver = {
  lists: {
    close_prices: [],
    high_prices: [],
    low_prices: [],
    open_prices: [],
    ticks: [],
  },
  subscribers: [],
  subscribe(callback) {
    this.subscribers.push(callback)
  },
  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback)
  },
  notify() {
    this.subscribers.forEach((callback) => callback())
  },
  initTicks(ticks) {
    this.lists.ticks = ticks
    // verificarCondiciones(ticks)
    this.notify()
  },
  updateTicks(new_tick) {
    this.lists.ticks.shift()
    this.lists.ticks = [...this.lists.ticks, new_tick]
    // verificarCondiciones(this.lists.ticks)
    this.notify()
  },
}
