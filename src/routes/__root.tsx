import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { AuthContext } from '@/utils/useAuth'
import type { QueryClient } from '@tanstack/react-query'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import { seo } from '@/utils/seo'

type RouterContext = {
  authentication: AuthContext
  queryClient: QueryClient
  item: PostgrestSingleResponse<Array<any>>
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  ),
  head: () => {
    const tags = seo({
      title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
      description: 'TanStack Start is a type-safe, client-first, full-stack React framework.',
    })

    const titleTag = tags.find(tag => 'title' in tag)?.title
    const metaTags = tags.filter(tag => !('title' in tag))

    return {
      title: titleTag,
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ...metaTags,
      ],
    }
  },
})