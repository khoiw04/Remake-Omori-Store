// Start: https://tanstack.com/start/latest/docs/framework/react/examples/start-supabase-basic
// Cookies: https://medium.com/@ishdagnesh/how-to-store-cookies-in-react-js-with-vite-6eaf3872d895
// import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
// import Cookies from 'js-cookie'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    // {
    //     cookies: {
    //         getAll() {
    //             const allCookies = Cookies.get()
    //             return Object.entries(allCookies).map(([name, value]) => ({
    //                 name,
    //                 value,
    //             }))
    //         },
    //         setAll(cookies) {
    //             cookies.forEach((cookie) => {
    //                 const cookieOptions: Cookies.CookieAttributes = {
    //                     path: '/',
    //                 }

    //                     if (cookie.options.sameSite) {
    //                         const sameSiteValue = cookie.options.sameSite;
    //                         if (sameSiteValue === 'strict' || sameSiteValue === 'lax' || sameSiteValue === 'none') {
    //                             cookieOptions.sameSite = sameSiteValue;
    //                         }
    //                     }

    //                     if (cookie.options.maxAge) {
    //                         cookieOptions.expires = new Date(Date.now() + cookie.options.maxAge * 1000);
    //                     }
                    
    //                 Cookies.set(cookie.name, cookie.value, cookieOptions);
    //             })
    //         }
    //     },
    // }
)

// import { parseCookies, setCookie } from '@tanstack/react-start/server'
// import { createServerClient } from '@supabase/ssr'

// export const supabase = createServerClient(
//     import.meta.env.VITE_SUPABASE_URL!,
//     import.meta.env.VITE_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return Object.entries(parseCookies()).map(([name, value]) => ({
//             name,
//             value,
//           }))
//         },
//         setAll(cookies) {
//           cookies.forEach((cookie) => {
//             setCookie(cookie.name, cookie.value)
//           })
//         },
//       },
//     },
//   )