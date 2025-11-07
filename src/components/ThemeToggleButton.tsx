import { useEffect, useState } from 'react'
import { Dark, Light } from '@/data/SVG'

export default function ThemeToggle({ moble = true }) {
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  useEffect(() => {
    const root = document.documentElement
    const metaTag = document.querySelector('meta[name="color-scheme"]')

    if (theme === 'light') {
      root.classList.remove('dark')
      if (metaTag) {
        metaTag.remove()
      }
    } else {
      root.classList.add('dark')
      const meta = document.createElement('meta')
      meta.name = 'color-scheme'
      meta.content = 'light dark'
      document.head.appendChild(meta)
    }
  }, [theme])

  return (
    <li className={`${!moble ? 'block md:hidden absolute right-0 bottom-0 pb-4 pr-4' : 'md:block self-center hidden'}`}>
        {theme === "light" ?
            <button
              type='button'
              title="Toggle theme"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-amber-600/60 h-fit p-1 translate-x-1 -translate-y-[2.25px] cursor-pointer"
            >
              <Light />
            </button>
        :
            <button
              type='button'
              title="Toggle theme"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-slate-600 h-fit p-1 translate-x-1 -translate-y-[2.25px] cursor-pointer"
            >
              <Dark />
            </button>
        }
    </li>
  )
}