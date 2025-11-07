import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useStore } from 'zustand'
import { useMutation } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from '@tanstack/react-form'
import { minLength, nonEmpty, number, object, pipe, string, values } from 'valibot'
import { supabase } from '@/supabase/supabase'
import { useAuth } from '@/utils/useAuth'
import { currencyOffScript } from '@/data/data'
import { formatCurrency, formatDate } from '@/utils/format-currency'
import { CheckBadge, Close, Exclamation, Rubbish } from '@/data/SVG'
import { slugifyRefund } from '@/utils/slug'
import { useZustandStore } from '@/zustand/main'
import useDimension from '@/utils/useDimension'

type RefundedInfo = {
  refundId: string
  refunded: boolean
  refundCurr: string
  refundDate: string
  refundAmount: number
  refundStatus: string | null
  refundMessage: string | undefined
  refundPending: | 'charge_pending' | 'insufficient_funds' | 'processing'
  refundReason: 'duplicate' | 'fraudulent' | 'requested_by_customer' | undefined
}

type ProductItem = ({
  id: string
  name: string
  images: Array<string>
  quantity: number | null
  currency: string
  created: number
  amount: number
  charge: string
  metadata: {
    type: string
  }
  shipping: {
    city: string | null
    country: string | null
    line1: string | null
    line2: string | null
    postal_code: string | null
    state: string | null | null
  }
  tracking_number: string | null | null
} | null)

type Product = Array<ProductItem>

type Orders = {
    paymentIntentId: string
    amount: number
    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded'
    date: string
    products: Product
    refunded: RefundedInfo
}

type Refund__Items = {
    total_amount: number;
    refunded_amount: number;
    information: Array<{
        id: string;
        base: number;
        amount: number;
        name: string;
        curr: string;
        quantity: number;
        max_quantity: number;
    }>;
    reason: string;
    message: string;
    paymentIntentId: string;
}

export const Route = createFileRoute('/account/')({
  component: Account,
  beforeLoad({ context }) {
    const authentication = context.authentication
    if (authentication && typeof authentication.isLogged === 'function') {
      const { isLogged } = authentication
      if (!isLogged()) throw redirect({ to: "/" })
    }
  }
})

function Account() {
  const update = useRef<HTMLAnchorElement>(null)
    const { setRefund } = useStore(useZustandStore, useShallow(
    state => ({
      setRefund: state.setRefund
    })
  ))

  useEffect(() => {
    const cancelingBoolean = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
       setRefund(-1, false, '') 
      }
    }

    window.addEventListener("keydown", cancelingBoolean)
    return () => window.removeEventListener("keydown", cancelingBoolean)
  }, [])


  return (
    <>
    <main className='w-full h-fit max-w-[1680px] relative overflow-x-clip | mx-auto pt-4 pb-8 lg:pb-8 lg:pt-2 px-8 lg:px-44 | text-slate-600 dark:text-white/80 | table'>
      <small className='text-center text-[calc(8px+0.4vmin)] | w-full | float-left | table-cell | mt-4 mb-4 | old-data:MY ACCOUNT'>MY ACCOUNT</small>
      <Article ref={update} />
      <Aside ref={update} />
    </main>
    </>
  )
}

function Aside({ ref }: { ref: React.RefObject<HTMLAnchorElement | null> }) {
  const [logout, setLogout] = useState(false)
  const navigate = useNavigate({ from: '/account' })
  const name = useStore(useZustandStore, useShallow( state => state.name ))

  const handleLogout = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    signOut.mutateAsync()
  }

  const signOut = useMutation(
    {
      mutationKey: ['signOut'],
      mutationFn: async () => {
        const { error } = await supabase.auth.signOut()
        setLogout(true)
        if (error) return null
      },
      onSuccess() {
        const authContext = useAuth()
        if (typeof authContext === 'object' && typeof authContext.signOut === 'function') {
          authContext.signOut()
          navigate({ to: '/', replace: true })
        }
      },
      onError() {
        setLogout(false)
      }
    }
  )

  return (
      <aside className='xl:max-w-128 w-1/3 h-full | mt-16 sm:mt-0 | float-left | table-cell'>
        <h4 className='text-[calc(8px+1vmin)] whitespace-nowrap leading-10 mt-2'>Account details</h4>
        {name ? (
          <h5 className='mt-4 | font-semibold'>{name}</h5>
        ) : (
          <h5 className='mt-4'>Loading...</h5>
        )}
        <p>
          <br />
          <br />
          <br />
          <br />
          <Link ref={ref} to="/account/update-information" className="inline-block outline-offset-4">Update</Link>
          <br />
          <input
            type='submit'
            value='Log out'
            onClick={(e) => handleLogout(e)}
            className={`px-5 py-1 lg:px-8.5 lg:py-2.5 mt-2 | cursor-pointer outline-offset-8 | rounded-lg | tracking-wide font-medium | hover:bg-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-900 hover:text-neutral-200 dark:hover:text-neutral-400 | transition-all ${logout ? 'bg-neutral-700 text-neutral-200' : 'bg-slate-950 dark:bg-neutral-950 text-slate-100'}`}
          />
        </p>
      </aside>
  )
}

function Article({ ref }: { ref: React.RefObject<HTMLAnchorElement | null> }) {
    const { width } = useDimension()
    const email = useStore(useZustandStore, useShallow((state) => state.email))
    const buttonPopUp = useRef(null)
    const { data: ordersList, isSuccess, mutateAsync } = useMutation<Array<Orders>>({
      mutationKey: ['ordered', email],
      mutationFn: async () => {
          const response = await fetch('https://api-billowing-wildflower-2154.fly.dev/get-information', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
          })

          const data = await response.json()
          return data.orders as Array<Orders>
      },
    gcTime: 24 * 60 * 60 * 1000 * 4
  })
  useEffect(() => {
    if (email === '' || !email) return
    (async () => {
      await mutateAsync()
    })()
  }, [email])

  const [filteredOrders, setFilteredOrders] = useState<'refunded' | 'successful' | undefined>(undefined)

  const { setRefund } = useStore(useZustandStore, useShallow(
    state => ({
      setRefund: state.setRefund
    })
  ))

  const isOrdered = ordersList && ordersList.length > 0

  return (
      <article className={`sm:w-12/20 lg:w-2/3 w-full h-fit | float-left | table-cell ${isOrdered ? 'min-h-dvh' : ''}`}>
        {isSuccess && isOrdered ?
            (
            <>
              <section>
                <h2 className='text-[calc(10px+1vmin)] leading-10'>Order history</h2>
                <h3 className='text-[calc(10px+0.4vmin)] w-fit'>
                  You have placed <button type='button' onClick={() => setFilteredOrders(undefined)} tabIndex={filteredOrders ? 0 : -1} className={filteredOrders ? 'cursor-pointer hover:opacity-40' : ''}>{ordersList.length} {ordersList.length === 1 ? 'order' : 'orders'}</button> already
                </h3>
                {
                  ordersList.filter(id => id.refunded.refunded).length >= 1 &&
                  <>
                  <button onClick={() => setFilteredOrders('refunded')} type='button' className='text-[calc(10px+0.4vmin)] w-fit cursor-pointer outline-offset-2 hover:opacity-40'>
                    {ordersList.filter(id => id.refunded.refunded).length} refunded,
                  </button>
                  <button onClick={() => setFilteredOrders('successful')} type='button' className='text-[calc(10px+0.4vmin)] w-fit cursor-pointer outline-offset-2 hover:opacity-40 ml-[0.5ch]'>
                    {ordersList.filter(id => !id.refunded.refunded).length} successful
                  </button>
                  </>
                }
                <hr className='w-19/20 h-[1px] | bg-slate-900 | mt-8' />
              </section>
              <section className='opacity-90'>
                <ul className='*:w-19/20 size-full'>
                  {
                    ordersList.filter(id => filteredOrders === 'refunded' ? id.refunded.refunded : filteredOrders === 'successful' ? !id.refunded.refunded : id ).map((item, i) => {
                      const products = item.products
                      const address = item.products[0]?.shipping
                      const refunded = item.refunded
                      const checkoutCreatedAt = new Date(item.date).getTime()
                      const now = Date.now()
                      const twoHoursInMs = 2 * 60 * 60 * 1000
                      return (
                        <li style={{ zIndex: i }} data-quantity={products.length} key={`orderedSection___!${i}`} className='first:py-0 first:pb-8 first:lg:pb-4 lg:pb-4 py-8 | first:border-t-0 border-t border-t-slate-800/80 dark:border-t-neutral-200/40'>
                            <section className='table rounded size-full md:pl-8 pt-8 pb-6 lg:mb-4'>
                              <a
                                title='Product'
                                href="https://www.omocat-shop.com/collections/all/products/spaces-in-between-distressed-sweater?variant=41556071940209"
                                className='table-cell w-full sm:w-1/5 float-left'
                              >
                                <img title='Preview' src={products[0]?.images[0]} height={200} className='mx-auto w-full' />
                              </a>
                              <ol className='table-cell float-left w-full sm:w-4/5 **:sm:ml-4 mt-8 sm:mt-0 text-center sm:text-left'>
                                <li className='text-[calc(1vmin+8px)] md:text-[calc(1vmin+4px)]'>
                                  <h4>{products[0]?.name}</h4>
                                  <h5>
                                    {
                                    refunded.refunded
                                    ?
                                    `
                                    Refunded-Total: ${formatCurrency(currencyOffScript.find(id => id.transfer === products[0]?.currency)?.lang, products[0]?.currency, Number(refunded.refundAmount))}
                                    `
                                    :
                                    `
                                    Total: ${formatCurrency(currencyOffScript.find(id => id.transfer === products[0]?.currency)?.lang, products[0]?.currency, Number(item.amount))}
                                    `
                                    }
                                  </h5>
                                </li>
                                <li className='*:text-[calc(1vmin+8px)] *:md:text-[calc(1vmin+4px)]'>
                                  <p data-refunded={refunded.refunded} className=' data-[refunded=true]:text-neutral-400/40 cursor-default select-none mt-8 text-left'>
                                    Shipping: {address?.line1}, {address?.state || address?.city}, {address?.country}, {address?.postal_code}
                                  </p>
                                  {products[0]?.tracking_number && !refunded.refunded && <p className='mt-8 text-left'>
                                    Tracking Number: {products[0]?.tracking_number}
                                  </p>}
                                  <p className='mt-8 text-left'>
                                    {refunded.refunded ?
                                      `
                                      Refunded-Created: ${formatDate(item.date)}
                                      `
                                    :
                                      `
                                      Created: ${formatDate(item.date)}
                                      `
                                    }
                                  </p>
                                  <p className='text-left capitalize'>
                                    {
                                      refunded.refunded
                                      ?
                                      `Refunded-Reason: ${refunded.refundReason}`
                                      :
                                      `Quantity: ${products[0]?.quantity}`
                                    }
                                  </p>
                                    {
                                    refunded.refunded
                                    ?
                                    <p className='text-left capitalize mt-8'>
                                      {`Refunded-Message: ${refunded.refundMessage}`}
                                    </p>
                                    :
                                    null
                                    }
                                  <br />
                                  <button
                                    ref={buttonPopUp}
                                    type="button"
                                    onClick={() => {
                                      if (!item.refunded.refunded && item.status === 'succeeded' || item.status === 'requires_capture') {
                                        setRefund(i, true, item.paymentIntentId)
                                      }
                                    }}
                                    data-success={item.refunded.refunded && refunded.refundStatus === 'succeeded'}
                                    className={`${now - checkoutCreatedAt < twoHoursInMs || refunded.refunded ? 'underline cursor-pointer outline-offset-8 text-slate-600 dark:text-neutral-200 decoration-2' : 'cursor-default decoration underline opacity-40'} data-[success=true]:cursor-default data-[success=true]:text-neutral-600/80 data-[success=true]:select-none relative`}
                                  >
                                    {
                                      refunded.refunded
                                      ?
                                      'Cancel'
                                      :
                                      now - checkoutCreatedAt < twoHoursInMs
                                      ?
                                      'Refund'
                                      :
                                      "Two more steps"
                                    }
                                  </button>
                                  {now - checkoutCreatedAt < twoHoursInMs &&                                  
                                  <DropMenu
                                    ordersList={item}
                                    button={buttonPopUp}
                                    refundedInfo={refunded}
                                  />
                                  }
                                  <p className='mt-0.25 text-right sm:text-left capitalize'>
                                    {refunded.refunded ?
                                        `Refunded-Status:
                                            ${refunded.refundStatus === 'succeeded'
                                                ? refunded.refundStatus : refunded.refundPending}`
                                                :
                                       `Status: ${item.status}`
                                    }
                                  </p>
                                  {
                                    now - checkoutCreatedAt < twoHoursInMs || !refunded.refunded &&
                                    <IntervalNode
                                      twoHoursInMs={twoHoursInMs}
                                      checkoutCreatedAt={checkoutCreatedAt}
                                      now={now}
                                    />
                                  }
                                </li>
                              </ol>
                            </section>
                            {
                              products.length > 1 && filteredOrders !== undefined || width < 1068 &&
                              <section>
                              {products.map((proSub, idxProduct) => {
                                return (
                                  <ol
                                    key={`sub_Product!--~~~~${idxProduct}`}
                                    className='w-full pt-6 mb-6 sm:pt-8 sm:mb-8 lg:pt-2 lg:mb-2 last:mb-0 border-t border-t-slate-800/20 dark:border-t-neutral-200/40'
                                    onPointerUp={(e) => {
                                      if (!(e.target instanceof HTMLInputElement)) {
                                        e.preventDefault()
                                      }
                                    }}
                                  >
                                    <li className='focus-moblie rounded block | *:lg:mt-4 *:lg:mb-2 *:lg:ml-[4%] | *:sm:mb-4 *:sm:mt-6 *:sm:ml-[9%] | *:mt-6 *:mb-6 *:ml-2'>
                                      <div className='inline-block select-none focus-mobile size-12 md:size-16 lg:size-12 overflow-clip rounded-lg sm:rounded-xl relative'>
                                        <img draggable={false} src={proSub?.images[0]} title="sub" className='object-cover bg-center' height={100} />
                                      </div>
                                      <span className='inline-block align-top -mt-2 sm:!mt-8 lg:!mt-4 *:w-fit'>
                                        <h4>{proSub?.name}</h4>
                                        <h5>
                                          {formatCurrency(currencyOffScript.find(id => id.transfer === proSub?.currency)?.lang, proSub?.currency, Number(proSub?.amount))} - Quantity: {proSub?.quantity}
                                        </h5>
                                      </span>
                                    </li>
                                  </ol>
                                )
                              })}
                              </section>
                            }
                        </li>
                      )
                    })
                  }
                </ul>
                {
                  ordersList.length > 3 &&
                  <small className="inline-block text-center w-full mt-8">
                    <button
                      type='button'
                      onClick={() => {
                        if (ref.current) {
                          ref.current.focus()
                        }
                        document.body.focus()
                        setTimeout(() => {
                          window.scrollTo({ top: 0 })
                        }, 0)
                      }}
                      className="relative cursor-pointer focus:transition-all focus:duration-75 focus:outline-offset-8 | after:content-[''] after:w-[0%] after:h-[0.25px] after:bg-black dark:after:bg-neutral-200 | after:absolute after:-bottom-1 after:right-0 | hover:after:left-0 hover:after:w-full after:transition-all after:duration-200 after:will-change-auto data-[pop=true]:after:w-full data-[pop=true]:after:left-0"
                    >
                      The End
                    </button>
                  </small>
                }
              </section>
            </>
            )
          : (
            <>
              <h2 className='text-[calc(10px+1vmin)] leading-10'>Order history</h2>
              <h3 className='text-[calc(10px+0.4vmin)]'>You haven't placed any placed orders yet</h3>
              <hr className='w-19/20 h-[1px] | bg-slate-900 | mt-8' />
            </>
            )
        }
      </article>
  )
}

function IntervalNode({ twoHoursInMs, checkoutCreatedAt, now }: { twoHoursInMs: number, checkoutCreatedAt: number, now: number }) {
  const [timeRemaining, setTimeRemaining] = useState(twoHoursInMs - (now - checkoutCreatedAt));

  useEffect(() => {
    const id = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        const newTimeRemaining = prevTimeRemaining - 1000;
        if (newTimeRemaining <= 0) {
          clearInterval(id);
          return 0;
        }
        return newTimeRemaining;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <p className='text-right sm:text-left'>
      {hours}h {minutes}m {seconds}s
    </p>
  );
}

type Drop = {
  ordersList: Orders
  button:React.RefObject<HTMLButtonElement | null>
  refundedInfo: RefundedInfo
}

function DropMenu({ button, ordersList, refundedInfo } : Drop) {
  const conatainerPopup = useRef<HTMLDivElement | null>(null)
  const { removeQuantity, setFinished, setQuantities, setQuantity, resetQuantities, quantities, refunded, reason, boolean, productId, setRefund, setReason } = useStore(useZustandStore, useShallow(
    state => ({
      index: state.index,
      reason: state.reason,
      boolean: state.boolean,
      refunded: state.refunded,
      productId: state.productId,
      quantities: state.quantities,
      setRefund: state.setRefund,
      setReason: state.setReason,
      setQuantity: state.setQuantity,
      setFinished: state.setFinished,
      setQuantities: state.setQuantities,
      resetQuantities: state.resetQuantities,
      removeQuantity: state.removeQuantity
    })
  ))
  const [inputValues, setInputValues] = useState<Array<string>>(
    ordersList.products.map(p => 
      String(p?.quantity || '')
    )
  )
  const reasons = ['Duplicate','Fraudulent','Requested by Customer']
  const RegisterSchema = object({
    reason: pipe(
      string(),
      nonEmpty('Please add reason'),
      values(['duplicate', 'fraudulent', 'requested_by_customer'], 'Invalid reason')
    ),
    total_amount: number(),
    message: pipe(
      string(),
      minLength(8, 'The message must be 8 characters long.'),
      nonEmpty('Please fill out your message')
    ),
    paymentIntentId: pipe(
      string(),
      nonEmpty("System can't find ChargeID")
    ),
  })
  const submit = useForm(
    {
      defaultValues: {
        reason: '',
        message: '',
        total_amount: 0,
        paymentIntentId: ordersList.paymentIntentId,
      },
      validators: {
        onSubmitAsync: RegisterSchema
      },
      onSubmit: (props) => {
        const prodInfomation = Array.from(quantities, ([key, value]) => ({
          id: key,
          base: value.base || 0,
          amount: value.amount || 0,
          name: value.title || '',
          curr: value.currency || '',
          quantity: value.quantity || 0,
          max_quantity: value.max || 0
        }))
        const total_amount = prodInfomation.reduce((acc, item) => acc + item.amount, 0)
        const result_refund_amount = prodInfomation.reduce((acc, item) => acc + (item.base * item.quantity), 0)

        const updateProps = {
          ...props.value,
          total_amount,
          refunded_amount: Math.round(result_refund_amount - (result_refund_amount * 0.036)),
          information: prodInfomation
        }

        create_refund.mutateAsync(updateProps)
      },
    }
  )
  const create_refund = useMutation(
    {
      mutationKey: ['create_refund'],
      mutationFn: async (data: Refund__Items) => {
        await fetch('https://api-billowing-wildflower-2154.fly.dev/refund-full-order', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      },
      onSuccess() {
        setFinished('create')
      }
    }
  )
  const cancel_refund = useMutation(
    {
      mutationKey: ['cancel_refund'],
      mutationFn: async () => {
          await fetch('https://api-billowing-wildflower-2154.fly.dev/refund-canceling', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(refundedInfo.refundId),
          })
      },
      onSuccess() {
        setFinished('cancel')
      }
    }
  )


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        !conatainerPopup.current ||
        (button.current && button.current.contains(event.target as Node)) ||
        conatainerPopup.current.contains(event.target as Node)
      ) {
        return
      }

      setRefund(-1, false, '')
      resetQuantities()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [conatainerPopup, button, setRefund, resetQuantities])
  useEffect(() => {
    if (boolean) {
      ordersList.products.filter(() => ordersList.paymentIntentId === productId).map(prd => {
        return (
          setQuantities(
            String(prd?.id),
            Number(prd?.quantity),
            Number(prd?.quantity),
            Number(prd?.amount),
            String(prd?.name),
            String(prd?.currency)
          )
        )
      })
    } else {
      setFinished(undefined)
      resetQuantities()
    }
  }, [boolean, productId])
  const handleBlur = (idxProd: number, prodID: string) => {
      const currentItem = quantities.get(prodID)
      if (!currentItem) return

      const maxQuantity = currentItem.max
      let finalValue = inputValues[idxProd]

      if (!finalValue || isNaN(Number(finalValue))) {
        finalValue = String(maxQuantity)
      } else {
        finalValue = String(Math.max(1, Math.min(Number(finalValue), maxQuantity)))
      }

      setInputValues(prev => {
        const newValues = [...prev]
        newValues[idxProd] = finalValue
        return newValues
      })

      setQuantity(prodID, Number(finalValue))
  }

  return (
    <AnimatePresence>
      {
        boolean && ordersList.paymentIntentId === productId &&
        <motion.div
          ref={conatainerPopup}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className='sm:!ml-4 sm:!mt-2 !m-0 **:!m-0 z-[1] lg:px-4 px-6 py-4 lg:py-4 origin-[40%_20%] left-1/2 -translate-x-[calc(50%+0.5rem)] sm:translate-x-0 sm:left-auto bg-white whitespace-nowrap dark:bg-[#141414] absolute rounded border border-slate-200/80 dark:border-neutral-800/80'
        >
        <AnimatePresence>
          {refunded === "create" &&
            <motion.div
                initial={{ opacity: 0, pointerEvents: 'none' }}
                animate={{ opacity: 1, pointerEvents: 'auto' }}
                exit={{ opacity: 0, pointerEvents: 'none' }}
                className=' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-[calc(0.8vmin+8px)] sm:text-[calc(0.8vmin+6px)] select2 text-center'
            >
              <CheckBadge className='mx-auto block w-full h-6' />
              <h2 className='font-semibold text-[calc(1vmin+6px)] whitespace-normal mx-auto w-full'>
                The <span>Refund</span> created successfully
              </h2>
            </motion.div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {refunded === "cancel" && refundedInfo.refunded &&
            <motion.div
                initial={{ opacity: 0, pointerEvents: 'none' }}
                animate={{ opacity: 1, pointerEvents: 'auto' }}
                exit={{ opacity: 0, pointerEvents: 'none' }}
                className=' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-[calc(0.8vmin+8px)] sm:text-[calc(0.8vmin+6px)] select2 text-center'
            >
              <CheckBadge className='mx-auto block w-full h-6' />
              <h2 className='font-semibold text-[calc(1vmin+6px)] whitespace-normal mx-auto w-full'>
                The <span>Refund</span> cancelled successfully
              </h2>
            </motion.div>
          }
        </AnimatePresence>
          <AnimatePresence>
            {
              refunded === undefined && refundedInfo.refunded &&
              <motion.form
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                initial={{ opacity: 0, pointerEvents: 'none' }}
                animate={{ opacity: 1, pointerEvents: 'auto' }}
                exit={{ opacity: 0, pointerEvents: 'none' }}
                className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-[calc(0.8vmin+8px)] sm:text-[calc(0.8vmin+6px)] select2 text-center'
              >
                <Exclamation className='mx-auto block w-full h-6' />
                <h2
                  className='font-semibold text-[calc(1vmin+6px)]'
                >
                  Are you sure to cancel the refund?
                </h2>
                {cancel_refund.isError &&
                <h3
                  className='text-red-500/85 dark:text-red-400/80 text-[calc(1vmin+6px)]'
                >
                  {cancel_refund.error.name} + {cancel_refund.error.message}
                </h3>
                }
                <div>
                  <button onClick={() => cancel_refund.mutateAsync()} type='button' className="cursor-pointer relative focus:transition-all focus:duration-75 focus:outline-offset-8 | after:content-[''] after:w-[0%] after:h-[0.25px] after:bg-black dark:after:bg-neutral-200 | after:absolute after:-bottom-0.25 after:right-0 | hover:after:left-0 hover:after:w-full after:transition-all after:duration-200 after:will-change-auto data-[pop=true]:after:w-full data-[pop=true]:after:left-0 -translate-x-full">Yes</button>
                  <button onClick={() => setRefund(-1, false, '')} type='button' className="cursor-pointer relative focus:transition-all focus:duration-75 focus:outline-offset-8 | after:content-[''] after:w-[0%] after:h-[0.25px] after:bg-black dark:after:bg-neutral-200 | after:absolute after:-bottom-0.25 after:right-0 | hover:after:left-0 hover:after:w-full after:transition-all after:duration-200 after:will-change-auto data-[pop=true]:after:w-full data-[pop=true]:after:left-0 translate-x-full">No</button>
                </div>
              </motion.form>
            }
          </AnimatePresence>
          <motion.form
            method='POST'
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            animate={{ opacity: refunded && refundedInfo.refunded || refunded ? 0 : 1 }}
            style={{ pointerEvents: refunded && refundedInfo.refunded || refunded ? "none" : "auto" }}
            className='text-[calc(0.8vmin+8px)] md:text-[calc(0.8vmin+6px)] select2'
          >
            <header>
              <h2 className='text-left'>
                The reason you do it:
              </h2>
              <section className='*:pl-2 *:first:pl-0 pt-2'>
                <submit.Field
                  name="reason"
                  children={(field) => (
                    <>
                    {reasons.map((j, idxReason) => {
                      return (
                        <div key={`ReasonFunding++_${idxReason}`} className='inline-block'>
                          <input
                            id={j}
                            value={j}
                            type="radio"
                            name="options"
                            checked={j === reason}
                            className='peer sr-only'
                            tabIndex={-1}
                            onChange={(e) => {
                              const target = slugifyRefund(e.target.value)
                              setReason(target)
                              field.handleChange(target)
                            }}
                          />
                          <label
                            htmlFor={j}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const target = slugifyRefund(j)
                                e.preventDefault()
                                setReason(target)
                                field.handleChange(target)
                              }
                            }}
                            tabIndex={0}
                            data-checked={slugifyRefund(j) === reason}
                            className='inline-block peer select-none whitespace-nowrap sm:py-0.5 sm:px-1 py-1 px-2 | bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 | data-[checked=true]:bg-neutral-600/80 data-[checked=true]:text-slate-200 peer-disabled:text-neutral-600/20 dark:peer-disabled:text-neutral-400/20 peer-disabled:border-neutral-600/20 peer-disabled:line-through | border-neutral-400 dark:border-neutral-800/60 active:outline-neutral-400 dark:active:outline-neutral-600/80 active:border-neutral-400/40 dark:active:border-neutral-800 active:rounded-none peer-disabled:active:outline-neutral-400 dark:peer-disabled:active:outline-neutral-600 peer-disabled:active:border-neutral-400 dark:peer-disabled:active:border-neutral-600 peer-disabled:active:rounded-sm | cursor-pointer border rounded'
                          >
                            {j}
                          </label>
                        </div>
                      )
                    })}
                    <p className='text-red-500 dark:text-red-400/80 text-sm'>
                      {field.state.meta.errors.length > 0 && 
                        (typeof field.state.meta.errors[0] === 'string' 
                          ? field.state.meta.errors[0] 
                          : field.state.meta.errors[0]?.message || 'An error occurred')
                      }
                    </p>
                    </>
                  )}
                />
              </section>
              <submit.Field
                name="message"
                children={(field) => (
                  <>                
                    <section className='*:pt-4 *:focus:pt-4 rounded *:focus:outline-offset-4 *:focus:outline-0 *:transition-all'>
                      <input
                        type="text"
                        className='w-full'
                        placeholder='Message...'
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </section>
                    <p className='text-red-500 dark:text-red-400/80 text-sm'>
                      {field.state.meta.errors.length > 0 && 
                        (typeof field.state.meta.errors[0] === 'string' 
                          ? field.state.meta.errors[0] 
                          : field.state.meta.errors[0]?.message || 'An error occurred')
                      }
                    </p>
                  </>
                )}
              />
            <footer className='w-full pt-4 inline-flex items-center justify-between'>
              <submit.Subscribe
                selector={(state) => [state.canSubmit, state.isValidating]}
                children={([canSubmit, isValidating]) => (
                  <button
                    type='submit'
                    onClick={submit.handleSubmit}
                    disabled={!canSubmit || isValidating}
                    className='cursor-pointer outline-offset-4 disabled:text-slate-400/40 transition-colors duration-75'
                  >
                    Submit
                  </button>
                )}
              />
              <button type='button' onClick={() => setRefund(-1, false, '')} className='cursor-pointer'>
                <Close className='scale-75' />
              </button>
            </footer>
            {create_refund.isError &&
            <h3
              className='text-red-500/85 dark:text-red-400/80 text-[calc(1vmin+6px)]'
            >
              {create_refund.error.name} + {create_refund.error.message}
            </h3>
            }
            </header>
          {ordersList.products.length > 0 &&          
          <table className='size-full text-left'>
            <tbody>
              {ordersList.products.map((prod, idxProd) => {
                return (
                  <motion.tr
                    key={`${prod?.name}__!${prod?.id}`}
                    className='*:py-2 transition-opacity size-fit relative border-t-neutral-400/40 border-b-neutral-400/40 dark:border-t-neutral-600/40 dark:border-b-neutral-600/40 border-t last:border-b'
                    animate={{ opacity: quantities.has(String(prod?.id)) ? 1 : 0.2 }}
                  >
                    <td className='max-w-60 w-20'>
                      <div className='size-6 inline-block overflow-clip relative rounded'>
                        <img draggable={false} src={prod?.images[0]} height={100} className='absolute object-center' />
                      </div>
                      <h2 className='whitespace-pre-line overflow-hidden text-ellipsis'>{prod?.name}</h2>
                    </td>
                    <td className='text-right'>
                    <input
                      min={1}
                      type="text"
                      pattern="\d{0,2}"
                      aria-label='quantity'
                      value={inputValues[idxProd]}
                      max={Number(prod?.quantity)}
                      disabled={prod?.quantity === 1 || !quantities.has(String(prod?.id))}
                      placeholder={String(prod?.quantity)}
                      maxLength={String(prod?.quantity).length}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, '')
                        const numericValue = rawValue.replace(/[^0-9]/g, '')

                        setInputValues(prev => {
                          const newValues = [...prev]
                          newValues[idxProd] = numericValue
                          return newValues
                        })
                      }}
                      onBlur={() => handleBlur(idxProd, String(prod?.id))}
                      className="!ml-[0.5ch] underline decoration-dotted rounded leading-0 peer disabled:cursor-text text-amber-800/80 dark:text-fuchsia-400/80 dark:placeholder:text-fuchsia-400/40 placeholder:decoration-dashed placeholder:underline w-6 text-center"
                    />
                    </td>
                    <td className='text-right'>
                      <div className='inline-block pt-[0.345rem]'>
                        <button
                          type='button'
                          title='remove'
                          onClick={() =>
                            {
                              if (quantities.has(String(prod?.id))) {
                                removeQuantity(String(prod?.id))
                              } else {
                                setQuantities(
                                  String(prod?.id),
                                  Number(prod?.quantity),
                                  Number(prod?.quantity),
                                  Number(prod?.amount),
                                  String(prod?.name),
                                  String(prod?.currency)
                                )
                              }
                            }
                          }
                          className='text-amber-800/80 dark:text-fuchsia-400/80 cursor-pointer outline-offset-2'
                        >
                          <Rubbish className='size-4' />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
          }
          <footer className='w-full text-red-500/80 dark:text-red-400/80 pt-4 *:block relative'>
            <p>Note: Please check information correctly.</p>
            <div>You only have
              <button type='button' className='px-[0.5ch] group focus:outline focus-visible:outline-red-500/80 dark:focus-visible:outline-red-400/80 active:outline rounded active:transition-all text-left underline decoration-slice cursor-pointer decoration-dashed relative'>
                one choice
                <div className="*:cursor-text select-text group-active:opacity-100 group-active:translate-y-0 group-active:pointer-events-auto group-focus:opacity-100 group-focus:translate-y-0 group-focus:pointer-events-auto focus-within:opacity-100 focus-within:translate-y-0 focus-within:pointer-events-auto pointer-events-none transition-all translate-y-1/12 delay-200 opacity-0 left-0 text-neutral-400 bg-white cursor-auto dark:bg-[#141414] whitespace-break-spaces w-96 absolute rounded border border-slate-200/80 dark:border-neutral-800/80 lg:px-4 px-6 py-4 lg:py-4">
                  <p>You have one choice to refund in two situation:</p>
                  <p>Before shipping...: <b className='cursor-pointer' tabIndex={0}>Two hours</b> before finishing checkout</p>
                  <p>After you get orders: <b className='cursor-pointer' tabIndex={0}>14 days</b> during you get the orders</p>
                  <br />
                  <p>Totally: You have two choices but use carefully</p>
                  <p>When the refund does successfully, you can't do refund one more or cancel it</p>
                </div>
              </button>
            to refund!</div>
            <br />
            <p className='text-red-500/60 dark:text-red-400/80'>Status: Before Shipping...</p>
            {create_refund.isError &&
            <h3
              className='text-red-500/85 dark:text-red-400/80 text-[calc(1vmin+6px)] mt-6'
            >
              {create_refund.error.name} + {create_refund.error.message}
            </h3>
            }
          </footer>
          </motion.form>
        </motion.div>
      }
    </AnimatePresence>
  )
}