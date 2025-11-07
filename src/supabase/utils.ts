import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { supabase } from "./supabase"

export const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const { data, error: _error } = await supabase.auth.getUser()

  if (!data.user?.email) {
    return null
  }

  return {
    email: data.user.email,
  }
})

export const loginFn = createServerFn({ method: 'POST' })
  .validator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return {
        error: true,
        message: error.message,
      }
    }
})

export const logoutFn = createServerFn().handler(async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      error: true,
      message: error.message,
    }
  }

  throw redirect({
    href: '/',
  })
})

export const signupFn = createServerFn({ method: 'POST' })
  .validator(
    (d: { email: string; password: string; redirectUrl?: string }) => d,
  )
  .handler(async ({ data }) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })
    if (error) {
      return {
        error: true,
        message: error.message,
      }
    }
  })

// export const fetchItems = createServerFn({ method: 'GET' })
//     .validator(
//       (d: { productId: string }) => d,
//     )
//     .handler(
//     async ({ data: productId }) => {
//         const { data, error } = await supabase.from("item").select("*")

//         if (error) {
//             throw notFound()
//         }

//         return data.find((item) => item.id === productId)
//     },
// )

// export const Route = createFileRoute('/account/')({
//   beforeLoad: ({ context }) => {
//     if (!context.user) {
//       throw new Error('Not authenticated')
//     }
//   },
//   errorComponent: ({ error }) => {
//     if (error.message === 'Not authenticated') {
//       return <Login />
//     }
//   },
// })