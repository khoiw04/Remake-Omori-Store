import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
// https://github.com/orgs/supabase/discussions/1066
import { useEffect, useState } from 'react'
import { any, nonEmpty, object, pipe, regex, string } from 'valibot'
import { useMutation } from '@tanstack/react-query'
import { useForm, useStore } from '@tanstack/react-form'
import { AnimatePresence, motion } from 'framer-motion'
import type {StandardSchemaV1Issue} from '@tanstack/react-form'
import { supabase } from '@/supabase/supabase'
import { Close } from '@/data/SVG'
import { useAuth } from '@/utils/useAuth'
import { currencyOffScript } from '@/data/data'
import { useZustandStore } from '@/zustand/main'

type Information = {
  first: string;
  last: string;
  address1: string;
  address2: string;
  country: string;
  province: string;
  zip: string | number | undefined;
  phone: string;
  email: string;
}

export const Route = createFileRoute('/account/update-information')({
  component: Update,
  beforeLoad({ context }) {
    const authentication = context.authentication
    if (authentication && typeof authentication.isLogged === 'function') {
      const { isLogged } = authentication
      if (!isLogged()) throw redirect({ to: "/" })
    }
  }
})

function Update() {
  const { email, first_name, last_name, city, line1, line2, phone, country: cStore, postal_code, setInfo } = useZustandStore()
  const navigation = useNavigate({ from: "/account/update-information" })
  const [click, setClick] = useState(false)
  const [del, setDelete] = useState(false)
  const UpdateSchema = object({
    first: pipe(
      string(),
      nonEmpty('Please add your First name.'),
      regex(/^[A-Za-zÀ-ÿ\s'-]+$/, 'Invalid name format')
    ),
    last: string(),
    address1: string(),
    address2: string(),
    country: any(),
    province: any(),
    zip: any(),
    email: any(),
    phone: pipe(
      string(),
      // minLength(5, 'Phone number must be at least 5 characters long'),
      // maxLength(15, 'Phone number must not exceed 15 characters'),
      // regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    ),
  })
  const whitelist = currencyOffScript.map(id => id.code)

  const form = useForm({
    defaultValues: {
      first: first_name,
      last: last_name,
      address1: line1,
      address2: line2,
      country: cStore,
      province: city,
      zip: postal_code,
      phone: phone,
      email: email,
    },
    validators: {
      onSubmitAsync: UpdateSchema
    },
    onSubmit: (props) => {
      updating.mutateAsync(props.value)
    }
  })

  const updating = useMutation(
    {
      mutationKey: ['update_information', email],
      mutationFn: async (s: Information) => {
        await Promise.all([
          await fetch('/update-account', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(s),
          }),
          (async () => {
            const { data } = await supabase.auth.getUser()
            await supabase
              .from('users')
              .upsert({
                id: data.user?.id,
                email: s.email,
                first_name: s.first,
                last_name: s.last,
                address_1: s.address1,
                address_2: s.address2,
                country: s.country,
                province: s.province,
                zip: s.zip,
                phone: s.phone
              })
          }
          )()
        ])
      },
      onSuccess() {
          setInfo()
          navigation({ to: '/account' })
      }
      }
    )

  const country = useStore(form.store, (state) => state.values.country)

  // useEffect(() => {
  //   const styles = `${img}; color: white; font-size: large; font-weight: bold; text-shadow: -1px -1px 0px #493b49, 1px -1px 0px #493b49, -1px 1px 0px #493b49, 1px 1px 0px #493b49; padding: 300px 200px; background-repeat: no-repeat; background-size: cover; background-position: center;`
  //   console.log('%c Please we will miss you 😿', styles)
  // }, [])

  useEffect(() => {
    // run on client only, not on server
    if (typeof window !== 'undefined') {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      const preventScroll = (e: MouseEvent | TouchEvent) => {
        if (click) {
          setTimeout(() => {
            e.preventDefault()
          }, 0)
        }
      }

      if (click) {
        document.documentElement.style.overflow = 'clip'
        document.body.style.overflow = 'clip'
        document.body.style.paddingRight = `${scrollBarWidth}px`
      } else {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }

      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventScroll, { passive: true })

      return () => {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
        window.removeEventListener('wheel', preventScroll)
        window.removeEventListener('touchmove', preventScroll)
      }
    }

  }, [click])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {setClick(false)}
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])


  useEffect(() => {
    if (del) {
      document.body.style.cursor = 'wait'
      delete_account.mutateAsync()
    } else {
      document.body.style.cursor = 'auto'
    }
  }, [del])

  const delete_account = useMutation(
    {
      mutationKey: ['delte_account'],
      mutationFn: async () => {
          await Promise.all([
            fetch('/delete-account', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(email),
            }),
            (async () => {
              await supabase.rpc('deleteUser')
            })(),
          ])
      },
      onSuccess() {
        const authContext = useAuth();
        if (typeof authContext === 'object' && typeof authContext.signOut === 'function') {
          authContext.signOut()
        }
        navigation({ to: "/", replace: true })
        document.body.style.cursor = 'auto'
      },
      onError() {
        setDelete(false)
      }
    }
  )

  return (
    <main className='w-full h-fit px-8 lg:px-44 py-4 |  text-slate-800 dark:text-white/80 select2 | flex flex-col | items-center justify-center'>
      <AnimatePresence presenceAffectsLayout>
        {click &&
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setClick(false)}
              className='bg-black w-full h-dvh fixed top-0 right-0 z-30'
              style={{ pointerEvents: del ? 'none' : 'auto' }}
            />
            <AnimatePresence presenceAffectsLayout propagate>
              {
                !del && (
                <motion.section
                  initial={{ opacity: 0.9, scale: 0.9, filter: `blur(4px)`, rotateY: -4, rotateX: 4 }}
                  animate={{ opacity: 1, scale: 1, filter: `blur(0px)`, rotateY: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 1, filter: `blur(2px)`, rotateY: 4, rotateX: -4 }}
                  transition={{ duration: 0.4, ease: [0.5, 1, 0.89, 1] }}
                  className='flex | justify-center items-center | w-full h-dvh | fixed top-0 right-0 z-40 | pointer-events-none'
                >
                  <div className='bg-neutral-100 dark:bg-neutral-900 rounded-xl text-neutral-800 dark:text-neutral-200 | pointer-events-auto | border border-neutral-400 dark:border-neutral-800'>
                    <header className='flex | justify-between items-center | w-full border-b border-b-neutral-400 dark:border-neutral-800'>
                      <p className='text-sm font-medium p-4'>Deleting your account forever</p>
                      <button
                        type='button'
                        className='mt-0.5 mx-4 cursor-pointer'
                        onClick={() => setClick(false)}
                      >
                        <Close className='scale-80' />
                      </button>
                    </header>
                    <article className='w-full | flex flex-col justify-center items-center | text-center | py-4'>
                      <h3 className='cursor-text | w-full | pt-2 px-4 pb-1 | font-medium text-xl leading-4 '>
                        {email}
                      </h3>
                    </article>
                    <footer className='w-full |  px-4 py-4 | border-t border-t-neutral-400 dark:border-t-neutral-800'>
                      <button
                        type='button'
                        tabIndex={0}
                        onClick={() => setDelete(true)}
                        className='size-full | px-4 py-1 | bg-neutral-300/10 dark:bg-neutral-200 hover:bg-rose-800/20 dark:hover:bg-neutral-200/90 text-red-800 hover:text-red-400 | cursor-pointer | ring-1 ring-red-400 focus:outline-blue-400 focus:outline-offset-4 focus:ring-offset-3 | transition-all | rounded-sm'
                      >
                        Delete
                      </button>
                      {delete_account.isError &&
                        <p className='block text-red-500 dark:text-red-400/80 text-sm mt-4 text-center pt-2 border-t border-t-neutral-400 dark:border-t-neutral-800'>
                            {delete_account.isError}
                        </p>
                      }
                    </footer>
                  </div>
                </motion.section>
                )
              }
            </AnimatePresence>
          </>
        }
      </AnimatePresence>
      <small className='w-full text-center | text-[calc(8px+0.4vmin)]'>UPDATE</small>
      <form className='w-full h-fit mt-12 max-w-3xl | mb-12 sm:mb-0'>
        <section className='table w-full'>
          <form.Field
            name="first"
            children={(field) => (
            <div className='w-full sm:w-1/2 float-left table-cell'>
              <label htmlFor='CustomerFirstName' className='select-text'>First name</label>
              <input
                type="text"
                id='CustomerFirstName'
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                className='w-full mt-4 p-2 py-2 | block | focus:outline-slate-800 focus:border-slate-800 | border-b border-b-slate-200 dark:border-b-neutral-600/40'
              />
              <p className='text-red-500 dark:text-red-400/80 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
              </p>
            </div>
            )}
          />
          <form.Field
            name="last"
            children={(field) => (
              <div className='w-full sm:w-1/2 | mt-8 sm:mt-0 sm:pl-12 | float-left table-cell'>
                <label htmlFor='CustomerLastName' className='select-text'>Last name</label>
                <input
                  type="text"
                  id='CustomerLastName'
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className='w-full mt-4 p-2 py-2 | block | focus:outline-slate-800 focus:border-slate-800 | border-b border-b-slate-200 dark:border-b-neutral-600/40'
                />
              <p className='text-red-500 dark:text-red-400/80 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
              </p>
              </div>
            )}
          />
        </section>
        <section className='table w-full mt-8'>
          <form.Field
            name="address1"
            children={(field) => (
              <div className='w-full float-left table-cell'>
                <label htmlFor='Address1' className='select-text'>Address 1</label>
                <input
                  type="text"
                  id='Address1'
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className='w-full mt-4 p-2 py-2 | block | focus:outline-slate-800 focus:border-slate-800 | border-b border-b-slate-200 dark:border-b-neutral-600/40'
                />
              <p className='text-red-500 dark:text-red-400/80 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
              </p>
              </div>
            )}
          />
        </section>
        <section className='table w-full mt-8'>
          <form.Field
            name="address2"
            children={(field) => (
            <div className='w-full float-left table-cell'>
              <label htmlFor='Address2' className='select-text'>Address 2</label>
              <input
                type="text"
                id='Address2'
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                className='w-full mt-4 p-2 py-2 | block | focus:outline-slate-800 focus:border-slate-800 | border-b border-b-slate-200 dark:border-b-neutral-600/40'
              />
              <p className='text-red-500 dark:text-red-400/80 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
              </p>
            </div>
            )}
          />
        </section>
        <section className='table w-full mt-8'>
          <form.Field
            name="country"
            children={(field) => (
              <div className='w-full float-left table-cell'>
                <label htmlFor='Country' className='select-text'>Country</label>
                <CountryDropdown
                  id='Country'
                  whitelist={whitelist}
                  defaultOptionLabel="---"
                  value={field.state.value}
                  onChange={field.handleChange}
                  name='react-country-region-selector'
                  className='w-full mt-4 p-2 | block | *:bg-neutral-100 *:text-slate-800 *:dark:bg-neutral-900 *:dark:text-neutral-100 | border border-slate-200 dark:border-neutral-600/40 | cursor-pointer appearance-none'
                />
              <p className='text-red-500 dark:text-red-400/80 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
              </p>
              </div>
            )}
          />
        </section>
        <section className='table w-full mt-8'>
          <form.Field
            name="province"
            children={(field) => (
            <div className='w-full float-left table-cell'>
              <label htmlFor='Province' className='select-text'>Province</label>
              <RegionDropdown
                id='Province'
                country={country}
                showDefaultOption={false}
                value={field.state.value}
                onChange={field.handleChange}
                name='react-country-region-selector'
                className='w-full mt-4 p-2 | block | *:bg-neutral-100 *:text-slate-800 *:dark:bg-neutral-900 *:dark:text-neutral-100 | border border-slate-200 dark:border-neutral-600/40 | cursor-pointer appearance-none'
              />
              <p className='text-red-500 dark:text-red-400/80 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
              </p>
            </div>
            )}
          />
        </section>
        <section className='table w-full mt-8'>
          <form.Field
            name="zip"
            children={(field) => (
            <div className='w-full sm:w-1/2 float-left table-cell'>
              <label htmlFor='ZipCode' className='select-text'>Postal/Zip code</label>
              <input
                type="text"
                id='ZipCode'
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                className='w-full mt-4 p-2 py-2 | block | focus:outline-slate-800 focus:border-slate-800 | border border-slate-600 dark:border-neutral-400/40'
              />
              <p className='text-red-500 dark:text-red-400/80 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
              </p>
            </div>
            )}
          />
          <form.Field
            name="phone"
            children={(field) => (
              <div className='w-full sm:w-1/2 | mt-8 sm:mt-0 sm:pl-12 | float-left table-cell'>
                <label htmlFor='Phone' className='select-text'>Phone</label>
                <input
                  type="text"
                  id='Phone'
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className='w-full mt-4 p-2 py-2 | block | focus:outline-slate-800 focus:border-slate-800 | border-b border-b-slate-200 dark:border-b-neutral-600/40'
                />
              <p className='text-red-500 dark:text-red-400/80 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
              </p>
              </div>
            )}
          />
        </section>
        <form.Subscribe
          selector={(state) => state.errors}
          children={(errors) => {
              return (
                <div>
                  {Object.entries(errors).map(([key, issues]) => {
                    if (Array.isArray(issues)) {
                      return (
                        <div key={key}>
                          {issues.map((issue: StandardSchemaV1Issue, index: number) => (
                            <p key={index} className='text-red-500 dark:text-red-400/80 text-sm mt-4'>
                              {issue.message}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null
                  })}
                </div>
              )
          }}
        />
        <section className='w-full | flex | justify-between items-center-safe | mt-8 mb-4'>
          <div className='flex flex-col sm:flex-row | gap-4 sm:gap-0 my-8 '>
          <form.Subscribe
            selector={(state) => [state.canSubmit]}
            children={([canSubmit]) => (
              <div className='relative'>
              <input
                type='submit'
                value={'UPDATE'}
                disabled={!canSubmit}
                onClick={form.handleSubmit}
                className="bg-slate-950 dark:bg-neutral-950 focus:outline-offset-8 text-slate-100 dark:text-white/90 | px-5 py-1 | cursor-pointer | rounded-lg | tracking-wide font-medium | hover:bg-neutral-700 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 hover:text-neutral-200 dark:hover:text-neutral-200/90 dark:active:text-neutral-200/60 disabled:bg-slate-400 disabled:text-slate-600 | transition-all"
              />
              {updating.isError && <p
                className='absolute mt-4 text-red-500 dark:text-red-400/80 text-sm'>
                {updating.error.name} + {updating.error.message}
              </p>}
              </div>
            )}
          />
          </div>
          <Link to="/account"
            className='underline decoration-2 underline-offset-2 cursor-pointer focus:outline-offset-4 mt-2'>
              Go back
          </Link>
        </section>
      </form>
      <section className='w-full max-w-3xl'>
        <hr className='w-full h-[1px] bg-slate-950' />
        <h2 className='text-2xl mt-8 text-red-950 dark:text-red-400/60'>Delete account</h2>
        <p className='mt-2'>Once you delete your account, there is no going back. Please be certain.</p>
        <input
          type='submit'
          value={'Delete your account'}
          onClick={() => setClick(true)}
          className="bg-red-800 text-red-200 focus:outline-offset-2 | px-5 py-1 sm:px-4 sm:py-1.5 my-8 | cursor-pointer | rounded-lg | tracking-wide font-medium | hover:bg-red-700 dark:hover:bg-red-800 dark:hover:text-red-100 hover:text-red-200 active:bg-red-400 dark:active:bg-red-400 active:text-red-100 | transition-all"
        />
      </section>
    </main>
  )
}
