import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Arrow } from '../../data/SVG'
import useDimension from '@/utils/useDimension'

export const Route = createLazyFileRoute('/info/FAQ')({
  component: FAQ,
})

function FAQ() {
  const [expended, setExpandedIndex] = useState(false)
  const [expended2, setExpandedIndex2] = useState(false)
  const [expended3, setExpandedIndex3] = useState(false)
  const [expended4, setExpandedIndex4] = useState(false)
  const [expended5, setExpandedIndex5] = useState(false)
  const [expended6, setExpandedIndex6] = useState(false)
  const [expended7, setExpandedIndex7] = useState(false)
  const [expended8, setExpandedIndex8] = useState(false)
  const [expended9, setExpandedIndex9] = useState(false)
  const [expended10, setExpandedIndex10] = useState(false)
  const [expended11, setExpandedIndex11] = useState(false)
  const [expended12, setExpandedIndex12] = useState(false)
  const { width } = useDimension()

  return (
    <main className='w-full | sm:flex flex-col | items-center | bg-white dark:bg-[#121212] | px-6 pt-10 lg:px-10 lg:pt-20 pb-80 | text-slate-900 dark:text-neutral-100/90 opacity-85'>
      <aside className='w-fit | relative | border-b-slate-200 dark:border-b-neutral-800 border-b | pt-4 pb-4 sm:pt-0 sm:pb-0'>
        <h2 className='text-[calc(6px+3vmin)] font-mono font-bold sm:font-normal'>FAQ</h2>
      </aside>
      <article>
        <section id='Tracking' className='pt-20 sm:pt-40'>
          <h3 className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Tracking</h3>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended ? width < 665 ? 220 : 130  : 40
            }}
            className='w-full | mt-8 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button type='button' title='Tracking Not Updating' onClick={() => setExpandedIndex(!expended)} className='w-full | flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Tracking Not Updating</h4>
              <Arrow className={`scale-75 ${expended ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              For orders outside the USA, tracking may take up to <i>7 business days</i> to update. <br />
              For USA orders, it typically updates <i>within 2-4 days</i>.
            </p>
          </motion.div>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended2 ? width < 665 ? 380 : 220 : 40
            }}
            className='w-full | mt-2 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button type='button' title='My Order Is Late' onClick={() => setExpandedIndex2(!expended2)} className='w-full | flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>My Order Is Late</h4>
              <Arrow className={`scale-75 ${expended2 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              <i>Shipping companies may sometimes experience delays</i>.<br />
              Please allow an extra 2-4 business days for delivery.<br />
              If you haven’t received your order within 45 days, contact us,<br />
              and we’ll issue a full refund while handling the matter with the shipping company.<br />
              If your order eventually arrives, feel free to keep it!.
            </p>
          </motion.div>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended3 ? width < 665 ? 268 : 150 : 40
            }}
            className='w-full | mt-2 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button type='button' title='Order Missing/Stolen' onClick={() => setExpandedIndex3(!expended3)} className='w-full | flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Order Missing/Stolen</h4>
              <Arrow className={`scale-75 ${expended3 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              <i>We understand how frustrating this situation can be!</i>.<br />
              We recommend filing a missing/stolen package report.<br />
              Keep us updated on their response, and we’ll do our best to assist you!<br />
            </p>
          </motion.div>
        </section>
        <section id='Returns' className='pt-20 sm:pt-40'>
          <h3 className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Returns</h3>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended4 ? width < 665 ? 270 : 157 : 40
            }}
            className='w-full | mt-8 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button type='button' title='Order Missing/Stolen' onClick={() => setExpandedIndex4(!expended4)} className='w-full | flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Exchange Size</h4>
              <Arrow className={`scale-75 ${expended4 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              Ordered the wrong size? No worries!<br />
              Contact us <b><i>within two weeks</i></b> to learn how to exchange it for another size <br />
              <i>Note: that return shipping is the customer’s responsibility.</i><br />
            </p>
          </motion.div>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended5 ? width < 665 ? 240 : 124 : width < 363 ? 64 : 40
            }}
            className='w-full | mt-2 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button type='button' title='Order Missing/Stolen' onClick={() => setExpandedIndex5(!expended5)} className='w-full | flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Damaged Items / Wrong Orders</h4>
              <Arrow className={`scale-75 ${expended5 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              <i>The items arrived damaged? / "This's what I ordered"? No worries!</i>.<br />
              Contact us <b><i>within two weeks</i></b> to learn how to get a replacement.<br />
            </p>
          </motion.div>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended6 ? width < 710 ? width > 371 ? 220 : 325 : 157 : width < 332 ? 69 : 40
            }}
            className='w-full | mt-2 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button type='button' title='Order Missing/Stolen' onClick={() => setExpandedIndex6(!expended6)} className='w-full | flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Unsatisfied With Your Order</h4>
              <Arrow className={`scale-75 ${expended6 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              <i>Not satisfied with your products?</i>.<br />
              Contact us <b><i>within two weeks</i></b> to learn how to return your products and get a refund.<br />
              <i>Note: that return shipping is the customer’s responsibility.</i><br />
            </p>
          </motion.div>
        </section>
        <section id='Products' className='pt-20 sm:pt-40'>
          <h3 className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Products</h3>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended7 ? width < 622 ? 148 : 95 : 40
            }}
            className='w-full | mt-8 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button onClick={() => setExpandedIndex7(!expended7)} className='flex w-full | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Products Sold Out</h4>
              <Arrow className={`scale-75 ${expended7 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              We usually include an estimated restock date in the product description.
            </p>
          </motion.div>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended8 ? width < 595 ? 220 : 124 : width < 322 ? 65 : 40
            }}
            className='w-full | mt-2 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button onClick={() => setExpandedIndex8(!expended8)} className='flex w-full | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>"Limited Edition" Products</h4>
              <Arrow className={`scale-75 ${expended8 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              <i>When a product is labeled 'Limited Edition,'</i>.<br />
              It means we sell it only once and will not restock it once it’s sold out.<br />
            </p>
          </motion.div>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended9 ? width < 334 ? 400 : width < 411 ? 400 : 209 : width < 334 ? 65 : 40
            }}
            className='w-full | mt-2 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button onClick={() => setExpandedIndex9(!expended9)} className='w-full flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Unsatisfied With Your Order</h4>
              <Arrow className={`scale-75 ${expended9 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              Our <i>sweaters and hoodies</i> are made from<br />
              <i><b>a 50% cotton, 50% velvet blend,</b></i> creating a soft, lightweight,<br />
              and comfortable feel that's perfect for year-round wear!<br />
              Our <i>t-shirts</i> are made from <i><b>100% heavyweight cotton</b></i>,<br />
              ensuring minimal shrinkage and lasting durability.<br />
            </p>
          </motion.div>
        </section>
        <section id='Shipping' className='pt-20 sm:pt-40'>
          <h3 className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Shipping</h3>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended10 ? width < 375 ? 240 : width < 462 ? 209 : width < 517 ? 180 : 158 : 40
            }}
            className='w-full | mt-8 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button onClick={() => setExpandedIndex10(!expended10)} className='w-full flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Countries We Ship To</h4>
              <Arrow className={`scale-75 ${expended10 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              We ship almost anywhere worldwide! <br />
              <i><b>If shipping isn’t available</b>, feel free to contact us,<br />
              we’ll do our best to work with our carrier to find a solution.</i>
            </p>
          </motion.div>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended11 ? width < 397 ? 180 : width < 450 ? 150 : 124 : 40
            }}
            className='w-full | mt-2 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button onClick={() => setExpandedIndex11(!expended11)} className='w-full flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Shipping To Russia</h4>
              <Arrow className={`scale-75 ${expended11 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              <i>We are currently <b>unable</b> to ship orders to Russia</i>.<br />
              due to our shipping carrier's restrictions.<br />
            </p>
          </motion.div>
          <motion.div
            initial={{ maxHeight: 40 }}
            animate={{
              maxHeight: expended12 ? width < 345 ? 440 : width < 369 ? 380 : width < 405 ? 360 : width < 455 ? 340 : width < 551 ? 300 : 234 : 40
            }}
            className='w-full | mt-2 | rounded-md | box-shadow-inner-tailwind | overflow-hidden | relative'
          >
            <button onClick={() => setExpandedIndex12(!expended12)} className='w-full flex | justify-between items-center | focus-moblie | px-8 py-2 | cursor-pointer'>
              <h4 className='select-none'>Dutie And Taxes</h4>
              <Arrow className={`scale-75 ${expended12 ? 'rotate-0' : 'rotate-90'} transition-transform duration-300`} />
            </button>
            <p className='p-4 pl-12 leading-7'>
              Duties and taxes vary by country, and we have no control over<br />
              the amounts set by local authorities.<br />
              <br />
              <i>Customers are responsible for covering these fees.</i>
              <br />
              <i>Failure to do so may result in the package being returned to us<br />
              <b>in which case we cannot offer a refund.</b></i><br />
            </p>
          </motion.div>
        </section>
        <section id='ContactInfo' className='pt-20 sm:pt-100'>
          <h3 className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Questions /<br /> Assistance</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            Note:<br />
            <br />
            <i>It is essential to provide accurate and complete shipping information during the checkout process.<br />
            We are not responsible for orders with incorrect shipping addresses,<br />
            and additional charges may apply for address corrections.<br />
            <br />
            Please review your order confirmation email<br />
            to confirm the accuracy of your shipping details.</i><br />
            <br />
            If you have any questions or concerns with your return,<br />
            please contact us at:
            <br />
            <br />
            Email: support@khoi.store
          </p>
        </section>
      </article>
    </main>
  )
}