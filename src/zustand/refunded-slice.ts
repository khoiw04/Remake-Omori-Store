import type { StateCreator } from "zustand"

type Reason = 'duplicate' | 'fraudulent' | 'requested_by_customer' | string | undefined

interface QuantityItem {
  base: number
  max: number
  quantity: number
  currency: string
  amount: number
  title: string
}

export type RefundSlice = {
  index: number
  reason: Reason
  boolean: boolean
  productId: string
  refunded: 'create' | 'cancel' | undefined
  reasonCustomer: string
  quantities: Map<string, QuantityItem>
  setRefund: (index: number, boolean: boolean, productId: string) => void
  setReason: (reason: Reason) => void
  setFinished: (type: 'create' | 'cancel' | undefined) => void
  setQuantities: (productId: string, quantity: number, max: number, amount: number, title: string, currency: string) => void
  removeQuantity: (productId: string) => void;
  resetQuantities: () => void
  setQuantity: (productId: string, quantity: number) =>  void
}

export const createRefundedSlice: StateCreator<
    RefundSlice,
    [['zustand/immer', never]],
    [],
    RefundSlice
> = (set) => ({
    index: -1,
    boolean: false,
    reason: undefined,
    productId: '',
    reasonCustomer: '',
    refunded: undefined,
    amountProducts: 0,
    quantities: new Map(),
    setRefund: (index, boolean, productId) => set({ index, boolean, productId }),
    setReason: (reason) => set({ reason }),
    setFinished: (type) => set({ refunded: type }),
    setQuantities: (productId, quantity, max, amount, title, currency) => 
    set((state) => {
        state.quantities.set(productId,
          {
            quantity,
            amount,
            title,
            currency,
            max,
            base: amount / max
          }
        )
    }),
    removeQuantity: (productId) =>
      set(state => {
        state.quantities.delete(productId)
      }),
    resetQuantities: () => set({ quantities: new Map() }),
    setQuantity: (productId, quantity) => 
      set(state => {
        const item = state.quantities.get(productId)
        if (item) {
          item.quantity = quantity
        }
      })
})