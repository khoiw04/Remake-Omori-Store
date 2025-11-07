import type { StateCreator } from "zustand"

type CartItem = {
  id: string
  name: string
  price: number
  size_type: string
  size_index: number
  size_max: number
  quantity: number
  type?: string
  src: string
  alt_src: string
  alt_pre: string
  preview: string
  tax_code: string
}

export type CartState = {
  cart: Array<CartItem>
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  setToCart: (idx: number, value: number) => void
  resetCart: () => void
}

export const createCartStore: StateCreator<
    CartState,
    [['zustand/immer', never]],
    [],
    CartState
> = (set) => ({
    cart: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
    addToCart: (item) => {
        set(state => {
        if (import.meta.env.SSR) {
        return undefined
        }
        if (typeof localStorage === 'undefined') return
        const updatedCart = [...state.cart, item]
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        return { cart: updatedCart }
        })
    },
    removeFromCart: (id) => {
        set(state => {
        const updatedCart = state.cart.filter((item) => item.id !== id)
        if (import.meta.env.SSR) {
            return undefined
        }
        if (typeof localStorage === 'undefined') return
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        return { cart: updatedCart }
        })
    },
    setToCart: (idx, value) => {
        set(state => {
            const item = state.cart[idx]
                item.quantity = isNaN(value) || value < 1 ? 1 : value
                if (import.meta.env.SSR) {
                    return undefined
                }
                if (typeof localStorage === 'undefined') return
                localStorage.setItem('cart', JSON.stringify(state.cart))
        })
    },
    resetCart: () => {
        set(state => {
            state.cart = []
        })
    }
})
