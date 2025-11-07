import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { enableMapSet } from 'immer'

import type { Store } from '@/zustand/store'

import { createCurrencyDataSlice } from '@/zustand/currencyData-slice'
import { createInformationSlice } from '@/zustand/dataSupa-slice'
import { createRefundedSlice } from '@/zustand/refunded-slice'
import { createAccountSlice } from '@/zustand/account-slice'
import { createSearchSlice } from '@/zustand/search-slice'
import { createMenuSlice } from '@/zustand/menu-slice'
import { createCartStore } from '@/zustand/cart-slice'

enableMapSet()

export const useZustandStore = create<Store>()(
	devtools(
			subscribeWithSelector(
				immer((...a) => ({
					...createAccountSlice(...a),
					...createMenuSlice(...a),
					...createCartStore(...a),
					...createSearchSlice(...a),
					...createCurrencyDataSlice(...a),
					...createInformationSlice(...a),
					...createRefundedSlice(...a)
				}))
			)
	)
)