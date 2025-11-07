import type { StateCreator } from "zustand"
import { supabase } from "@/supabase/supabase"

export type supaInfoClient = {
    first_name: string
    last_name: string
    name: string
    city: string
    line1: string
    line2: string
    phone: string
    email: string
    country: string
    postal_code: number | string | undefined
    setInfo: () => Promise<void>
}

export const createInformationSlice: StateCreator<
    supaInfoClient,
    [['zustand/immer', never]],
    [],
    supaInfoClient
> = (set) => ({
    first_name: '',
    last_name: '',
    name: '',
    city: '',
    line1: '',
    line2: '',
    phone: '',
    email: '',
    country: '',
    postal_code: undefined,
    setInfo: async () => {
      const user = await supabase.auth.getUser()
      if (user.data.user?.id === undefined) return
        const { data, error } = await supabase
          .from('users')
          .select('*', { count: "planned" })
          .eq('id', user.data.user.id)

          if (error) {
            return
          }

        const info = user.data.user
        const meta = info.user_metadata

        const userData = data[0];

        set({
          email: meta.email,
          first_name: meta.first_name,
          last_name: meta.last_name,
          name: meta.first_name + ' ' + meta.last_name
        })

        if (userData)
        set({
          phone: userData.phone || '',
          city: userData.province || '',
          line1: userData.address_1 || '',
          line2: userData.address_2 || '',
          country: userData.country || '',
          postal_code: userData.zip || ''
        })
      }
})