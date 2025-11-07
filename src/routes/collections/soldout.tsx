import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useStore } from 'zustand'
import { Fragment } from 'react/jsx-runtime'
import { useShallow } from 'zustand/react/shallow'
import type {ItemInformation} from '@/data/data';
import { formatCurrency } from '@/utils/format-currency'
import { ListSubItemDisplay, ListSubMainFrame } from '@/components/Lists'
import { currencyOffScript } from '@/data/data'
import { useCountryCodeStore } from "@/zustand/countryCode-slice"
import { useZustandStore } from '@/zustand/main'
import { getPriceItems, prefetchInfinte, useItems } from '@/utils/queries'

export const Route = createFileRoute('/collections/soldout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { item } = useRouteContext({
      from: '/collections/soldout'
  })
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
    <ListSubMainFrame>
      {data.pages.map(page => (
        <Fragment key={page.currentPage}>
          {page.data.map((s, index) => {
            const { img, title, price, alt, type } = s
            const basePrice = price[0].replace("$", "")
            const priceKey = `${countryCode}-${basePrice}`

            const convertedPrice = priceResultMap.get(priceKey) || basePrice

            if (type === "soldOut")
            return (
              <ListSubItemDisplay
                alt={alt}
                type={type}
                title={title}
                img={img[0].src}
                preview={img[1].src}
                key={`all_items!---${index}`}
                price={formatCurrency(selectedCountry?.lang, selectedCountry?.transfer, Number(convertedPrice))}
              />
            )
          })}
        </Fragment>
      ))}

      <li id="Infinity Pagination. Thank to Cosden Solution" ref={ref} className="absolute bottom-0 w-full h-[1px]"></li>
    </ListSubMainFrame>
  )
}