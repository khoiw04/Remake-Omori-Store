import { Link } from "@tanstack/react-router"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { Fragment } from "react/jsx-runtime"
import { useCallback, useEffect, useRef, useState } from "react"
import ThemeToggle from "./ThemeToggleButton"
import { LinkNavbar, currencyOffScript } from "@/data/data"
import { useCountryCodeStore } from "@/zustand/countryCode-slice"
import { Arrow, Close, User2 } from "@/data/SVG"
import { useZustandStore } from "@/zustand/main"

export default function Mobile() {
  const { click } = useZustandStore()


    return (
    <AnimatePresence>
      {click.burger &&
      <MotionConfig transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}>
        <motion.menu
          initial={{ translateX: "-100%" }}
          animate={{ translateX: "0%" }}
          exit={{ translateX: "-100%" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className='w-12/13 lg:w-2/5 h-dvh | fixed left-0 z-30 | bg-white dark:bg-[#121212] text-gray-900 dark:text-white/90 | box-shadow-inner-tailwind | overflow-clip scroll-thin'>
          <Header />
          <Article />
          <Footer />
        </motion.menu>
      </MotionConfig>}
    </AnimatePresence>
    )
}

function Header() {
  const { click, setClick } = useZustandStore()

  const LanguageMoblieRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    if (click.burger) {
        LanguageMoblieRef.current?.focus()
    }
  }, [click.burger])

  const { countryCode } = useCountryCodeStore()

  return (
    <header className='flex w-full h-fit | z-20 | justify-between items-center | uppercase px-4 pt-6 font-mono'>
      <AnimatePresence mode="wait">
        {!click.currencyMobile && 
        <>        
          <motion.button
            ref={LanguageMoblieRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setClick('currencyMobile', true)}
            className="flex items-center relative text-xs cursor-pointer | opacity-75 | after:content-[''] after:absolute after:w-full after:h-[0.25px] after:bg-slate-400 after:bottom-0 after:left-0">
              {currencyOffScript.map((cur, indx) => {
                if (countryCode === cur.code) return (
                  <Fragment key={`display_currency_${indx}`}>
                      {cur.name}
                  </Fragment>
                )
              })}
          </motion.button>
        </>
        }
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {click.currencyMobile &&
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setClick('currencyMobile', false)}
            className='uppercase | absolute | inline-flex items-center | cursor-pointer'>
            <Arrow className='scale-50 rotate-90' /> Back
          </motion.button>
        }
      </AnimatePresence>
      <motion.button
        type='button'
        title='Close'
        animate={{ opacity: !click.currencyMobile ? 1 : 0 }}
        onClick={() => {
          setClick('burger', false)
          setClick('currencyMobile', false)
        }}
        tabIndex={!click.currencyMobile ? 0 : -1}
        className='cursor-pointer opacity-75'>
        <Close className='scale-130' />
      </motion.button>
    </header>
  )
}

function Article() {
  const { click } = useZustandStore()


  return (
    <motion.article animate={{ translateX: click.currencyMobile ? "100%" : "0%" }} className='flex flex-nowrap flex-row-reverse | h-full'>
      <MobileItems />
      <MoblieCurrency />
    </motion.article>
  )
}

function MobileItems() {
  const { click, setClick } = useZustandStore()


  const [expandedIndex, setExpandedIndex] = useState({
    number: -1,
    active: false,
  })

  const goBack = () => {
    setClick('burger', false)
  }

  const handlePointerDown = useCallback((i: number) => {
    setExpandedIndex(prevState => ({
      ...prevState,
      active: prevState.number === i ? false : true,
      number: prevState.active === false ? -1 : i
    }))
    if (!expandedIndex.active) {
      setExpandedIndex(prevState => ({
        ...prevState,
        number: prevState.active === false ? -1 : i
      }))
    }
    if (!expandedIndex.active) {
      setExpandedIndex(prevState => ({
        ...prevState,
        number: prevState.active === false ? -1 : i
      }))
    }
    if (!expandedIndex.active) {
      setExpandedIndex(prevState => ({
        ...prevState,
        number: prevState.active === false ? -1 : i
      }))
    }
  }, [])


  return (
    <ul className='w-full relative | divide-y divide-slate-200 dark:divide-neutral-800 | uppercase text-lg pt-16'>
      <li className='w-full flex justify-between items-center'>
        <Link
          to="/collections/all"
          tabIndex={!click.currencyMobile ? 0 : -1}
          className='p-4 focus-moblie size-full'>All</Link>
        <Link
          to="/collections/new"
          tabIndex={!click.currencyMobile ? 0 : -1}
          className='p-4 focus-moblie size-full'>NEWEST</Link>
        <Link
          to="/collections/old"
          tabIndex={!click.currencyMobile ? 0 : -1}
          className='p-4 focus-moblie size-full'>OLDEST</Link>
      </li>
      {LinkNavbar.map((info, i) => {
        const isExpanded = expandedIndex.number === i && expandedIndex.active
        return (
          <li key={`link-item---burger_${i}`}>
            <div
              id="display"
              className='w-full | flex | justify-between items-center | py-4 px-4 | focus-moblie'
              onClick={() => handlePointerDown(i)}
            >
              <Link tabIndex={!click.currencyMobile ? 0 : -1} to="/collections/all" onClick={goBack}>
                  {info.name}
              </Link>
              <button type='button' title='expand' tabIndex={!click.currencyMobile ? 0 : -1}>
                <Arrow className={`scale-75 transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
              </button>
            </div>
            <div id="list" className={`m-0 ${isExpanded ? 'max-h-96' : 'max-h-0'} overflow-hidden | transition-all duration-600`}>
              {info.items.map((item, index) => {
                const { name, link } = item
                return (
                  <Link
                    to={link}
                    onClick={goBack}
                    tabIndex={isExpanded ? 0 : -1}
                    key={`navbar--item-mobile_${index}`}
                    className='relative | block | text-sm lowercase dark:uppercase | px-10 py-4 | focus-moblie | after:content-[""] after:w-full after:absolute after:top-0 after:left-0 after:border-b-slate-200 after:border-b dark:after:border-b-neutral-800/20'>
                      {name}
                  </Link>
                )
              })}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function MoblieCurrency() {
  const { click } = useZustandStore()


  const { countryCode, updateCountryCode } = useCountryCodeStore()

  return (
    <div className='px-6 pt-22 | -translate-x-full | absolute size-full | flex-col'>
      <ul className='w-full h-7/8 | flex flex-col | border-t-slate-200 dark:border-t-neutral-600 border-t | overflow-y-auto | py-4 text-[calc(10px+1.3vmin)]'>
        {currencyOffScript.map((cur, index) => {
          return (
            <li
                key={`cur_${index}`}
                data-value={cur.code}>
              <button
                type="button"
                onClick={() => updateCountryCode(cur.code)}
                tabIndex={click.currencyMobile ? 0 : -1}
                className={`size-full dark:text-white/80 focus-moblie | px-1 py-2.5 | rounded-md | text-left ${countryCode === cur.code ? 'underline underline-offset-2 decoration-2' : ''}`}
              >
                {cur.name}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Footer() {
  const { account, click, setClick } = useZustandStore()

  return (
    <motion.footer
      animate={{ opacity: !click.currencyMobile ? 1 : 0 }}
      className='w-full pb-8 absolute bottom-0 gap-1 flex flex-col items-center'
      style={{
        pointerEvents: click.currencyMobile ? "none" : "auto"
      }}
    >
      {account ? (
        <Link
          to="/account"
          onClick={() =>
            {
              setClick('currencyMobile', false)
              setClick('burger', false)
            }
          }
          tabIndex={!click.currencyMobile ? 0 : -1}
          className="focus-moblie p-4"
        >
          <User2 className='scale-75' />
        </Link>
      ) : (
        <button
          type='button'
          title='Login'
          onClick={() =>
            {
              setClick('currencyMobile', false)
              setClick('burger', false)
              setClick('login', true)
            }
          }
          tabIndex={!click.currencyMobile ? 0 : -1}
          className="focus-moblie p-4"
        >
          <User2 className='scale-75' />
        </button>
      )}
      <div className="*:block text-center pt-4">
        <p>Inspired by</p>
        <i><a href="https://www.omocat-shop.com/" target="_blank" rel="noopener noreferrer">OMOCAT-SHOP</a></i>
        <i><a href="https://offscriptstore.com/" target="_blank" rel="noopener noreferrer">OFF-SCRIPT</a></i>
      </div>
      <ThemeToggle moble={false} />
    </motion.footer>
  )
}