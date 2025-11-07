import { Link } from "@tanstack/react-router"
import { Fragment } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ThemeToggle from "./ThemeToggleButton"
import type { Item } from "@/data/data"
import { LinkNavbar, LinkNavbarDark, currencyOffScript } from "@/data/data"
import { useCountryCodeStore } from "@/zustand/countryCode-slice"
import { Arrow, Burger, SearchIcon, Shop, User } from '@/data/SVG'
import { useZustandStore } from "@/zustand/main"

export function Tile({ header, footer } : { header: React.ReactNode, footer: React.ReactNode }) {
  return (
    <nav className="flex flex-col | sticky w-full top-0 left-0 z-10 | justify-center items-center bg-white dark:bg-[#121212] text-slate-900 dark:text-[#dcdcdc] | gap-1 TBOS:pt-8 | box-shadow-inner-tailwind | overflow-x-clip">
        <header className='flex w-full | justify-center items-center | relative | TBOS:h-44 h-22 lg:h-24'>
            {header}
        </header>
        <menu className='sm:flex flex-row | uppercase font-stretch-50% text-black dark:text-[#dcdcdc] text-sm | cursor-pointer | gap-6 hidden'>
            {footer}
        </menu>
    </nav>
  )
}

export function CurrencyItem() {

  const { click, setClick } = useZustandStore()

  const { countryCode, updateCountryCode } = useCountryCodeStore()

  return (
    <ul onMouseLeave={() => setClick('currency', false)} className='lg:flex flex-col absolute | text-xs left-10 | hover:transition-all | hidden'>
      <li 
        aria-expanded={click.currency}
        onMouseEnter={() => setClick('currency', true)}
        className="relative z-20 top-6.5 h-16 | cursor-pointer">
            <button
                onClick={() => setClick('currency', !click.currency)}
                type="button"
                data-pop={click.currency}
                className="cursor-pointer | focus:transition-all focus:duration-75 focus:outline-offset-8 | after:content-[''] after:w-[0%] after:h-[0.25px] after:bg-black dark:after:bg-neutral-200 | after:absolute after:bottom-11.5 after:right-0 | hover:after:left-0 hover:after:w-full after:transition-all after:duration-200 after:will-change-auto data-[pop=true]:after:w-full data-[pop=true]:after:left-0 | font-mono tracking-widest"
                >
                {currencyOffScript.map((cur, indx) => {
                    if (countryCode === cur.code) return (
                    <Fragment key={`display_currency_${indx}`}>
                      {cur.name}
                    </Fragment>
                  )
                })}
            </button>
      </li>
      {<AnimatePresence>
      {click.currency &&
          <motion.ul
            initial={{ translateY: 8, opacity: 0 }}
            animate={{ translateY: -8, opacity: 100 }}
            exit={{ translateY: 8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='flex flex-col | text-base cur | absolute top-20 w-fit h-96 z-20 | first:pt-0 | overflow-y-scroll box-shadow-inner-tailwind'
          >
          {currencyOffScript.map((cur, index) => {
              return (
              <li
                  key={`cur_${index}`}
                  tabIndex={0}
                  data-value={cur.code}
                  onClick={() => updateCountryCode(cur.code)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter')
                      updateCountryCode(cur.code)
                  }}
                  className="break-keep wrap-break-word whitespace-nowrap text-[calc(8px+0.75vmin)] | cursor-default | py-1.5 px-4 | bg-white dark:bg-[#121212] group">
                  <span className="relative after:content-[''] after:w-[0%] after:h-[1px] after:bg-black dark:after:bg-white/90 | after:absolute after:-bottom-0.25 after:left-0 | cursor-pointer | group-hover:after:w-full after:transition-all after:duration-200 after:will-change-auto data-[pop=true]:after:w-full opacity-85">{cur.name}</span>
              </li>
          )})}
          </motion.ul>}
      </AnimatePresence>}
    </ul>
  )
}

export function BurgerItem() {
  const { setClick } = useZustandStore()


  return (
    <button
      type='button'
      title="Menu"
      className="lg:hidden block left-2 p-4 absolute cursor-pointer focus-moblie transition-colors duration-75"
      onClick={() => setClick('burger', true)}
    >
      <Burger />
    </button>
  )
}

export function Items() {
  return (
    <ul className='flex flex-row | **:focus:outline-offset-8 | absolute right-6 lg:right-10 | gap-6 lg:gap-8 | opacity-75 | *:cursor-pointer'>
      <ThemeToggle />
      <SearchItem />
      <AccountItem />
      <CartItem />
    </ul>
  )
}

export function SearchItem() {
  const { click, setClick } = useZustandStore()


  return (
    <li data-pop={click.search} aria-expanded={click.search}>
      <button
        type='button'
        className='block cursor-pointer'
        title='Search'
        onClick={() => setClick('search', true)}
      >
        <SearchIcon className='scale-85 lg:scale-[75%] hover:text-slate-400 transition-colors duration-75' />
      </button>
    </li>
  )
}

export function AccountItem() {
  const { setClick, account } = useZustandStore()

  return (
    <>
      {account ? (
        <li className="lg:block hidden">
          <Link to="/account"><User className='sm:scale-[60%] hover:text-slate-400 transition-colors duration-75' /></Link>
        </li> ) : (
        <li className="lg:block hidden">
        <button 
          type="button"
          className='block cursor-pointer'
          title='User'
          onClick={() => setClick('login', true)}
        >
          <User className='sm:scale-[60%] hover:text-slate-400 transition-colors duration-75' />
        </button>
        </li>
      )}
    </>
  )
}

export function CartItem() {
  const { cart, setClick } = useZustandStore()

  return (
    <>
      <li>
        <button
          type="button"
          title='Cart'
          onClick={() => setClick('cart', true)}
          className='inline-flex items-center | gap-2 | relative | group *:group-hover:transition-colors duration-75 | cursor-pointer'
        >
        <Shop className='scale-75 lg:scale-[60%] group-hover:text-slate-400' />
        <span
          data-length={cart.length}
          className='text-[0.6rem] sm:text-xs group-hover:text-slate-400 text-center | absolute lg:static | sm:bottom-4 -right-2 bottom-6 | text-slate-200 dark:text-[#dcdcdc] sm:data-[length=0]:text-slate-900 lg:text-slate-900 | bg-neutral-800 rounded-full sm:data-[length=0]:bg-transparent lg:bg-transparent sm:data-[length=0]:rounded-none lg:rounded-none | w-4 h-4'
        >
            {cart.length}
        </span>
        </button>
      </li>
    </>
  )
}

export function Footer() {
    return (
        <>
            <li className="opacity-85 *:focus:outline-offset-8 ?translate-x-2.5"><Link to='/collections/all'>all</Link></li>
            <li className="opacity-85 *:focus:outline-offset-8 ?translate-x-2.5"><Link to='/collections/new'>NEWEST</Link></li>
            <li className="opacity-85 *:focus:outline-offset-8 ?translate-x-2.5"><Link to='/collections/old'>OLDEST</Link></li>
            {LinkNavbar.map((info, i) => {
              const { name, link, items } = info
              return <Item key={`link-items----navbar${i}`} name={name} link={link} items={items} className="dark:hidden **:nth-[2]:lowercase" />
            })}
            {LinkNavbarDark.map((info, i) => {
              const { name, link, items } = info
              return <Item key={`link-items----navbar${i}`} name={name} link={link} items={items} className="hidden dark:block" />
            })}
        </>
    )
}

export function Item({ name, link, items, className }: Item) {
  return (
    <li className={`group relative pb-2 ?translate-x-2.5 last:-?translate-x-0.5 ${className}`} role="navigation">
      <Link to={link} className='peer focus:outline-offset-8 | flex will-change-auto opacity-85 | group-hover:text-gray-200 dark:group-hover:text-gray-400 group-hover:opactiy-100 group-hover:duration-100 | gap-2'>
        {name} <Arrow className='scale-50 -mt-0.75' />
      </Link>
      <ul className='flex flex-col whitespace-nowrap | last:pb-1 mt-2 | bg-white dark:bg-[#121212] absolute | will-change-auto opacity-0 invisible | peer-focus-visible:duration-150 group-hover:duration-150 focus-within:duration-150 | group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 peer-focus-visible:visible peer-focus-visible:opacity-100 | dark:text-gray-200/80 **:focus:text-gray-400 **:hover:text-gray-400 **:duration-100' aria-haspopup="true">
        {items.map((item, i) => (
          <li key={`item---navbar-link__${i}`}>
            <Link to={item.link} className='px-4 py-1 inline-block size-full'>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}