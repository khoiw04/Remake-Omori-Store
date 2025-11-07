// Reusable Way by https://youtu.be/kgw83CziJgM?&t=56
import { useInfiniteQuery, usePrefetchInfiniteQuery, useQueries } from '@tanstack/react-query'
import { fetchItem } from './fetchPagination'
import { getPrice } from './format-currency';
import type {InfiniteData} from '@tanstack/react-query';
import type {ItemInformation} from '@/data/data';

// import { supabase } from '@/supabase/supabase';

// export const itemsQueries = {
//     all: ['items', ['allItems']],
//     listInfinite: (filters?: string) => {
//         queryOptions({
//             queryKey: [...itemsQueries.all, "items", filters],
//             staleTime: 1000 * 60 * 60 * 24 * 14,
//             queryFn: () => fetchItem,
//         })
//     },
//     listItem: (productId?: string) => {
//         queryOptions({
//             queryKey: [...itemsQueries.all, "items", productId],
//             queryFn: async () => {
//                 const { data, error } = await supabase.from("item").select("*")

//                 if (error) return

//                 return data.find(item => item.id === productId)
//             }
//         })
//     },
// }

export const useItems = (a: Array<ItemInformation>) => {
    return useInfiniteQuery(
        {
            queryFn: ({ pageParam }) => fetchItem({pageParam, a}),
            initialPageParam: 0,
            queryKey: ['items', ['allItems']],
            getNextPageParam: (lastPage) => lastPage.nextPage,
            placeholderData: (previousData) => previousData,
            initialData: { pages: [], pageParams: [] },
            gcTime: 1000 * 60 * 60 * 24 * 14
        }
    )
}

export const prefetchInfinte = (a: Array<ItemInformation>) => usePrefetchInfiniteQuery(
    {
      queryFn: ({ pageParam }) => fetchItem({pageParam, a}),
      initialPageParam: 0,
      queryKey: ['items', ['allItems']],
      getNextPageParam: (lastPage: { nextPage: any }) => lastPage.nextPage,
      initialData: { pages: [], pageParams: [] },
      gcTime: 1000 * 60 * 60 * 24 * 14
    }
)

export const getPriceItems = (
    data: InfiniteData<{
        data: Array<ItemInformation>;
        currentPage: number;
        nextPage: number | null;
    }, unknown>,
    countryCode: string,
    transfer: string | undefined,
    currency: string
) => {

    // PURPOSE: REMOVAL OF DUPLICATE DATA RETENTION

    // 1. Flat
    const allItems = data.pages.flatMap(page => page.data)

    const keyPrice = new Map()
    allItems.forEach(item => {
        const basePrice = item.price[0].replace("$", "")
        // 2. Store no duplication value
        // Example: { "US-20" => "20", "US-50" => "50", "US-80" => "80" }
        keyPrice.set(`${countryCode}-${basePrice}`, basePrice)
    })

    // 3. Flat again for query service:
    // Example: ["US-20", "20"], ["US-50", "50"], ["US-80", "80"]

    const uniquePrice = Array.from(keyPrice)


    // Get the Price

    const priceQueries = useQueries({
        // ["US-20", "20"]
        // Get the value, not the key
        // => [_. "20"]
        queries: uniquePrice.map(([_, base]) => ({
        queryKey: ['curr', countryCode, base],
        queryFn: () => {
            const transferRate = transfer?.toString() || "1"
            return getPrice(currency, transferRate, base)
        },
        initialData: base
        }))
    })

    // 2. Store
    // Before: ["25", "62.5", "100"]
    // Result: { "US-20" => "25", "US-50" => "62.5", "US-80" => "100" }
    // Meaning: const myMap = new Map([
    //            ["US-20", "25"],
    //            ["US-50", "62.5"],
    //            ["US-80", "100"]
    //          ])
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
    // Left is Key
    // Right is Value
    const priceResultMap = new Map()
    uniquePrice.forEach(([key, base], index) => {
        priceResultMap.set(key, priceQueries[index]?.data || base)
    })

    return priceResultMap
}