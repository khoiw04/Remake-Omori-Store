import { ListSubItemDisplay } from '@/components/Lists'
import { currencyOffScript, type ItemInformation } from '@/data/data'
import { formatCurrency } from '@/utils/format-currency'
import { getPriceItems, prefetchInfinte, useItems } from '@/utils/queries'
import { useCountryCodeStore } from '@/zustand/countryCode-slice'
import { useZustandStore } from '@/zustand/main'
import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { item } = useRouteContext({ from: '/' })
  prefetchInfinte(item.data as Array<ItemInformation>)
  const { data, error, fetchNextPage } = useItems(item.data as Array<ItemInformation>)  
  const { countryCode } = useCountryCodeStore()
  const selectedCountry = currencyOffScript.find(a => a.code === countryCode)
  const currency = useStore(useZustandStore,
    useShallow(
      state => state.currency
    )
  )

  const priceResultMap = getPriceItems(data, countryCode, selectedCountry?.transfer, currency)

  if (error) throw new Error(error.message)
  const { ref, inView } = useInView()
  useEffect(() => {if (inView) fetchNextPage()}, [inView])

  return (
    <main className="min-custom-screen flex flex-col items-center justify-center text-white text-[calc(10px+1vmin)]">
      {data.pages.map(page => (
        <Fragment key={page.currentPage}>
            {page.data
            .filter(data => data.type === 'preOrder')
            .sort((a, b) => {
              const aDate = new Date(a.day).getTime()
              const bDate = new Date(b.day).getTime()
              return bDate - aDate
            })
            .slice(0, 1)
            .map((s, itemIndex) => {
            const { img, title, price, alt, type } = s
            const basePrice = price[0].replace("$", "")
            const priceKey = `${countryCode}-${basePrice}`

            const convertedPrice = priceResultMap.get(priceKey) || basePrice

            return (
              <ListSubItemDisplay
                key={`all_items!---${itemIndex}`}
                alt={alt}
                type={type}
                title={title}
                img={img[0].src}
                preview={img[1].src}
                price={formatCurrency(selectedCountry?.lang, selectedCountry?.transfer, Number(convertedPrice))}
              />
            )
          })}
        </Fragment>
      ))}
      <li id="Infinity Pagination. Thank to Cosden Solution" ref={ref} className="absolute bottom-0 w-full h-[1px]"></li>
    </main>
  )
}