import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserState = {
  user: boolean
  assign: () => void
  revoke: () => void
}

const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: false,
      assign: () => set({ user: true }),
      revoke: () => set({ user: false }),
    }),
    { name: 'user' }
  )
)

export default useUser
