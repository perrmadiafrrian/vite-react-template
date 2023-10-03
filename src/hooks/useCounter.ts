import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CounterState = {
  count: number
  increment: () => void
  decrement: () => void
}

const useCounter = create<CounterState>()(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set({ count: get().count + 1 }),
      decrement: () => set({ count: get().count - 1 }),
    }),
    { name: 'counter' }
  )
)

export default useCounter
