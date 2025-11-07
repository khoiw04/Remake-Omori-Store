import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/policy/refund-policy')({
  component: Ship,
})

function Ship() {
  const smoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const targetId = event.currentTarget.getAttribute("href")
    
    if (targetId) {
        const targetElement = document.querySelector(targetId) as HTMLHeadingElement
        targetElement.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
          targetElement.focus();
        }, 0)
    }
  }
  return (
    <main className='w-full | sm:flex flex-col | items-center | bg-white dark:bg-[#121212] | px-6 pt-10 lg:px-10 lg:pt-6 pb-80 | text-slate-900 dark:text-neutral-100/90 opacity-85'>
      <aside className='w-fit | relative | border-b-slate-200 dark:border-b-neutral-800 border-b | pt-4 pb-4 sm:pt-0 sm:pb-0'>
        <h2 className='text-[calc(6px+3vmin)] font-mono font-bold sm:font-normal'>Refund Policy</h2>
      </aside>
      <article>
        <section id='ReturnPeriod' className='pt-20 sm:pt-40'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>14-Day Return Period</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            You have 14 calendar days from the date<br />
            you received your order to <b><i>return eligible items</i></b><br />
            To be eligible for a return, <br />
            Your item must be unused, in the same condition that you received it <br />
            And in its original packaging.  Please keep the receipt or proof of purchase.<br />
            <br />
            <br />
            To initiate a return, please follow these steps:<br />
            <br />
            1. Contact our customer support team at support@khoi.strore<br />
            to request a <i><b>Return Authorization (RA) number</b></i>.<br />
            Please provide your order number and a detailed explanation of the reason for the return.<br />
            <br />
            2. Once you receive your RA number,<br />
            securely <b><i>package</i></b> your item(s) in their original packaging<br />
            including all accessories,<br />
            and include a copy of the RA email<br />
            with the RA number clearly marked.<br />
            <br />
            3. <b><i>Send the package</i></b> to the address provided by our customer support team.<br />
            Please use a trackable shipping method for your protection.<br />
            <br />
            4. Upon receiving your returned item(s) and inspecting them.<br />
            Please allow up to 5 business days for your refund to appear in your account.<br />
            <b><i>Refunds will be issued</i></b> to the original payment method used for the purchase.<br />
            <br />
            <br />
            <i>Note: Please note that you will be responsible for <b>the shipping cost</b> of returning the item(s).</i>
          </p>
        </section>
        <section id='Damaged' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>My item arrived damaged / <br /> This isn't what I ordered</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            Please <b><i>send an e-mail</i></b> to support@khoi.store within <a href="#ReturnPeriod" className='underline underline-offset-4' onClick={smoothScroll}>14 days of delivery</a> <br />
            and we will take care of it at <b><i>no cost to you</i></b>.<br />
            <br />
          </p>
        </section>
        <section id='Refund' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Refund Amount</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            <i>Note: <br />
            Once an order has been shipped and delivered <br />
            to the designated parcel location or front door, <br />
            it is the customer's responsibility to retrieve it promptly <br /> We regret to inform that we do not offer refunds for lost or stolen items.
            </i><br />
            <br />
            Refunds for eligible returns <b><i>will include the cost of the item(s)</i></b><br />
            plus any applicable sales tax.<br />
            Shipping fees are <i>non-refundable</i> unless<br />
            the return is due to a mistake on our part.<br />
          </p>
        </section>
        <section id='ChangeProduct' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Change of Product</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            <i>It is essential to double-check your product during the checkout process.</i><br />
            <br />
            Customer <b><i>has 2 hours</i></b> after their order to change its content by contacting customer service<br />
            at customer@khoi.store.<br />
            <br />
            Please review your order confirmation email to confirm the accuracy of your order.
          </p>
        </section>
        <section id='ContactInfo' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit`}>Questions /<br /> Assistance</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
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
