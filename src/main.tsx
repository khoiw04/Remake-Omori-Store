import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter as createTanStackRouter } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'

import '@/styles/styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { useAuth } from './utils/useAuth.ts'
import { supabase } from './supabase/supabase.ts'

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: { authentication: undefined!, queryClient: undefined!, item: undefined! },
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 400_000,
    defaultViewTransition: true,
    defaultNotFoundComponent: () => <></>
  })
  
  return router
}

const router = createRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()
const data = await supabase.from("item").select("*")


// Render the app
const rootElement = document.getElementById('wait___tanstack-start')
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement)
  const auth = useAuth()
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ authentication: auth, queryClient: queryClient, item: data }} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
