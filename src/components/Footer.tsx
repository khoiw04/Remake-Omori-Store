// https://www.apple.com/legal/
// https://www.coinsetters.io/privacy-policy
import { Link } from "@tanstack/react-router"
import { Footer } from "@/data/data"

export default function Main() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-white dark:bg-[#121212] w-full | -z-40 pb-6 lg:pb-2 pt-4 lg:pt-2 | text-[calc(8px+0.75vmin)] text-slate-900 dark:text-[#cacfd0] border-t border-slate-200/85 dark:border-[#3c3e40]/20">
            <section className="w-full flex justify-between px-8 lg:px-6 pb-4 lg:pb-0 opacity-80">
                <ul className="hidden lg:block">    
                    <li>
                        Copyright ©{currentYear} khoi.w04.
                    </li>
                    <li>
                        Inspired by
                            <span className="inline-flex flex-col pl-[0.5ex]">
                                <i><a href="https://www.omocat-shop.com/" target="_blank" rel="noopener noreferrer"> OMOCAT-SHOP</a></i>
                                <i><a href="https://offscriptstore.com/" target="_blank" rel="noopener noreferrer"> OFF-SCRIPT</a></i>
                            </span>
                    </li>
                </ul>
                <ul className="first:pt-0">
                    {
                        Footer.map((info, i) => (
                            <li key={`_${i}`} className="pt-0 sm:pt-0.25">
                                <Link to={info.href} viewTransition>{info.name}</Link>  
                            </li>
                        ))
                    }
                </ul>
                <ul className="flex flex-row items-center gap-4 **:focus:outline-offset-8">
                    <li>
                        <a href="https://youtube.com/@khoiwn04" target="_blank" rel="noopener noreferrer" className="focus:transition-all">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.615 3.19435C16.011 2.93469 7.984 2.93574 4.385 3.19435C0.488 3.47513 0.029 5.95987 0 12.5C0.029 19.0285 0.484 21.5238 4.385 21.8056C7.985 22.0643 16.011 22.0653 19.615 21.8056C23.512 21.5249 23.971 19.0401 24 12.5C23.971 5.97148 23.516 3.47618 19.615 3.19435ZM9 16.7222V8.27784L17 12.4926L9 16.7222Z" fill="currentColor" />
                            </svg>
                        </a>
                    </li>
                    {/* <li>
                        <a href="https://x.com/@_wwanname" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d7f4ef6498ac018f2c55_Symbol.svg" loading='lazy' alt="Discord" />
                        </a>
                    </li> */}
                </ul>
            </section>
            <section className="w-full pt-8 pb-8 flex justify-center items-center text-sm opacity-75 border-t border-t-slate-400/50 dark:border-t-[#3c3e40]/40 lg:hidden">
                ©{currentYear}, khoi.w04
            </section>
        </footer>
    )
}