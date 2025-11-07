import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useShallow } from "zustand/react/shallow"
import { loadStripe } from "@stripe/stripe-js"
import { Link } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { useStore } from "zustand"
import { slugify } from "@/utils/slug"
import { Close } from "@/data/SVG"
import { formatCurrency, getPrice } from "@/utils/format-currency"
import { currencyOffScript } from "@/data/data"
import { useCountryCodeStore } from "@/zustand/countryCode-slice"
import { useZustandStore } from "@/zustand/main"

type Value = {
        shipping_fee: Array<string>;
        item: Array<{
            quantity: number;
            max: number;
            name: string;
            index: number;
            type: string;
            price: number;
            img: Array<string>;
            tax_code: string;
        }>;
        curr: {
            name: string;
            code: string;
            transfer: string;
            lang: string;
        } | undefined;
        total: string;
        info: {
            name: string;
            city: string;
            line1: string;
            line2: string;
            phone: string;
            email: string;
            state: string;
            country: string;
            postal_code: string | number | undefined;
        };
}

export default function Cart() {
    const { cart, setToCart, removeFromCart, click } = useZustandStore()

    // item
    const { countryCode } = useCountryCodeStore()

    const currency = useStore(useZustandStore,
        useShallow(
            state => state.currency
        )
    )
    const selectedCountry = currencyOffScript.find(item => item.code === countryCode)

    // price
    // total
    const acc = cart.map(u => u.quantity * u.price)
                    .reduce((a, c) => a + c, 0)

    // cart's price
    const results = useQueries(
        {
            queries: cart.map(item => ({
                queryKey: ['curr', [countryCode, item.id]],
                queryFn: () => getPrice(currency, selectedCountry!.transfer, String(item.price)).then(Number),
                initialData: item.price,
            })),
            combine(result) {
                return {
                    data: result.map(s => s.data)
                }
            }
        }
    )

    // total's query
    const { data: total } = useQuery(
        {
            queryKey: ['curr', [cart, selectedCountry!.transfer]],
            queryFn: () => getPrice(currency, selectedCountry!.transfer, String(acc)).then(Number),
            placeholderData: (old) => old,
            initialData: acc,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true
        }
    )
    const every = formatCurrency(selectedCountry?.lang, selectedCountry?.transfer, total)
    // form
    const { city, line1, line2, phone, email, country, postal_code, name: fullName } = useStore(useZustandStore, state => state)

    const form = useForm(
        {
            defaultValues: {
                curr: selectedCountry,
                item: [
                    {
                        max: 0,
                        name: '',
                        index: 0,
                        type: '',
                        price: 0,
                        img: [''],
                        quantity: 0,
                        tax_code: ''
                    }
                ],
                total: every,
                info: {
                    name: fullName,
                    city: city,
                    line1: line1,
                    line2: line2,
                    phone: phone,
                    email: email,
                    state: country,
                    country: selectedCountry!.lang.toUpperCase(),
                    postal_code: postal_code
                }
            },
            onSubmit: async (props) => {
                const updatedProps = {
                    ...props,
                    value: {
                        ...props.value,
                        shipping_fee: [
                            await getPrice(currency, selectedCountry!.transfer, String(8)),
                            await getPrice(currency, selectedCountry!.transfer, String(16))
                        ],
                        item: props.value.item.map(item => ({
                            ...item,
                            quantity: Math.min(item.quantity, item.max)
                        }))
                    }
                }
                addToCart.mutateAsync(updatedProps.value)
            }
        }
    )
    const addToCart = useMutation(
        {
            mutationKey: ['Adding_CART', cart],
            mutationFn: async (s: Value) => {
                const response = await fetch('/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                body: JSON.stringify(s)
                })

                if (!response.ok) {
                    const err = await response.text()
                    console.error('Stripe error:', err)
                    throw new Error(err)
                }

                const data = await response.json();
                return data
            },
            onSuccess: async (data) => {
                const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)
                stripe?.redirectToCheckout({
                    sessionId: data.sessionId as string
                })
            }
        }
    )

    useEffect(() => {if (selectedCountry) form.setFieldValue('curr', selectedCountry)}, [selectedCountry]);
    useEffect(() => form.setFieldValue('total', every), [every])
    useEffect(() => {
        form.setFieldValue(
            'item',
            cart.map((u, i) => {
                return {
                    name: u.name,
                    type: u.size_type,
                    index: u.size_index,
                    quantity: u.quantity,
                    price: results.data[i],
                    img: [u.src, u.preview],
                    tax_code: u.tax_code,
                    max: u.size_max,
                }
            })
        )
    }, [cart, click, countryCode, results])
    useEffect(() => {
        form.setFieldValue('info.city', city)
        form.setFieldValue('info.state', city)
        form.setFieldValue('info.email', email)
        form.setFieldValue('info.line1', line1)
        form.setFieldValue('info.line2', line2)
        form.setFieldValue('info.phone', phone)
        form.setFieldValue('info.name', fullName)
        form.setFieldValue('info.postal_code', postal_code)
        form.setFieldValue('info.country', selectedCountry!.lang.toUpperCase())
    }, [click, city, email, line1, line2, phone, fullName, postal_code, selectedCountry])

    return (
        <AnimatePresence>
            {click.cart &&
                <motion.aside
                initial={{ translateX: "100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "100%" }}
                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                className='w-11/13 lg:w-2/5 h-dvh fixed right-0 z-30 bg-white dark:bg-[#121212] box-shadow-inner-tailwind overflow-y-auto overflow-x-hidden'>
                <Header />
                {
                    cart.length !== 0 ?
                        <form
                            id='Table Trick below by OMOCAT | I learn new-thing'
                            className='flex flex-col | w-full | p-8 gap-4 | use font round'
                            onSubmit={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}
                        >
                            <article className='w-full h-fit'>
                                <ul className='*:border-b *:border-b-slate-200 dark:*:border-b-neutral-800 dark:text-neutral-200 *:first:pt-0 *:pt-8 *:pb-8 *:table *:table-fixed *:w-full'>
                                    {
                                        cart.map((u, i) => {
                                            const { src, alt_src, name, size_type } = u
                                            const slug_title = slugify(u.name)

                                            return (
                                                <li key={`cart-!-da ta___${i}`}>
                                                    <section className='float-left table-cell | w-full sm:w-[25%] | pl-0'>
                                                    <Link to="/products/$productId" params={{ productId: slug_title }} className='block relative overflow-hidden my-5 *:max-h-44 *:transition-opacity *:duration-75 opacity-90 dark:opacity-80 selection:opacity-60'>
                                                        <img
                                                            src={src}
                                                            alt={alt_src}
                                                            loading="lazy"
                                                            className='mx-auto'
                                                        />
                                                    </Link>
                                                    </section>
                                                    <section className="table-cell float-left | w-full sm:w-1/2 min-w-40 h-fit | pl-0">
                                                        <div className='size-full | flex flex-col | justify-center items-center | text-center'>
                                                            <label
                                                                aria-label="name"
                                                                className='opacity-85 cursor-text'
                                                                id={`customer-${name + " " + size_type}`}
                                                            >
                                                                    {name}
                                                            </label>
                                                            <p
                                                                aria-label="type"
                                                                className='pt-2 opacity-85'
                                                            >
                                                                    {size_type}
                                                            </p>
                                                            <p
                                                                aria-label="price"
                                                                className="pt-4 opacity-85"
                                                            >
                                                                {formatCurrency(selectedCountry?.lang, selectedCountry?.transfer, results.data[i])}
                                                            </p>
                                                            <div className='relative | mt-10 | flex flex-row | justify-between items-center | border-b border-b-slate-200 dark:border-b-neutral-800 pb-0.5'>
                                                            <button
                                                                type="button"
                                                                title='decrement'
                                                                onClick={() => setToCart(i, cart[i].quantity - 1)}
                                                                className='cursor-pointer px-4 py-2 absolute -left-2 opacity-90 z-10'>-</button>
                                                            <input
                                                                min={0}
                                                                max={10}
                                                                type="text"
                                                                maxLength={2}
                                                                pattern="\d{0,2}"
                                                                value={u.quantity}
                                                                aria-label="quantity"
                                                                onChange={(e) => setToCart(i, Number(e.target.value))}
                                                                className='w-24 h-8 opacity-85 | text-center | focus:outline-slate-400 focus:border-slate-400 | no-arrows'
                                                            />
                                                            <button
                                                                type="button"
                                                                title='increment'
                                                                onClick={() => setToCart(i, cart[i].quantity + 1)}
                                                                className='cursor-pointer px-4 py-2 absolute -right-2 opacity-90 z-10'>+</button>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                title='remove'
                                                                onClick={() => removeFromCart(u.id)}
                                                                className='mt-6 underline focus:outline-offset-8 focus:transition-all focus:duration-75 text-sm cursor-pointer z-10'>Remove</button>
                                                        </div>
                                                    </section>
                                                </li>
                                            )})
                                        }
                                </ul>
                            </article>
                            <footer className='w-full h-fit mt-8 | flex flex-col | justify-center items-center | dark:text-white/80'>
                                <small>SUBTOTAL</small>
                                <p
                                    className='text-[calc(18px+1vmin)] mt-2'
                                >   
                                    {every}
                                </p>
                                <p className='text-sm text-center mt-4'>Texes and shipping calculated at checkout</p>
                                <form.Subscribe
                                    selector={(state) => [state.canSubmit]}
                                    children={([canSubmit]) =>
                                        <input
                                            type="submit"
                                            value="CHECK OUT"
                                            onClick={form.handleSubmit}
                                            disabled={!canSubmit}
                                            className='bg-gray-950 active:bg-slate-600 dark:active:bg-gray-600 rounded-lg | mt-8 px-8 py-2.5 | text-white active:text-white/60 font-semibold cursor-pointer focus:outline-offset-8 active:outline-offset-8 active:outline-fuchsia-600/40 focus:outline-fuchsia-600/40 dark:focus:outline-amber-200/40 dark:active:outline-amber-200/40 active:transition-all focus:transition-all disabled:bg-neutral-800/80 disabled:text-neutral-400 transition-colors duration-75'
                                        />
                                    }
                                />
                                <AnimatePresence mode="wait">
                                {addToCart.isPending &&
                                    <motion.p
                                        initial={{ opacity: 0.85, filter: `blur(2px)`, scale: 0.95 }}
                                        animate={{ opacity: 1, filter: `blur(0px)`, scale: 1 }}
                                        exit={{ opacity: 0, filter: `blur(0px)`, scale: 1 }}
                                        className="text-sm text-slate-900 dark:text-slate-300 text-center mt-8"
                                    >
                                        Get your point
                                    </motion.p>
                                }
                                </AnimatePresence>
                                {addToCart.isError && <p className='text-red-500 text-center dark:text-red-400/80 text-sm mt-6'>
                                    {addToCart.error.message}
                                </p>}
                            </footer>
                        </form>
                    :   <Message />
                }
            </motion.aside>}
        </AnimatePresence>
    )
}

export function Header() {
    const { click, setClick } = useZustandStore()

    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (click.cart) {
            closeButtonRef.current?.focus()
        }
    }, [click.cart])

    return (
    <header className='flex | justify-between | uppercase text-xs px-13 mt-9 text-slate-800 dark:text-neutral-200'>
        CART
        <button
            tabIndex={0}
            type='button'
            title='close'
            ref={closeButtonRef}
            className='cursor-pointer'
            onClick={() => 
                {
                    setClick('cart', false)
                }
            }
        >
        <Close className='scale-130' />
        </button>
    </header>
    )
}

const Message = () => {
    const { data } = useQuery(
        {
            queryKey: ['message'],
            queryFn: () => {
                const src = [
                    'Nothing',
                    'Hello, world!',
                    'Merry X-mass',
                    'Pumpa kungen!',
                    '日本ハロー！',
                    '한국 안녕하세요!',
                    'Helo Cymru!',
                    'Cześć Polsko!',
                    '你好中国！',
                    'Привет Россия!',
                    'Γεια σου Ελλάδα!',
                    'Lennart lennart = new Lennart()',
                    'THX XAPHOBIA',
                    'Ahhhhhh!',
                    '/give @a hugs 64',
                    'Stop being reasonable, this is the Internet!',
                    '§1C§2o§3l§4o§5r§6m§7a§8t§9i§ac',
                    '4815162342 lines of code!',
                    'sqrt(-1) love you!',
                    'Minecraft!',
                    "This text is hard to read if you play the game at the default resolution, but at 1080p it's fine!",
                    'Missingno',
                    '# This message will not appear on the splash screen',
                    'hidden=This is a hidden message!',
                    'Also try Balatro!',
                    'Made by Wwan!',
                    'Kirby vs Waddle Dee',
                    'Pat Metheny',
                    'Queen',
                    'Jesse Nyberg',
                    'tppo',
                    'OMOCAT',
                    'Off Script',
                    'C418',
                    'The Annoying Dog',
                    'Finally complete!',
                    "I hate developing. Ahhhh, this job's so harddddd",
                    'Dirty Hacker'
                ]

                const finalMessage = 'Finally complete!'
                const secondMessage = 'Hello, world!'
                const dis = src.filter(a => 
                    !a.startsWith('#') && 
                    !a.startsWith('hidden=') && 
                    !a.startsWith('Finally') && 
                    !a.startsWith('Hello, world!') && 
                    !a.startsWith('Dirty Hacker')
                )
                if (import.meta.env.SSR) {
                    return undefined
                }
                if (typeof localStorage === 'undefined') return
                let message: string
                const storage = localStorage.getItem('messages')

                if (storage) {
                    const stored = JSON.parse(storage)
                    
                    // Second
                    if (stored.length === 1) {
                        stored.push(secondMessage)
                        localStorage.setItem('messages', JSON.stringify(stored))
                        return secondMessage
                    }

                    // Reset
                    if (stored.length >= dis.length) {
                        if (!stored.includes(finalMessage)) {
                            stored.push(finalMessage)
                            localStorage.setItem('messages', JSON.stringify(stored))
                            return finalMessage
                        } else {
                            localStorage.setItem('messages', JSON.stringify([src[0]]))
                            message = src[0]
                            return message
                        }
                    }
                    
                    // Find
                    const availableMessages = dis.filter(s => !stored.includes(s))
                    const randomIndex = Math.floor(Math.random() * availableMessages.length)
                    message = availableMessages[randomIndex]
                    
                    stored.push(message)
                    localStorage.setItem('messages', JSON.stringify(stored))
                    return message
                } else {
                    // Initialize
                    localStorage.setItem('messages', JSON.stringify([src[0]]))
                    localStorage.setItem('all_message', JSON.stringify(src))
                    return 'Nothing'
                }
            },
            refetchOnWindowFocus: false
        }
    )

    return (
        <article className='w-full h-13/14'>
            <h2 className="mx-auto text-slate-800/80 dark:text-white/90 opacity-90 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {data}
            </h2>
        </article>
    )
}