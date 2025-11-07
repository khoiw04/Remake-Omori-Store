import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/policy/terms-conditions')({
  component: Terms,
})

function Terms() {
  const [activeSection, setActiveSection] = useState('')

  const smoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, section: string) => {
      event.preventDefault()
      const targetId = event.currentTarget.getAttribute("href")
      
      if (targetId) {
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' })
              setActiveSection(section)
          }
      }
  }

  return (
    <main className='w-full | sm:flex flex-col | items-center | bg-white | px-6 pt-10 lg:px-10 lg:pt-6 pb-80 | text-slate-900 opacity-85'>
      <aside className='w-fit | relative | border-b-slate-200 border-b | pt-4 pb-4 sm:pt-0 sm:pb-0'>
        <h2 className='text-[calc(6px+3vmin)] font-mono font-bold sm:font-normal'>Terms & Conditions</h2>
      </aside>
      <aside className='w-fit | py-10 sm:py-20 | uppercase text-center border-b | hidden sm:block'>
        <ul className='text-left list-decimal'>
          <li>
            <a href="#OVERVIEW" onClick={(e) => smoothScroll(e, 'OVERVIEW')}>OVERVIEW</a>
          </li>
          <li>
            <a href="#Target" onClick={(e) => smoothScroll(e, 'Target')}>Target Audience</a>
          </li>
          <li>
            <a href="#Services" onClick={(e) => smoothScroll(e, 'Services')}>Services and Payment</a>
          </li>
          <li>
            <a href="#DataCollection" onClick={(e) => smoothScroll(e, 'DataCollection')}>Data Collection and Privacy</a>
          </li>
          <li>
            <a href="#ChangesTerms" onClick={(e) => smoothScroll(e, 'ChangesTerms')}>Changes to the Terms</a>
          </li>
          <li>
            <a href="#ContactInfo" onClick={(e) => smoothScroll(e, 'ContactInfo')}>Contact Information</a>
          </li>
        </ul>
      </aside>
      <article>
        <section id='OVERVIEW' className='pt-20 sm:pt-40'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'OVERVIEW' ? 'border-b-2 border-yellow-500' : ''}`}>Overview</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            khoi.store,
            is a shopping website owned by khoiw04.<br />
            All information provided on the website is for shopping purposes only.<br />
            You can submit a contact form through on our Social Media / Email,<br />
            but no services or products are offered or sold directly through the site.
          </p>
        </section>
        <section id='Target' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'Target' ? 'border-b-2 border-yellow-500' : ''}`}>Target Audience</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            khoi.store primarily <i>provides services</i> <br /> to any <b>individual or organization.</b><br />
            with no strict differentiation<br /> between business clients and private individuals.
          </p>
        </section>
        <section id='Services' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'Services' ? 'border-b-2 border-yellow-500' : ''}`}>Services and Payment</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            Our services are typically provided before payment,<br />
            and all payments are made after the services have been completed.<br />
            and every payment are only accepted through <b><i>Stripe gateways</i></b>.<br />
          </p>
        </section>
        <section id='DataCollection' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'DataCollection' ? 'border-b-2 border-yellow-500' : ''}`}>Data Collection and Privacy</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            We collect the following information when you fill out the <i>log up</i> form:<br />
            1. The name <br />
            2. Email <br />

            The collected data is used solely for <b>service provision</b> and shared<br />
            with third parties only in the interest of the user and the company they represent.<br />
            We are committed to <i>protecting the data</i> in accordance with applicable laws.<br />
          </p>
        </section>
        <section id='ChangesTerms' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'ChangesTerms' ? 'border-b-2 border-yellow-500' : ''}`}>Changes to the Terms</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            khoi.strore <b><i>reserves</i></b> the right to modify <br/>
            these Terms & Conditions at any time.<br />
            {/* We will notify users before you login or complete the checkout */}
            Continued use of the site after changes implies<br />
            acceptance of the new terms.
          </p>
        </section>
        <section id='ContactInfo' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'ContactInfo' ? 'border-b-2 border-yellow-500' : ''}`}>Contact Information</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            If you have any questions or concerns regarding these Terms & Conditions,<br />
            please contact us at:
            <br />
            <br />
            Email: business@khoi.store
          </p>
        </section>
      </article>
    </main>
  )
}
