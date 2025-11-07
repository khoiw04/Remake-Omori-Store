// Subgrid: https://www.frontend.fyi/tutorials/css-subgrid
import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { stagger } from "@/data/data"
import { slugify } from "@/utils/slug"

export function ListFrame({ children, className, ref, style } : { children: React.ReactNode, className: string, ref?: React.Ref<HTMLElement>, style?: React.CSSProperties }) {
    return (
        <main ref={ref} className="w-full min-custom-screen max-w-[1680px] mx-auto h-fit Moblie:justify-start | bg-white dark:bg-[#121212] | py-8 px-10 Moblie:px-10">
            <ul
                style={style}
                className={`size-full max-w-10xl Moblie:max-w-2xl gap-4 xl:gap-12 | grid ${className}`}>
                {children}
            </ul>
        </main>
    )
}

export function ListMainFrame({ children, className = 'grid-cols-4 md:grid-cols-8 2xl:grid-cols-10 Moblie-2:grid-cols-24'} : { children: React.ReactNode, className?: string }) {
    return (
        <ListFrame className={className}>
            {children}
        </ListFrame>
    )
}

export function ListSubMainFrame({ children, ref, style, className = 'grid-cols-4 md:grid-cols-10 xl:grid-cols-12 relative' } : { children: React.ReactNode, className?: string, ref?: React.Ref<HTMLElement>, style?: React.CSSProperties }) {
    return (
        <ListFrame ref={ref} className={className} style={style}>
            {children}
        </ListFrame>
    )
}

export function ListItemDisplay({ title, img, link, alt }: { title: string, img: string, link: string, alt: string }) {
    return (
        <li className="col-span-2 rounded-sm Moblie-3:grid Moblie-3:grid-cols-subgrid">
            <a
                href={link}
                className='xl:w-full opacity-90 | Moblie:aspect-square aspect-square sm:aspect-auto lg:aspect-video 2xl:aspect-auto | block | overflow-clip'>
                    <img
                        src={img}
                        alt={alt}
                        width={500}
                        loading="lazy"
                        draggable={false}
                        className="object-cover size-full"
                    />
            </a>
            <h4 className="uppercase | block | text-center sm:text-md font-mono 2xl:text-lg text-slate-700 dark:text-slate-300 opacity-85 font-semibold lg:font-sans lg:font-medium | w-full pt-4">{title}</h4>
        </li>
    )
}

export function ListSubItemDisplay({ title, img, alt, price, preview, type, style }: { title: string, img: string, alt: string, price: string, preview: string, type?: 'soldOut' | 'preOrder' | undefined, style?: React.CSSProperties }) {
    const slug_title = slugify(title)

    return (
        <motion.li
            style={style}
            {...stagger}
            variants={stagger}
            className="rounded-sm | grid Moblie-3:grid-cols-subgrid | col-span-2 | relative | text-slate-800 dark:text-[#]"
        >
            {type === 'soldOut' && <p className="absolute z-[1] top-0 left-0 | px-5 py-2 | block | bg-slate-950 text-slate-200 | opacity-50 | uppercase font-medium text-xs">
                Sold Out
            </p>}
            {type === 'preOrder' && <p className="absolute z-[1] top-0 left-0 | px-5 py-2 | block | bg-fuchsia-600/40 dark:bg-amber-600/40 text-slate-200/80 | uppercase font-medium text-xs">
                PREORDER
            </p>}
            <Link
                to="/products/$productId"
                params={{ productId: slug_title }}
                className='group | xl:w-full | block | overflow-clip | self-start | relative | opacity-90'>
                    <img
                        src={img}
                        alt={alt}
                        width={500}
                        loading="lazy"
                        className="object-cover | size-full | group-hover:opacity-0 transition-opacity duration-200"
                    />
                    <img
                        src={preview}
                        alt={alt}
                        width={500}
                        loading="lazy"
                        className="object-cover | size-full | opacity-0 group-hover:opacity-100 transition-opacity | absolute top-0 left-0 | z-[2]"
                    />
            </Link>
            <h4 tabIndex={0} className="uppercase | w-fit self-center mx-auto | text-center font-mono font-semibold lg:text-sm lg:font-sans lg:font-medium text-slate-800/85 dark:text-slate-200/85 opacity-95 | mt-3">{title}</h4>
            <p className="uppercase | w-fit self-center mx-auto | text-center font-medium lg:font-normal lg:text-sm text-slate-800/60 dark:text-slate-200/60 opacity-95 | lg:pt-0.25 lg:pb-0 leading-6">{price}</p>
        </motion.li>
    )
}