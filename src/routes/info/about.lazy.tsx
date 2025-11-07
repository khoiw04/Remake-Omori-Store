import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/info/about')({
  component: About,
})

function About() {
  return (
    <main className='w-full h-fit min-custom-screen | flex flex-col | justify-center items-center | text-center | py-24'>
      <section id='name' className='flex flex-row | items-center | w-full max-w-96 | opacity-90'>
        <div className='flex flex-col | justify-start | text-start w-full | text-slate-800 dark:text-slate-200'>
          <h2 className='text-[calc(20px+1vmin)] font-bold'>@Khoi</h2>
          <h3 className='text-[calc(10px+1vmin)]'>Dirty Hacker</h3>
        </div>
        <img src="/images/ava.png" alt="Dirty Hacker" loading='lazy' width={110} height={110} draggable={false} />
      </section>
      <section id='Work' className='flex flex-col | justify-start | w-full max-w-96 | mt-12'>
        <div className='text-start text-slate-800 opacity-90'>
          <h2 className='font-semibold underline underline-offset-4 decoration-2 decoration-slate-400 dark:text-white/90'>Work</h2>
          <p className='w-full | text-justify indent-10 hyphens-auto | pt-3 text-black dark:text-white/90 opacity-100'>
            Khoi is ______
          </p>
        </div>
      </section>
    </main>
  )
}