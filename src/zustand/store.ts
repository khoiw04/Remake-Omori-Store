import type { AccountAction } from '@/zustand/account-slice'
import type { supaInfoClient } from '@/zustand/dataSupa-slice'
import type { CurrItem } from '@/zustand/currencyData-slice'
import type { SearchItem } from '@/zustand/search-slice'
import type { MenuAction } from '@/zustand/menu-slice'
import type { CartState } from '@/zustand/cart-slice'
import type { RefundSlice } from '@/zustand/refunded-slice'
import type { CountryCode } from '@/zustand/countryCode-slice'

export type Store = AccountAction & MenuAction & CartState & SearchItem & CurrItem & supaInfoClient & RefundSlice & CountryCode