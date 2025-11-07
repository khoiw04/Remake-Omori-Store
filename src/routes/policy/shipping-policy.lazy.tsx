import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/policy/shipping-policy')({
  component: Refund,
})

function Refund() {
  return (
    <main className='w-full | sm:flex flex-col | items-center | bg-white dark:bg-[#121212] | px-6 pt-10 lg:px-10 lg:pt-6 pb-80 | text-slate-900 dark:text-neutral-100/90 opacity-85'>
      <aside className='w-fit | relative | border-b-slate-200 dark:border-b-neutral-800 border-b | pt-4 pb-4 sm:pt-0 sm:pb-0'>
        <h2 className='text-[calc(6px+3vmin)] font-mono font-bold sm:font-normal'>Shipping Policy</h2>
      </aside>
      <article>
        <section id='Shipping' className='pt-20 sm:pt-40'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Shipping Time</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            <b><i>1. Domestic Shipping</i></b>: 4-8 business days or faster <br />
            <b><i>2. International Shipping</i></b>: 4-15 business days <br />
            <br />
            <i>
              Note: That shipping fees for international orders are calculated based on the destination country. <br />
              All applicable customs, duties, and taxes are the responsibility of the customer and non-refundable. <br />
            </i>
          </p>
        </section>
        <section id='Processing' className='pt-20 sm:pt-40'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Order Processing (For Ship internationally)</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            <b><i>1. Order Confirmation</i></b>: Once you place an order with us,<br />
            you will receive an order confirmation email containing your order details.<br />
            <br />
            If you notice any discrepancies, please contact our customer support team immediately.<br />
            <br />
            <b><i>2. Order Processing Time</i></b>: Orders typically take 1-2 business days<br />
            To process before shipment.<br />
            <br />
            During peak seasons or sales events, processing times may be slightly longer.<br />
            <br />
            <i>
              Note: Shipping will no longer be refundable during and after the processing time. <br />
            </i>
          </p>
        </section>
        <section id='Tracking' className='pt-20 sm:pt-40'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Order Tracking (Afer ship internationally)</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            Once your order has been shipped,<br />
            you will receive <b>a shipping confirmation email</b> with a tracking number.<br />
            <br />
            You can use this tracking number to monitor the status and progress
            of your shipment through <br /> <i>our carrier's website</i>.
            <br />
          </p>
        </section>
        <section id='Delays' className='pt-20 sm:pt-40'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Shipping Delays</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            While we strive to ensure timely deliveries,<br />
            please understand that occasional shipping delays may occur due to factors beyond our control,<br />
            <i>such as weather conditions, customs processing, or carrier disruptions.</i><br />
          </p>
        </section>
        <section id='Changes' className='pt-20 sm:pt-40'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Change of Shipping Address or Product</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            <i>It is essential to double-check your information during the checkout process.</i><br />
            <br />
            Customer has 2 hours after their order to change its content by contacting <a href="mailto:customer@khoi.store" className='underline underline-offset-4 underline-'>customer@khoi.store</a><br />
            <br />
            Please review your order confirmation email to confirm the accuracy of your order.<br />
            <br />
          </p>
        </section>
        <section id='ContactInfo' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Questions /<br /> Assistance</h3>
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