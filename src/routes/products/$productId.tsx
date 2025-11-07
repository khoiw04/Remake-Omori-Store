// https://www.youtube.com/watch?v=fpXOT8SNTpY
// https://michalkotowski.pl/writings/how-to-refresh-a-react-component-when-local-storage-has-changed
// https://www.omocat-shop.com/collections/all/products/omocat-original-characters-acrylic-blocks?variant=41536329449585
// Cache: https://github.com/TanStack/query/discussions/92
import { Link, createFileRoute, useRouteContext } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'
import DOMPurify from 'dompurify'
import { useStore as useStoreValue } from "zustand"
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useForm, useStore } from '@tanstack/react-form'
import { throttle } from '@tanstack/react-pacer'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'
import type { MotionValue } from "framer-motion"
import type { ItemInformation } from '@/data/data'
import { slugify } from '@/utils/slug'
import { currencyOffScript } from '@/data/data'
import { useCountryCodeStore } from "@/zustand/countryCode-slice"
import { Back, Forward, InboxArrowDown, Inspect, Print, Reload, Save } from '@/data/SVG'
import { snap } from '@/utils/snap'
import useDimension from '@/utils/useDimension'
import "@/styles/RadialMenu.sass"
import { formatCurrency, getPrice } from '@/utils/format-currency'
import { henry_stick_roll, stupid_henry } from '@/data/img'
import { useZustandStore } from '@/zustand/main'
import { seo } from '@/utils/seo'

export const Route = createFileRoute('/products/$productId')({
  component: RouteComponent,
  loader: async ({ params: { productId }, context }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const s = await context.queryClient.getQueryData(["items",["allItems"]]) as any
      
      if (s) {
        return s.pages[0].data.find((item: { id: string }) => item.id === productId)
      } else {
        return await context.queryClient.ensureQueryData(
          {
              queryKey: ["items", productId],
              queryFn: () => {
                  const { data, error } = context.item
  
                  if (error) return
  
                  return data.find(item => item.id === productId)
              }
          }
        )
      }
  },
  errorComponent: () => <></>,
  head: () => {
    const tags = seo({
      title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
      description: 'TanStack Start is a type-safe, client-first, full-stack React framework.',
    })

    const titleTag = tags.find(tag => 'title' in tag)?.title
    const metaTags = tags.filter(tag => !('title' in tag))

    return {
      title: titleTag,
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ...metaTags,
      ],
    }
  },
})

function RouteComponent() {
  const asfasfasfafsasfas = Route.useLoaderData()
  const product = asfasfasfafsasfas as ItemInformation

  const form = useForm({
    defaultValues: {
      name: product.title,
      quantity: 1,
      price: 0,
      size: {
        type: '',
        index: 0,
        max: product.size[0].max
      },
      img: {
        src: product.img[0].src,
        alt_src: product.img[0].alt,
        preview: product.img[1].src,
        alt_pre: product.img[1].alt
      },
      tax_code: product.tax_code
    },
    onSubmit(props) {
      const slug_id = props.value.name + "_type___" + props.value.size.type
      const existingItem = cart.find(
        (item) => item.id === slugify(slug_id)
      )
      if (!existingItem) {
        const quantityReal = Math.min(props.value.quantity, props.value.size.max)
        if (props.value.quantity > quantityReal) {
          console.log("You can't do that HEHENYEH---HENYEHEHE | Explain: You just accidently cheat Cart System's Quantity")
        }
        addToCart({
          id: slugify(slug_id),
          name: props.value.name,
          src: props.value.img.src,
          price: props.value.price,
          alt_src: props.value.img.alt_src,
          alt_pre: props.value.img.alt_pre,
          preview: props.value.img.preview,
          size_type: props.value.size.type,
          size_index: props.value.size.index,
          size_max: props.value.size.max,
          tax_code: props.value.tax_code,
          quantity: quantityReal
        })
      } else {
        const attempt = props.formApi.state.submissionAttempts
        switch (attempt) {
          case 1: console.log('You already added')
          break
          case 20: console.log('...')
          break
          case 50: console.log('I told you that you already add')
          break
          case 80: console.log('YOU ALREADY ADDDDDDDD')
          break
          case 200: console.log('Welp, you still clicked the form')
          break
          case 220: console.log('I tell you a serect')
          break
          case 230: console.log("There's no easter egg in my website")
          break
          case 300: console.log('What? You still click?')
          break
          case 320: console.log('Alright, look at the Login button')
          break
          case 340: console.log('Somehow, even through you logged in that you still can open Logup menu')
          break
          case 380: console.log('You can see the bug I put when I develop this website')
          break
          case 400: console.log('More than that, I still develop more easter eggs')
          break
          case 420: console.log('Bye, stranger... Here is the end')
          break
          case 1000: console.log('You have still been clicking, you are Determination')
          break
          case 1030: console.log('Uhhh, here was the end, I told you')
          break
          case 1060: {
            const rickroll = `${henry_stick_roll}; color: white; font-size: small; font-weight: bold; padding: 150px 150px; background-repeat: no-repeat; background-size: cover; background-position: center;`
            console.log('%c ㅤ', rickroll)
          }
          break
          case 1080: {
            const Ifeelstupid = `${stupid_henry}; color: white; font-size: small; font-weight: bold; text-shadow: -1px -1px 0px #493b49, 1px -1px 0px #493b49, -1px 1px 0px #493b49, 1px 1px 0px #493b49; padding: 200px 50px; background-repeat: no-repeat; background-size: cover; background-position: center;`
            console.log('%c Endd, Nothing moree, Please touch grass', Ifeelstupid)
          }
          break
          default: break
      }
      }
    }
  })

  const { cart, addToCart } = useZustandStore()
  const currency = useStoreValue(useZustandStore,
    useShallow(
      state => state.currency
    )
  )

  // price
  const { countryCode } = useCountryCodeStore()

  const selectedCountry = currencyOffScript.find(item => item.code === countryCode)
  const index = useStore(form.store, (state) => state.values.size.index)

  useEffect(() => form.setFieldValue('size.type', product.size[0].type), [])
  useEffect(() => form.setFieldValue('price', Number(base)), [index])

  const base = product.price[index].replace("$", "")

  const { data } = useQuery(
    {
      queryKey: ['curr', [countryCode, index]],
      queryFn: () => getPrice(currency, selectedCountry!.transfer, base),
      placeholderData: (old) => old,
      initialData: base,
      refetchOnWindowFocus: false
    }
  )


  return (
    <main className='w-full h-fit max-w-[1680px] mx-auto px-8'>
      <section className='w-full md:table'>
        <Image />
        <article className='md:table-cell md:w-5/8 md:float-left md:pl-10 w-full'>
          <form
            className='size-full bg-neutral-200/40 dark:bg-[#1d1d1d] select2 px-8 py-6 sm:px-12 sm:py-10 pb-20'
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <h2 className='2xl:text-[calc(0.9vmin+9px)] text-[calc(1.1vmin+11px)] text-slate-900 dark:text-[#f7feff]'>
              {product.title}
            </h2>
            <h3
              className='2xl:text-[calc(1.3vmin+13px)] text-[calc(1.6vmin+16px)] text-slate-900 dark:text-[#f7feff] tracking-tighter mt-2'>
              {formatCurrency(selectedCountry?.lang, selectedCountry?.transfer, Number(data))}
            </h3>
            <br /><br />
            <form.Field
              name="quantity"
              children={field => {
                const max = product.size[index].max
                const handleChange = (value: number) => {
                  if (isNaN(value) || value < 1) {
                    field.handleChange(1);
                  } else {
                    field.handleChange(Math.min(value, max))
                  }
                }

                return (
                  <>          
                    <label htmlFor={field.name} className='uppercase text-[calc(0.6vmin+6px)] text-slate-800 dark:text-slate-200 opacity-90'>Quantity</label>
                    <div className='relative size-fit mt-2 text-neutral-600 dark:text-neutral-400'>
                      <button onClick={() => handleChange(field.state.value - 1)} type='button' title='decrement' aria-label='decrement' className='font-medium text-lg absolute -top-0.25 px-2 -left-2 h-full cursor-pointer'>
                        -
                      </button>
                      <input
                        min={1}
                        max={10}
                        type="text"
                        maxLength={2}
                        id={field.name}
                        pattern="\d{0,2}"
                        aria-label='quantity'
                        value={field.state.value}
                        onChange={e => handleChange(parseInt(e.target.value))}
                        className='text-center no-arrows h-8 w-24 focus:outline-neutral-600/40 focus:border-neutral-600/40'
                      />
                      <button onClick={() => handleChange(field.state.value + 1)} type='button' title='increment' aria-label='increment' className='font-medium text-lg absolute -top-0.25 px-2 -right-2 h-full cursor-pointer'>
                        +
                      </button>
                    </div>
                  </>
                )
              }}
            />
            <br /><br />
            {
              product.size.length > 1 && (
                <form.Field
                  name='size'
                  children={field => {
                    return (
                      <>                      
                        <h4 className='uppercase text-[calc(0.75vmin+7.5px)] text-slate-800 dark:text-slate-200 opacity-90 mb-2'>SIZE</h4>
                        {product.size.map((size, i) => {
                          return (
                          <Fragment key={size.type}>
                            <div className='mr-2 mb-4 inline-block'>
                              <input
                                value={i}
                                type="radio"
                                name="options"
                                id={size.type}
                                tabIndex={-1}
                                className='peer sr-only'
                                disabled={!size.available}
                                onChange={(e) => {
                                  if (size.available) {
                                    field.handleChange(() => ({
                                      max: size.max,
                                      type: size.type,
                                      index: Number(e.target.value)
                                    }))
                                  }
                                }}
                                checked={field.state.value.index === i}
                              />
                              <label
                                tabIndex={0}
                                htmlFor={size.type}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && size.available) {
                                    e.preventDefault()
                                    field.handleChange({
                                      max: size.max,
                                      type: size.type,
                                      index: i
                                    })
                                  }
                                }}
                                className='block select-none whitespace-nowrap | px-4 py-2 | bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 | peer-checked:focus:outline-offset-8 peer-checked:focus:rounded-none peer-checked:bg-neutral-950 peer-checked:text-slate-200 peer-disabled:text-neutral-600/20 dark:peer-disabled:text-neutral-400/20 peer-disabled:border-neutral-600/20 peer-disabled:line-through | border-neutral-950 dark:border-neutral-600/60 active:outline-neutral-800 dark:active:outline-neutral-600/80 active:border-neutral-900 dark:active:border-neutral-800 active:rounded-none peer-disabled:active:outline-neutral-400 dark:peer-disabled:active:outline-neutral-600 peer-disabled:active:border-neutral-400 dark:peer-disabled:active:border-neutral-600 peer-disabled:active:rounded-sm | cursor-pointer border rounded'
                              >
                                  {size.type}
                              </label>
                            </div>
                          </Fragment>
                        )})}
                      </>
                    )
                  }}
                >
                </form.Field>
              )
            }
            <br /><br />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting, state.isSubmitted, state.submissionAttempts]}
              children={([canSubmit, isSubmitting, isSubmitSuccessful, submissionAttempts]) => (
                <input
                  type="submit"
                  onClick={form.handleSubmit}
                  disabled={product.type === "soldOut"}
                  value={`${!canSubmit || isSubmitting ? 'ADD TO CART...' : submissionAttempts ? `ADD TO CART (${submissionAttempts})` : product.type === "soldOut" ? 'SOLD OUT' : 'ADD TO CART'}`}
                  className={`size-full | py-4 rounded-lg | tracking-wider font-bold | cursor-pointer | use-rounded-font | active:bg-neutral-400/80 active:text-neutral-600/80 disabled:bg-neutral-400/40 disabled:text-neutral-400 disabled:active:bg-neutral-600/40 disabled:active:text-neutral-200/60 dark:disabled:text-neutral-400/80 dark:disabled:active:text-neutral-200/60 disabled:active:transition-colors disabled:active:duration-75 | ${isSubmitSuccessful ? 'bg-neutral-400/40 text-neutral-400' : 'bg-neutral-950 text-neutral-200'}`}
                />
              )}
            />
            <br /><br /><br /><br />
            <hr className='dark:border-neutral-600' />
            <Info />
            <hr className='dark:border-neutral-600' />
          </form>
          <section className='w-full mt-8 *:px-8 sm:*:px-0 sm:px-8 flex flex-col gap-6 | small:text-[0.75rem]/relaxed enough text-[0.85rem]/relaxed big:text-[0.95rem]/relaxed select'>
            <Description />
          </section>
        </article>
      </section>
      <section className='w-full select'>
        <More />
      </section>
    </main>
  )
}

function Info() {
  const data = Route.useLoaderData()
  const product = data as ItemInformation
  return (
    <>
      <div className='pt-2 | *:inline-block indent-0.75 | text-neutral-400'>
        <p className='before:content-["•"] before:pr-6'>Published: {product.day}</p>
      </div>
      <div className='pt-1 pb-2 | *:inline-block | text-neutral-400'>
        <InboxArrowDown className='mr-4' />Note: 【日本のお客様へ】ローマ字でご住所をご記入いただきますようお願い申し上げます。ご住所に日本語の文字が含まれている場合、正確な配送が難しい可能性がございますので、ご理解いただけますと幸いです。
      </div>
    </>
  )
}

function Description() {
  const data = Route.useLoaderData()
  const product = data as ItemInformation

  return (
    <>
      {product.description && <p className='text-slate-800/85 *:underline *:hover:text-blue-400 *:dark:hover:text-red-400 dark:text-white/90' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />}
      {product.NoteRed && <p className='text-red-400 dark:text-red-400/60' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.NoteRed) }} />}
      {product.sizeGuide && 
        <table className='w-auto sm:w-full lg:w-4/6'>
          <tbody className='**:border-neutral-600/40 **:dark:border-neutral-600/40 **:border select2 **:p-4 text-slate-800/85 **:dark:text-neutral-200/85'>
              <tr>
                <td></td>
                <td>Chest</td>
                <td>Sleeve</td>
                <td>Front Length</td>
                <td>Back Length</td>
              </tr>
              {product.sizeGuide.map((row, indxRow) => (
                <tr key={`row!---___${indxRow}`}>
                  <td>{row.size}</td>
                  <td>{row.chest}</td>
                  <td>{row.frontLength}</td>
                  <td>{row.size}</td>
                  <td>{row.sleeve}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {product.NoteNotRed && <p className='dark:text-white/90' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.NoteNotRed) }} />}
      {product.messageHTML && <p className='dark:text-white/90' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.messageHTML) }} />}
    </>
  )
}

function Image() {
  const dimension = useDimension()
  const options = { stiffness: 100, damping: 20, mass: 2 }
  const container = useRef<HTMLDivElement | null>(null)
  const img = useRef<Array<HTMLLIElement | null>>([])
  const [index, setIndex] = useState(0)
  const [state, setState] = useState({
    hovered: false,
    hold: false,
    distance: 0
  })

  const movement = useMotionValue("0%")
  const timeline = useMotionValue(0)

  const verySmooth = useSpring(movement, options)
  const timelineSmooth = useSpring(timeline, options)

  const data = Route.useLoaderData()
  const product = data as ItemInformation

  useEffect(() => {
    if (dimension.width < 1008) return
    if (!container.current) return

    const fix = 0
    const con = container.current
    const length = product.img.length - 1
    const { width, left } = con.getBoundingClientRect()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") {
        setState(prev => ({
          ...prev,
          hold: false
        }))
      }
    }

    const handleMouseMove = (e: PointerEvent) => {
      const val = e.clientX - left + fix
      if (state.distance > 0 && val >= -40 && val <= width && state.hold) {
        const percentage = (val / width) * 100
        movement.set(`${-percentage * length}%`)
        timeline.set(percentage)
      }
    }

    const handleMouseUp = (e: PointerEvent) => {
      setState(prev => ({
        ...prev,
        hold: false
      }))
      const val = e.clientX - left + fix
      if (state.distance > 0 && val >= -40 && val <= width) {
        const percentage = (val / width) * 100
        const snappedTotal = snap(-percentage * length, length, fix)
        movement.set(`${snappedTotal}%`)
        timeline.set(-snappedTotal / length)
      }
    }

    const handleMouseDown = (e: PointerEvent) => {
      setState(prev => ({
        ...prev,
        hold: true,
        distance: e.clientX - left + fix
      }))
    }

    window.addEventListener("pointermove", handleMouseMove)
    window.addEventListener("keydown", handleKeyDown)
    con.addEventListener("pointerdown", handleMouseDown)
    con.addEventListener("pointerup", handleMouseUp)

    return () => {
      window.removeEventListener("pointermove", handleMouseMove)
      window.removeEventListener("keydown", handleKeyDown)
      con.removeEventListener("pointerdown", handleMouseDown)
      con.removeEventListener("pointerup", handleMouseUp)
    }
  }, [state.hold, dimension.width, product.img.length])


  return (
    <aside
      ref={container}
      data-hold={state.hold}
      onMouseEnter={() =>
        setState(prev => ({
          ...prev,
          hovered: true
        }))
      }
      onMouseLeave={() => 
        setState(prev => ({
          ...prev,
          hovered: false
        }))
      }
      className='md:table-cell md:w-3/8 size-full md:float-left opacity-90 select-none xl:select-auto data-[hold=true]:select-none selection:bg-amber-400 dark:selection:bg-fuchsia-600/50 relative overflow-clip'>
      {dimension.width > 1008 && <Mouse hovered={state.hovered} timeline={timelineSmooth} />}
      <ol
        data-hold={state.hold}
        className='*:inline-block *:first:md:z-[1] *:first:lg:z-0 *:last:static *:md:absolute *:lg:static md:relative lg:static lg:whitespace-nowrap h-full bg-transparent data-[hold=true]:bg-neutral-600/40 transition-colors duration-150'
      >
        {product.img.map((a, i) => {
          const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
          const clampedIndex = clamp(index, 0, product.img.length - 1)
          const { src, alt } = a
          return (
          <motion.li
            key={`img--preview___${i}`}
            animate={{
              opacity: clampedIndex === i || dimension.width > 1008 || dimension.width <= 752 ? 1 : 0,
              scale: dimension.width > 1008 && state.hold ? 0.5 : 1
            }}
            transition={{ stiffness: 1, damping: 40, mass: 1  }}
            ref={el => { img.current[i] = el }}
            style={{
              x: dimension.width > 1008 ? verySmooth : 0,
            }}
          >
            <img
              width={2000}
              height={2000}
              className='object-cover'
              draggable={false}
              alt={alt}
              src={src}
            />
          </motion.li>
        )})}
      </ol>
      {dimension.width < 1009 && <Board num={index} set={setIndex} />}
    </aside>
  )
}

function Mouse({ hovered, timeline } : { hovered: boolean, timeline: MotionValue<number> }) {
  const options = { stiffness: 100, damping: 10, mass: 1 }
  const mouseRef = useRef<HTMLDivElement | null>(null)
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  }
  
  const smoothMouse = {
    x: useSpring(mouse.x, options),
    y: useSpring(mouse.y, options),
  }

  const { width } = useDimension()
  const timelinePercent = useTransform(timeline, value => `${value}%`)
  // const translateXPercent = useTransform(timeline, value => `${-value}%`)

  useEffect(() => {
    if (!mouseRef.current) return
    const rect = mouseRef.current.getBoundingClientRect()
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX - rect.left + rect.width / 2)
      mouse.y.set(e.clientY - rect.top + rect.height / 2)
    }

    window.addEventListener("pointermove", handleMouseMove)
    return () => window.removeEventListener("pointermove", handleMouseMove)
  }, [])

  return (
    <>
    {/* {
      width <= 752 &&
      <>
        <motion.div
          style={{
            left: timelinePercent,
            translateX: translateXPercent
          }}
          className='w-1/4 h-8 | absolute bottom-4 z-[2] | bg-neutral-200/20 border border-amber-50/40 backdrop:blur-2xl | rounded-xl block sm:hidden'
        >
          
        </motion.div>
        <div
          className='bg-slate-200/60 absolute | w-4/5 h-[1px] bottom-7.5 left-1/2 -translate-x-1/2 -translate-y-full z-[1]'
        />
      </>
    } */}
    {
      <AnimatePresence>
        {hovered ?
          <motion.div
          layout
          ref={mouseRef}
          layoutId='mouse'
          className='size-auto z-[1] fixed !translate-x-1/3 !translate-y-1/2 bg-neutral-200/20 dark:bg-neutral-800/20 border border-amber-50/40 dark:border-amber-950/40 backdrop:blur-2xl rounded-lg py-0.5 px-2 pointer-events-none hidden lg:block'
          animate={{
            opacity: 1,
            filter: `blur(0px)`
          }}
          exit={{
            opacity: 0,
            filter: `blur(4px)`
          }}
          style={{
            left: width > 1008 ? smoothMouse.x : 0,
            top: width > 1008 ? smoothMouse.y : 0,
          }}
        >
          <AnimatePresence>
            {<motion.div
              style={{
                left: timelinePercent
              }}
              className='w-[1px] h-full py-4 bg-red-400 absolute -top-0.75 left-0'
            >

            </motion.div>}
          </AnimatePresence>
          <p className='text-sm font-[Inter] tracking-tight text-white/90 dark:text-neutral-200 text-shadow-2xs text-shadow'>
            Hold to expand
          </p>
        </motion.div> :
        <motion.div
          layout
          ref={mouseRef}
          layoutId='mouse'
          className='size-4 z-[3] fixed -translate-x-full -translate-y-full bg-neutral-200/60 dark:bg-neutral-800/60 border border-amber-50/40 dark:border-amber-950/40 backdrop:blur-2xl rounded pointer-events-none hidden lg:block'
          animate={{
            opacity: 0,
            filter: `blur(4px)`
          }}
          style={{
            left: width > 1008 ? smoothMouse.x : 0,
            top: width > 1008 ? smoothMouse.y : 0,
          }}
        />
      }
      </AnimatePresence>
    }
    </>
  )
}

function Board({ num, set } : { num: number, set: React.Dispatch<React.SetStateAction<number>> }) {
  const openSpring = { type: "spring", stiffness: 1000, damping: 100, mass: 1 }
  const closeSpring = { type: "spring", stiffness: 300, damping: 36 }
  const center = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({
      hoverInside: false,
      click: false
  })
  const rotationMotionValue = useMotionValue(0)
  const rotationSpring = useSpring(rotationMotionValue, openSpring)
  const rotation = useTransform(rotationSpring, value => `${value}deg`)

  // Mouse

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const onMouseDown = (event: React.MouseEvent) => {
      const { clientX, clientY } = event
      setState(prevState => ({
        ...prevState,
        click: true
      }))
      mouse.x.set(clientX - 250 * 1/2)
      mouse.y.set(clientY - 250 * 1/2)
  }
  const onClick = () => {
      setState(prevState => ({
        ...prevState,
        click: !prevState.click
      }))
  }

  // Angle
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    if (!state.click) return
    const onMouseMove = throttle((event: MouseEvent) => {
        const target = center.current
        if (!target) return
        const fix = 125.43
        const rect = target.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const rotate = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI) + fix

        setAngle(rotate)
    }, {
      wait: 40
    })

    if (state.hoverInside) return
    window.addEventListener("pointermove", onMouseMove)
    return () => window.removeEventListener("pointermove", onMouseMove)
  }, [center, state])

  // Rotation
  const items = 6
  const prevAngle = useRef(0)
  const totalRotation = useRef(0)

  const round = (number: number, a: number) => {
    const divide = 360 / a
    return Math.round(number / divide) * divide
  }

  useEffect(() => {
    if (!state.click) return
    let delta = angle - prevAngle.current
    prevAngle.current = angle
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360

    totalRotation.current += delta
    const roundRotationInfinite = round(totalRotation.current, items)
    rotationMotionValue.set(roundRotationInfinite)

  }, [angle, rotationMotionValue, state.click])

  // State
  useEffect(() => {
    if (!state.click) return
    const a = 6
    const roundAngle = (round(angle, a))
    switch (roundAngle) {
        case 0: set(1)
        break
        case 60: set(2)
        break
        case 120: set(3)
        break
        case 180: set(4)
        break
        case 240: set(5)
        break
        case 300: set(0)
        break
        case -60: set(0)
        break
        default: break
    }
  }, [angle, setState, state.click])

  const data = Route.useLoaderData()
  const product = data as ItemInformation
  const name = ['Back','Reload','Print','Forward']
  const svg = [Back,Reload,Print,Forward,Save,Inspect]
  const length = Math.min(name.length, svg.length)

  return (
    <MotionConfig transition={state.click ? openSpring : closeSpring}>
      <div
        onClick={onClick}
        onPointerDown={onMouseDown}
        className='w-full h-80 cursor-move relative rounded bg-neutral-200/40 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-600/40 backdrop:blur-lg mt-4 hidden md:block lg:hidden'
      >
          <AnimatePresence mode="popLayout">
              {
                state.click &&
                <motion.div
                    initial= {{scale: 0.95, opacity: 0}}
                    animate= {{scale: 1, opacity: 1}}
                    exit= {{scale: 0.85, opacity: 0}}
                    className="container"
                    style={{
                      ['--a' as string]: rotation
                    }}
                >
                  <div className="detect" />
                  <div
                    className="display"
                    onPointerEnter={() => setState(prevState => ({
                        ...prevState,
                        hoverInside: true
                    }))}
                    onPointerLeave={() => setState(prevState => ({
                        ...prevState,
                        hoverInside: false
                    }))}
                  >
                    <span ref={center}>
                        {product.img.map((a, index) => {
                            if (num === index)
                            return (
                              <Fragment key={`display_${index}`}>
                                  {a.alt}
                              </Fragment>
                            )
                        })}
                    </span>
                  </div>
                  <ul className="items">
                    {Array.from({ length }).map((_, index) => {
                        const SvgIcon = svg[index]
                        return (
                          <li
                            key={`item_${index}`}
                            aria-label={name[index]}
                            data-active={num === index ? true : false}
                          >
                            <SvgIcon />
                          </li>
                        )
                    })}
                  </ul>
                </motion.div>
              }
          </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

function More() {
  const dimension = useDimension()
  const { countryCode } = useCountryCodeStore()
  const asfasfasfafsasfas = Route.useLoaderData()
  const product = asfasfasfafsasfas as ItemInformation
  const { item } = useRouteContext({
    from: '/products/$productId'
  })

  
  const container = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  const [state, setState] = useState({
    drag: false,
    preventLinkClick: false
  })
  const { currency } = useZustandStore(
    useShallow(state_1 => {
      return { currency: state_1.currency }
    })
  )

  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const data = item.data as Array<ItemInformation>
  const filter = data.filter(p => p.tag === product.tag && p.group === product.group).slice(0, 4)

  const allItems = data.flatMap(page => page)
  const selectedCountry = currencyOffScript.find(s => s.code === countryCode)

  const keyPrice = new Map()
  allItems.forEach(s => {
    const basePrice = s.price[0].replace("$", "")
    keyPrice.set(`${countryCode}-${basePrice}`, basePrice)
  })

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

  useEffect(() => {
    const con = container.current
    if (con) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setWidth(entry.contentRect.width)
        }
      })

      resizeObserver.observe(con)

      return () => {
        resizeObserver.unobserve(con)
      }
    }
  }, [])

  const handleLinkClick = (e: React.MouseEvent) => {
    if (state.preventLinkClick) {
      e.preventDefault()
    }
  }
  function onPointerMove() {
    setState(prev => ({
      ...prev,
      preventLinkClick: true
    }))
  }
  function onPointerUp( up = true ) {
    setState(prev => ({
      ...prev,
      drag: up ? false : true
    }))
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        preventLinkClick: false
      }))
    }, 0)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }

  return (
    <>
      <small className='text-slate-600/85 dark:text-slate-400/85 uppercase block text-center w-full mt-56 mb-16'>you may also like...</small>
      <article
        id="placeholderData by using Cache Data. Thank to Code Genix"
        className='w-full relative mb-24 overflow-clip sm:mt-20'
      >
        <motion.div
          drag="x"
          onPointerDown={() => onPointerUp(false)}
          onPointerMove={onPointerMove}
          onPointerUp={() => onPointerUp(true)}
          dragElastic={1}
          ref={container}
          style={{ touchAction: "none" }}
          dragConstraints={{ left: 0, right: dimension.width < 800 ? 0 : width }}
          className={`w-fit ${state.drag ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <ul className='flex flex-nowrap gap-16 h-full'>
            {
              filter.map((s, i) => {
                const basePrice = s.price[0].replace("$", "")
                const priceKey = `${countryCode}-${basePrice}`
    
                const convertedPrice = priceResultMap.get(priceKey) || basePrice

                return (
                <li key={`item-!___${i}`}>
                  <Link
                    draggable={false}
                    onClick={handleLinkClick}
                    to="/products/$productId"
                    params={{ productId: slugify(s.title) }}
                    className='mx-auto block opacity-90 dark:opacity-80'
                  >
                    <img
                      draggable={false}
                      src={s.img[0].src}
                      alt={s.img[0].alt}
                    />
                  </Link>
                  <h5 className='self-center text-center text-slate-800/80 dark:text-slate-200/80 mt-3'>{s.title}</h5>
                  <h6 className='text-center text-slate-800/80 dark:text-slate-200/80 mt-1'>{formatCurrency(selectedCountry?.lang, selectedCountry?.transfer, Number(convertedPrice))}</h6>
                </li>
              )})
            }
          </ul>
        </motion.div>
      </article>
    </>
  )
}