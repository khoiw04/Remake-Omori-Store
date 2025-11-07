import type { StateCreator } from "zustand"

export type SearchItem = {
  search: string,
  setSearch: (val: string) => void
}

export const createSearchSlice: StateCreator<
    SearchItem,
    [['zustand/immer', never]],
    [],
    SearchItem
> = (set) => ({
    search: '',
    setSearch: (val) => {
        set(() =>
        {
            return { search: val }
        }
        )
    }
})