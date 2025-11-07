// https://www.geeksforgeeks.org/currency-converter-in-javascript/
// SSL: https://www.youtube.com/watch?v=I-jULfZRejU
// Self-host in the future: https://supabase.com/docs
// Virtual Animation: https://www.devas.life/how-to-animate-a-tanstack-virtual-list-with-motion/

import { lazy, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import Cart from './Cart'
import { BurgerItem, CurrencyItem, Footer, Items, Tile } from './Tile'
import { useCountryCodeStore } from "@/zustand/countryCode-slice"
import { Main, SBR } from '@/data/img'
import { supabase } from '@/supabase/supabase'
import { useAuth } from '@/utils/useAuth'
import useEffectAfterMount from '@/utils/useEffectAfterMount'
import { useZustandStore } from '@/zustand/main'

const Login = lazy(() => import('./Login'))
const Mobile = lazy(() => import('./Moblie'))
const Fading = lazy(() => import('./Fading'))
const Search = lazy(() => import('./Search'))

export default function Navbar() {
  const { updateCountryCode } = useCountryCodeStore()
  const setCurrency = useZustandStore(state => state.setCurrency)
  const { click, setClick, setInfo } = useZustandStore()

  // Console.log
  useEffectAfterMount(() => {
    const styles1 = `${Main}; color: pink; font-size: large; font-weight: bold; text-shadow: -1px -1px 0px #493b49, 1px -1px 0px #493b49, -1px 1px 0px #493b49, 1px 1px 0px #493b49; padding: 300px 200px; background-repeat: no-repeat; background-size: cover; background-position: center;`
    const styles2 = `${SBR}; color: white; font-size: large; font-weight: bold; text-shadow: -1px -1px 0px #493b49, 1px -1px 0px #493b49, -1px 1px 0px #493b49, 1px 1px 0px #493b49; padding: 300px 200px; background-repeat: no-repeat; background-size: cover; background-position: center;`
    console.log('%c SBR coming when I watch Peaky Blinders', styles2)
    console.log('%c huh?', styles1)
    // https://codebeautify.org/image-to-base64-converter

    setCurrency()
    if (import.meta.env.SSR) {
      return undefined
    }
    if (typeof localStorage !== 'undefined') {
      const savedCountryCode = localStorage.getItem('countryCode')
  
      setInfo()
      if (savedCountryCode) {
        updateCountryCode(savedCountryCode)
      } else {
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client`)
          .then(response => response.json())
          .then(c => {
            const a = c.countryCode
            updateCountryCode(a)
            localStorage.setItem('countryCode', a)
          })
          .catch(error => console.error('Error fetching location:', error))
      }
    }
  }, [])

  // Hide Scrollbar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      const preventScroll = (e: MouseEvent | TouchEvent) => {
        if (click.search || click.burger || click.cart || click.login) {
          setTimeout(() => {
            if (e.cancelable) {
              e.preventDefault();
            }
          }, 0)
        }
      }

      if (click.search || click.burger || click.cart || click.login) {
        document.documentElement.style.overflow = 'clip'
        document.body.style.overflow = 'clip'
        document.body.style.paddingRight = `${scrollBarWidth}px`
      } else {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }

      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventScroll, { passive: true })

      return () => {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
        window.removeEventListener('wheel', preventScroll)
        window.removeEventListener('touchmove', preventScroll)
      }
    }

  }, [click.search, click.burger, click.cart, click.login])

  // Escape
  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setClick('search', false);
      setClick('currencyMobile', false);
      setClick('currency', false);
      setClick('login', false);
      setClick('cart', false);
      setClick('forget', false);
      setClick('forgetSubmit', false);
    }
    if (event.key === 'Escape' && !click.currencyMobile) {
      setClick('burger', false);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  // Guard
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === "SIGNED_IN") {
        const authContext = useAuth();
        if (typeof authContext === 'object' && typeof authContext.signIn === 'function') {
          authContext.signIn()
        }
      }
    })

    return () => data.subscription.unsubscribe()
  }, [])

  return (
    <>
      <Login />
      <Search />
      <Cart />
      <Mobile />
      <Fading />
      <Tile
        header={
            <>
            <CurrencyItem />
            <BurgerItem />
            <Link to="/" className="font-bold">khoi.store</Link>
            <Items />
            </>
        }
        footer={<Footer />}
      />
    </>
  )
}