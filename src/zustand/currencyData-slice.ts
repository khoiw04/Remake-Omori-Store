import type { StateCreator } from "zustand"

export type CurrItem = {
  currency: string
  setCurrency: () => Promise<void>
}

export const createCurrencyDataSlice: StateCreator<
    CurrItem,
    [['zustand/immer', never]],
    [],
    CurrItem
> = (set) => ({
    currency: '',
    setCurrency: async () => {
      const api = 'https://currency-rate-exchange-api.onrender.com/usd'
      const response = await fetch(api)
      const data = await response.json()
      set({ currency: data })
    }
})