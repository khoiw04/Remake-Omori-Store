import { create } from "zustand"

export type CountryCode = {
  countryCode: string
  updateCountryCode: (newCode: string) => void
}

export const useCountryCodeStore = create<CountryCode>((set) => ({
  countryCode: typeof window !== 'undefined' ? localStorage.getItem('countryCode') || 'US' : 'US',
  updateCountryCode: (newCode: string) => {
    set({ countryCode: newCode })
    if (import.meta.env.SSR) {
        return undefined
    }
    if (typeof localStorage === 'undefined') return
    localStorage.setItem('countryCode', newCode)
  }
}))