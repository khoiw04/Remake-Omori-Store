// https://www.youtube.com/watch?v=b-mgca_2Oe4
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"
import { useDebouncer } from '@tanstack/react-pacer/debouncer'
import { useShallow } from "zustand/react/shallow"
import type { ItemInformation } from "@/data/data"
import { currencyOffScript } from "@/data/data"
import { useCountryCodeStore } from "@/zustand/countryCode-slice"
import { Close, Load, SearchIcon } from "@/data/SVG"
import { supabase } from "@/supabase/supabase"
import { formatCurrency, getPrice } from "@/utils/format-currency"
import { useZustandStore } from "@/zustand/main"

export default function Main() {

    const { click } = useZustandStore()


    return (
      <AnimatePresence>
        {click.search &&
          <motion.aside
            initial={{ translateX: "100%" }}
            animate={{ translateX: "0%" }}
            exit={{ translateX: "100%" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className='w-11/13 omo:lg:w-2/5 lg:min-w-156 lg:w-3/9 h-dvh fixed right-0 z-30 bg-white dark:bg-[#121212] box-shadow-inner-tailwind overflow-y-auto overflow-x-hidden'>
            <Header />
            <Article />
            <Result />
          </motion.aside>
        }
      </AnimatePresence>
    )
}

export function Header() {
  const { setClick } = useZustandStore()

  return (
    <header className='flex | justify-between | uppercase text-xs px-4 sm:px-8 mt-6 text-slate-800 dark:text-slate-200'>
      search
      <button
        type='button'
        onClick={() => setClick('search', false)}
        className='cursor-pointer'
      >
        <Close className='scale-130' />
      </button>
    </header>
  )
}

export function Article() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { search, setSearch } = useZustandStore(
    useShallow(state => ({
      search: state.search,
      setSearch: state.setSearch
    }))
  )

  const debounced = useDebouncer(setSearch, { wait: 1000, leading: false, enabled: search.length > 0 })
    
  const { click } = useZustandStore()


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (click.search && inputRef.current && document.activeElement !== inputRef.current && /^[a-zA-Z0-9]$/.test(event.key)) {
        inputRef.current.focus()
      }
    }

    if (inputRef.current && click.search) {
      setTimeout(() => {
        inputRef.current!.focus()
      }, 0)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [click.search, click.login])

  return (
    <article className='flex | items-center | w-full | px-3.75 p-4 sm:px-auto sm:p-8 mt-8 sm:mt-0 gap-4 | use font round'>
      <label htmlFor="search">
        <SearchIcon className='text-slate-800 dark:text-slate-200' />
      </label>
      <input
        type="text"
        id="search"
        ref={inputRef}
        value={search}
        checked={false}
        placeholder='Two steps ahead'
        onChange={(e) => {
          const val = e.target.value
          setSearch(val)
          debounced.maybeExecute(val)
        }}
        className='w-full h-10 p-4 | dark:focus:outline-slate-600 dark:focus:border-slate-600 focus:outline-slate-800 focus:border-slate-800 dark:text-slate-200' 
      />
    </article>
  )
}

export function Result() {
  const { countryCode } = useCountryCodeStore()
  const { search } = useZustandStore(
    useShallow(state => ({
      search: state.search
    }))
  )

  const selectedCountry = currencyOffScript.find(a => a.code === countryCode)

  // Data
  const { data, isPending, error } = useQuery(
    {
      queryKey: ['search', search],
      queryFn: async () => {
        const { data: searchData, error: errorFetch } = await supabase
                                      .from('item')
                                      .select()
                                      .ilike('title', `%${search}%`)

        if (errorFetch) {
          console.error(errorFetch)
        }

        return searchData as Array<ItemInformation>
      },
      placeholderData: (previous) => previous,
      refetchOnWindowFocus: false
    }
  )

  // Price
  const keyPrice = new Map()
  data?.forEach(item => {
    const basePrice = item.price[0].replace("$", "")
    keyPrice.set(`${countryCode}-${basePrice}`, basePrice)
  })
  const { currency } = useZustandStore(
      useShallow(state => {
        return { currency: state.currency }
      })
  )

  const uniquePrice = Array.from(keyPrice)

  const priceQueries = useQueries({
    queries: uniquePrice.map(([_, base]) => ({
      queryKey: ['curr', countryCode, base],
      queryFn: () => {
        const transferRate = selectedCountry?.transfer.toString() || "1"
        return getPrice(currency, transferRate, base)
      },
      initialData: base
    }))
  })

  const priceResultMap = new Map()
  uniquePrice.forEach(([key, base], index) => {
    priceResultMap.set(key, priceQueries[index]?.data || base)
  })

  if (error) return null

  return (
    <>
      {search.length > 0 &&
        <>
        <>
          {isPending &&
            <Load className="w-full mx-auto text-slate-800/80 dark:text-white/80 absolute" />
          }
        </>
        <ol className="w-full p-4 sm:p-8 *:first:mt-0 *:mt-8 *:pb-8 divide-y divide-slate-800 dark:divide-neutral-400 dark:text-white/80">
          {data && data.flatMap((s_, i) => {
            const basePrice = s_.price[0].replace("$", "")
            const priceKey = `${countryCode}-${basePrice}`

            const convertedPrice = priceResultMap.get(priceKey) || basePrice

            return (
            <li key={`search!____${i}`} className="w-full table text-left *:table-cell *:float-left *:nth-[2]:pl-8">
              <a
                href="https://www.youtube.com/watch?v=b-mgca_2Oe4"
                className="w-2/6 2xl:w-1/5 hover:opacity-90 mt-2 sm:mt-0"
              >
                <img
                  width={200}
                  src={s_.img[0].src}
                  alt={s_.img[0].alt}
                />
              </a>
              <div className="w-4/6">
                <h2 className="text-lg md:text-[calc(1vmin+10px)] capitalize">{s_.title}</h2>
                <h3 className="text-sm md:text-[calc(0.6vmin+8px)] xl:mt-2">{formatCurrency(selectedCountry?.lang, selectedCountry?.transfer, Number(convertedPrice))}</h3>
              </div>
            </li>
          )})}
        </ol>
        </>
      }
    </>
  )
}