import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckBadge } from '@/data/SVG'
import { useZustandStore } from '@/zustand/main'

export const Route = createFileRoute('/payment/successful')({
  component: PaymentSuccessful,
})

function PaymentSuccessful() {
  const { resetCart } = useZustandStore()
  useEffect(() => resetCart() ,[])
  useEffect(() => {
    (async () => {
      await fetch('/capture-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': import.meta.env.STRIPE_SIGNING_KEY as string
        },
      })
    })()
  }, [])

  return (
    <main className="w-full min-h-[65dvh] px-[4dvh] pb-[4dvh] | flex flex-col justify-center items-center text-center | bg-white dark:bg-[#121212] | text-slate-900 dark:text-neutral-100/90 opacity-85">
        <CheckBadge className='size-12' />
        <motion.h2
          className='mt-2 text-[calc(1vmin+20px)] font-medium'
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.04,
              },
            },
          }}
        >
          {[...`Your checkout is successful`].map((char, index) => (
            <motion.span
              key={`Thankyou__!${index}`}
              variants={{
                hidden: { clipPath: "inset(0% 78% 78% -4%)" },
                visible: { clipPath: "inset(0% -4% -4% -4.4%)" },
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>
        <motion.h3
            aria-label='Thank you for your suporting!'
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.04,
                  delay: 1.5
                },
              },
            }}
          className='mt-2 whitespace-nowrap block overflow-clip relative text-[calc(0.8vmin+10px)]'
        >
            {[...`Thank you for your supporting!`].map((char, index) => (
            <motion.span
              key={`Thankyou__!${index}`}
              variants={{
                hidden: { translateY: '100%' },
                visible: { translateY: '0%' },
              }}
              transition={{
                duration: 1,
                ease: [0.25, 1, 0.5, 1]
              }}
              className='inline-block'
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
            ))}
        </motion.h3>
    </main>
  )
}