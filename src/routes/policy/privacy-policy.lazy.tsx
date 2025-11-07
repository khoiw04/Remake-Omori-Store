import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/policy/privacy-policy')({
  component: Privacy,
})

function Privacy() {
  const [activeSection, setActiveSection] = useState('')

  const smoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    
    if (targetId) {
        const targetElement = document.querySelector(targetId) as HTMLHeadingElement
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          targetElement.focus();
        }, 0)
        setActiveSection(section);
    }
}

  return (
    <main className='w-full | sm:flex flex-col | items-center | bg-white dark:bg-[#121212] | px-6 pt-10 lg:px-10 lg:pt-6 pb-80 | text-slate-900 dark:text-neutral-100/90 opacity-85'>
      <aside className='w-fit | relative | border-b-slate-200 dark:border-b-neutral-800 border-b | pt-4 pb-4 sm:pt-0 sm:pb-0'>
        <h2 className='text-[calc(6px+3vmin)] font-mono font-bold sm:font-normal'>Privacy Policy</h2>
      </aside>
      <aside className='w-fit | py-10 sm:py-20 | uppercase text-center border-b border-b-slate-200 | hidden sm:block'>
        <ul className='text-left list-decimal'>
          <li>
            <a href="#Information" onClick={(e) => smoothScroll(e, 'Information')}>Information</a>
          </li>
          <li>
            <a href="#LogData" onClick={(e) => smoothScroll(e, 'LogData')}>Log data</a>
          </li>
          <li>
            <a href="#PersonalInfo" onClick={(e) => smoothScroll(e, 'PersonalInfo')}>Personal information</a>
          </li>
          <li>
            <a href="#UseCokkies" onClick={(e) => smoothScroll(e, 'UseCokkies')}>Use of cookies</a>
          </li>
          <li>
            <a href="#DataUse" onClick={(e) => smoothScroll(e, 'DataUse')}>Use of information</a>
          </li>
          <li>
            <a href="#SecurityInfo" onClick={(e) => smoothScroll(e, 'SecurityInfo')}>Security of your personal information</a>
          </li>
          <li>
            <a href="#HowLongWeKeep" onClick={(e) => smoothScroll(e, 'HowLongWeKeep')}>How long we keep your personal information</a>
          </li>
          <li>
            <a href="#TransferInformation" onClick={(e) => smoothScroll(e, 'TransferInformation')}>International transfers of personal information
            </a>
          </li>
          <li>
            <a href="#YourRights" onClick={(e) => smoothScroll(e, 'YourRights')}>Your rights and controlling your personal information</a>
          </li>
          <li>
            <a href="#LimitPolicy" onClick={(e) => smoothScroll(e, 'LimitPolicy')}>Limits of our policy</a>
          </li>
          <li>
            <a href="#ChangePolicy" onClick={(e) => smoothScroll(e, 'ChangePolicy')}>Changes to this policy</a>
          </li>
          <li>
            <a href="#ContactInfo" onClick={(e) => smoothScroll(e, 'ContactInfo')}>Contact Information</a>
          </li>
        </ul>
      </aside>
      <article>
        <section id='Information' className='pt-20 sm:pt-40'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'Information' ? 'border-b-2 border-yellow-500' : ''}`}>Information we collect</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            Information we collect includes  <br />
            both information you knowingly and actively <br />
            provide us <i>when using</i> or participating in  <br />
            <b>any of our services and promotions</b>, <br />
            and any information automatically sent by <br />
            your devices in the course of accessing <br />
            our products and services.
          </p>
        </section>
        <section id='LogData' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'LogData' ? 'border-b-2 border-yellow-500' : ''}`}>Log data</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            When you visit our website, <br />
            our servers may automatically log the standard data  <br /> provided by your web browser. <br />
            <b>It may include:</b><br />
            1. Your device’s Internet Protocol (IP) address <br />
            2. Your browser type and version <br />
            3. The pages you visit <br />
            4. The time and date of your visit <br />
            5. The time spent on each page <br />
            6. Other details about your visit, and technical details that <br />
            occur in conjunction with any errors you may encounter. <br />
            <br />
            Please be aware that while this information <br />
            may not be personally identifying by itself,<br />
            it may be possible to combine it with other data <br />
            to personally identify individual persons.
          </p>
        </section>
        <section id='PersonalInfo' className='pt-20 sm:pt-30'>
          <h3 className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'PersonalInfo' ? 'border-b-2 border-yellow-500' : ''}`}>Personal information</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            We collect the following information when you fill out the <Link to="/account/register"><i><u>log up</u></i></Link> form:<br />
            <br />
            1. Name <br />
            2. Email <br />
            <br />
            <br />
            We collect the following information when you fill out the <Link to="/account/update-information"><i><u>Update</u></i></Link> form:<br /><br />
            1. Full Name <br />
            2. Addresses <br />
            3. Country <br />
            4. Province <br />
            5. Zip <br />
            6. Phone <br />

          </p>
        </section>
        <section id='UseCokkies' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'UseCokkies' ? 'border-b-2 border-yellow-500' : ''}`}>Use of cookies</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            We use “cookies” to store the country you live and your cart you put.<br />
            <i>
              Definition: A cookie is a small piece of data that our website stores on your computer,<br />
              and accesses each time you visit, so we can understand how you use our site.<br />
            </i>
            <br />
            This helps us serve you content based on preferences you have specified.
          </p>
        </section>
        <section id='DataUse' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'DataUse' ? 'border-b-2 border-yellow-500' : ''}`}>Use of information</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            We may collect, store and use, <br />
            for the following reasons, and we will not <br />
            use your personal information in any other way <br />
            that doesn't match these reasons:<br />
            <br />
            1. To <b>contact and communicate with you</b>;<br />
            2. For <b>analytics, market research, and business development</b>,<br />
            including to operate and improve our website,<br />
            and associated social media platforms. <br />
          </p>
        </section>
        <section id='SecurityInfo' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'SecurityInfo' ? 'border-b-2 border-yellow-500' : ''}`}>Security of your personal information</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            When we collect and process personal information,<br />
            and while we retain this information,<br />
            we will protect it within commercially acceptable means<br />
            to prevent loss and theft, as well as unauthorized access,<br />
            disclosure, copying, use, or modification.<br />
            <br />
            <br />
            Although we will do our best to protect the personal information<br />
            you provide to us, <b>we advise that no method of electronic transmission<br />
            or storage is 100% secure,</b> and no one can guarantee absolute data security.<br />
            We will comply with laws applicable to us in respect of any data breach.<br />
            <br />
            <br />
            You are responsible for selecting any password and its overall security strength,<br />
            ensuring the security of your own information within the bounds of our services.
          </p>
        </section>
        <section id='HowLongWeKeep' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'HowLongWeKeep' ? 'border-b-2 border-yellow-500' : ''}`}>How long we keep your personal information</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            We keep your personal information only for as long as we need to.<br />
            This time period may depend on what we are using your information for,<br />
            in accordance with this privacy policy.<br />
            <br />
            If your personal information is no longer required,<br />
            we will delete it or make it anonymous<br />
            by removing all details that identify you.<br />
            <br />
            However, if necessary, we may retain your personal information<br />
            for our compliance with a legal, accounting, or reporting obligation<br />
            or for archiving purposes in the public interest, scientific,<br />
            or historical research purposes or statistical purposes.
          </p>
        </section>
        <section id='ChildrenPrivacy' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'ChildrenPrivacy' ? 'border-b-2 border-yellow-500' : ''}`}>Children’s privacy personal information</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            We do not aim any of our products or services directly<br />
            at children under the age of 11,<br />
            and we do not knowingly collect personal information<br />
            about children under 11.
          </p>
        </section>
        <section id='TransferInformation' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'TransferInformation' ? 'border-b-2 border-yellow-500' : ''}`}>International transfers of personal information</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            The personal information we collect is stored and/or processed <br />
            where we or our partners, affiliates, and third-party <br />
            providers maintain facilities. Please be aware that the locations<br />
            to which we store, process, or transfer your personal information<br />
            may not have the same data protection laws as the country in which you<br />
            initially provided the information. If we transfer your personal information<br />
            to third parties in other countries:<br />
            1. We will perform those transfers in accordance with the requirements of applicable law;<br />
            2. We will protect the transferred personal information in accordance with this privacy policy.<br />
          </p>
        </section>
        <section id='YourRights' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'YourRights' ? 'border-b-2 border-yellow-500' : ''}`}>Your rights and controlling your personal information</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            Depending on where you live, you may have some or all of the rights listed below in<br />
            Relation to your personal information. However, these rights are not absolute,<br />
            may apply only in certain circumstances and,<br />
            in certain cases, we may decline your request as permitted by law.<br />
            <br />
            1. Right to Access / Know <br />
            2. Right to Delete. <br />
            3. Right to Correct. <br />
            4. Right of Portability. <br />
            5. Restriction of Processing: You may have the right to ask us <br />
                to stop or restrict our processing of personal information. <br />
            6. Withdrawal of Consent: Where we rely on consent to process <br />
                your personal information, <br />
                you may have the right to withdraw this consent. <br />
            7. Appeal <br />
            <br />
            <br />
            You may exercise any of these rights where indicated on our Site<br />
            or by contacting us using the contact details provided below.
          </p>
        </section>
        <section id='LimitPolicy' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'LimitPolicy' ? 'border-b-2 border-yellow-500' : ''}`}>Limits of our policy</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            Our website may link to external sites that are not operated by us.<br />
            Please be aware that we have no control over the content and policies<br />
            of those sites, and cannot accept responsibility or liability for<br />
            their respective privacy practices.
          </p>
        </section>
        <section id='ChangePolicy' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'ChangePolicy' ? 'border-b-2 border-yellow-500' : ''}`}>Changes to this policy</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            At our discretion, we may change our privacy policy<br />
            to reflect updates to our business processes, current acceptable practices,<br />
            or legislative or regulatory changes. If we decide to change this privacy policy,<br />
            we will post the changes here at the same link by which you are accessing this privacy policy.
            <br />
            If required by law,<br />
            we will get your permission or give you the opportunity<br />
            to opt in to or opt out of, as applicable,<br />
            any new uses of your personal information.
          </p>
        </section>
        <section id='ContactInfo' className='pt-20 sm:pt-30'>
          <h3 tabIndex={0} className={`sm:text-[calc(6px+3vmin)] text-[calc(20px+3vmin)] w-fit ${activeSection == 'ContactInfo' ? 'border-b-2 border-yellow-500' : ''}`}>Contact Information</h3>
          <p className='pt-8 | text-[calc(10px+2vmin)] sm:text-[calc(8px+1.03vmin)]'>
            If you have any questions or concerns regarding these Privacy Policy,<br />
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