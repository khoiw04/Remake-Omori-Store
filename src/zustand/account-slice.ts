import type { StateCreator } from "zustand";

export type AccountAction = {
    account: string | null
    setAccount: (type: string | null) => void
}

export const createAccountSlice: StateCreator<
    AccountAction,
    [['zustand/immer', never]],
    [],
    AccountAction
> = (set) => ({
    account: null,
    setAccount: (type) => {
        set(state => {
            state.account = type
        })
    }
})