// https://www.youtube.com/watch?v=aMfBeXD_rnE
// https://www.youtube.com/watch?v=3e-higRXoaM
import type { ItemInformation } from "@/data/data"

const LIMIT = 10

export function fetchItem({ pageParam, a }: { pageParam: number, a?: Array<ItemInformation> }): Promise<{
    data: Array<ItemInformation>,
    currentPage: number,
    nextPage: number | null
}> {
    const next = pageParam + LIMIT
    const items = Array.isArray(a) ? a : [a]
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                data: a!.slice(pageParam, next),
                currentPage: pageParam,
                nextPage: next < items.length ? next : null
            })
        }, 1000)
    })
}