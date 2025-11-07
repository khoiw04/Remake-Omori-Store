import { useForm } from '@tanstack/react-form';
import { useEffect, useState } from 'react'
import { email, minLength, nonEmpty, object, pipe, string } from 'valibot'
import { Link, useNavigate } from '@tanstack/react-router'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import Turnstile from 'react-turnstile';
import { supabase } from '@/supabase/supabase';
import { Close } from '@/data/SVG';
import { useAuth } from '@/utils/useAuth';
import { useZustandStore } from '@/zustand/main';

type Email = {
  email: string
}

type Login = {
  password: string
} & Email

export default function Login() {

    const navigation = useNavigate({ from: '/' })
    const { click, account, setAccount } = useZustandStore()

    useEffect(() => {
      const { data: user } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "PASSWORD_RECOVERY") navigation({ to: '/account/update-password' })
        session?.access_token ? setAccount('flowey') : setAccount(null)
      })
      return () => user.subscription.unsubscribe()
    }, [])


    return (
      <AnimatePresence>
        {click.login &&
          <motion.aside
          initial={{ translateX: "100%" }}
          animate={{ translateX: "0%" }}
          exit={{ translateX: "100%" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className='w-11/13 omo:lg:w-2/5 lg:w-6/16 h-dvh fixed right-0 z-30 bg-white dark:bg-[#121212] box-shadow-inner-tailwind overflow-y-auto overflow-x-hidden'>
          <Header />
          <MotionConfig transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}>            
            {!account &&
              <>
                <LogInField />
                <ForgetField />
              </>
            }
            {
            account && (
                <div className='flex flex-col | justify-center items-center | w-full | mt-4 p-4 gap-4 | use font round | absolute'>
                    <h2>Oops... You see the bug!</h2>
                    <img src="/images/flowey-min.png" alt="flowey" loading='lazy' height={100} draggable={false} />
                </div>
              )
            }
          </MotionConfig>
        </motion.aside>}
      </AnimatePresence>
    )
}

export function Header() {
  
  const { setClick } = useZustandStore()

  return (
    <header className='flex | justify-between | uppercase text-xs px-8 mt-6 text-slate-800 dark:text-slate-200'>
        LOGIN
        <button
          type='button'
          onClick={() =>
            {
              setClick('login', false)
              setClick('forget', false)
              setClick('forgetSubmit', false)
            }
          }
          className='cursor-pointer'
        >
        <Close className='scale-130' />
        </button>
    </header>
  )
}
export function LogInField() {
  const { click, setClick } = useZustandStore()
  const navigation = useNavigate({ from: '/' })


  const [captchaToken, setCaptchaToken] = useState<string | undefined>(undefined)
  const LoginSchema = object({
    email: pipe(
      string(),
      nonEmpty('Please enter your email.'),
      email('The email address is badly formatted.')
    ),
    password: pipe(
      string(),
      nonEmpty('Please enter your password.'),
      minLength(6, 'Your password must have 6 characters or more.')
    ),
  })
  const login = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: { onSubmitAsync: LoginSchema },
    onSubmit(props) {
      mutate.mutateAsync(props.value)
    }
  })

  const mutate = useMutation(
    {
      mutationKey: ['login'],
      mutationFn: async (data: Login) => {
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
          options: {
            captchaToken: captchaToken
          }
        })
      },
      onSuccess() {
        const authContext = useAuth();
        if (typeof authContext === 'object' && typeof authContext.signIn === 'function') {
          authContext.signIn()
          setTimeout(() => {
            navigation({ to: '/', reloadDocument: true });
          }, 0)
        }
      }
    }
  )

  return (
      <motion.div
        animate={{ opacity: !click.forget && !click.forgetSubmit ? 1 : 0 }}
        style={{ pointerEvents: !click.forget && !click.forgetSubmit ? 'auto' : 'none' }}
        className='flex | justify-center | w-full | mt-1.5 p-4 gap-4 | use font round | absolute'>
        <form 
        method='POST'
        acceptCharset='UTF-8'
        className='flex flex-col | w-full max-w-54 | gap-2 | text-center text-slate-800 dark:text-slate-200'
        onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }}
        >
        <login.Field
            name='email'
            children={( field ) => (
            <>                    
                <label htmlFor="CustomerEmail" className='sr-only'>Email</label>
                <input
                  type='email'
                  id='CustomerEmail'
                  placeholder='Email'
                  autoCorrect='off'
                  autoCapitalize='off'
                  autoFocus
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className='px-3 py-2 | w-full | focus:outline-slate-800 focus:border-slate-800 | border-b-slate-600 dark:border-b-neutral-600 border-b'
                />
                <p className='text-red-500 dark:text-red-400/90 dark:text-shadow-red-400 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                  ? field.state.meta.errors[0] 
                  : field.state.meta.errors[0]?.message || 'An error occurred')
                }
                </p>
            </>
            )}
        >
        </login.Field>
        <login.Field
            name='password'
            children={( field ) => (
            <>
                <label htmlFor="CustomerPassword" className='sr-only'>Password</label>
                <input
                type='password'
                id='CustomerPassword'
                placeholder='Password'
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                className='px-3 py-2 | w-full | focus:outline-slate-800 focus:border-slate-800 | border-b-slate-600 dark:border-b-neutral-600 border-b'
                />
                <p className='text-red-500 dark:text-red-400/90 dark:text-shadow-red-400 text-sm'>
                {field.state.meta.errors.length > 0 && 
                    (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
                </p>
            </>
            )}
        >
        </login.Field>
        <login.Subscribe
            selector={(state) => [state.canSubmit, state.isValidating]}
            children={([canSubmit, isValidating]) => (                
            <input
                type='submit'
                onClick={login.handleSubmit}
                disabled={!canSubmit || isValidating}
                value={!canSubmit || isValidating ? 'SIGNING IN...' : 'SIGN IN'}
                className={`py-2 mt-2 | cursor-pointer rounded-md | text-slate-100 tracking-wide font-medium transition-colors duration-75 ${!canSubmit ? 'bg-slate-400 dark:bg-neutral-400 text-slate-800' : 'bg-slate-950 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:active:bg-neutral-950 dark:hover:text-white/85 dark:active:text-white/60'}`}
            />
            )}
        />
        {mutate.isError && <p className='text-red-500 dark:text-red-400/90 dark:text-shadow-red-400 text-sm'>
              {mutate.error.name} + {mutate.error.message}
          </p>
        }
        <Turnstile
          tabIndex={-1}
          action='login'
          sitekey={import.meta.env.VITE_CLOUDFLARE_SITE_KEY_REGISTER as string}
          onVerify={(token) => {
              setCaptchaToken(token)
          }}
          className='hidden'
        />
        <Link
          to='/account/register'
          onClick={() =>
            {
              setClick('login', false)
            }
          }
          className='opacity-85 | w-fit self-center | text-center text-sm mt-2.5'
        >
            Create account
        </Link>
        <button
            type='button'
            className='opacity-85 | w-fit self-center | text-center text-sm | cursor-pointer'
            onClick={() =>
              {
                setClick('forget', true)
              }
            }
        >
            Forgot your password?
        </button>
        </form>
    </motion.div>
  )
}

export function ForgetField() {
  const { click, setClick } = useZustandStore()

  const [captchaToken2, setCaptchaToken2] = useState<string | undefined>(undefined)

  const ForgetSchema = object({
    email: pipe(
      string(),
      nonEmpty('Please enter your email.'),
      email('The email address is badly formatted.')
    )
  })

  const forget = useForm({
    defaultValues: {
      email: ''
    },
    validators: { onSubmitAsync: ForgetSchema },
    onSubmit(props) { mutate.mutate(props.value) }
  })

  const mutate = useMutation(
    {
      mutationKey: ['forget'],
      mutationFn: async (data: Email) => {
        await supabase.auth.resetPasswordForEmail(data.email, {
          redirectTo: 'https://localhost:3000/account/update-password',
          captchaToken: captchaToken2
        })
      },
      onSuccess() {
        setClick('forgetSubmit', true)
      }
    }
  )

  return (
    <>
    <AnimatePresence>
      {!mutate.isSuccess && <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: click.forget ? 1 : 0 }}
      exit={{ opacity: 0 }}
      style={{ pointerEvents: click.forget ? 'auto' : 'none' }}
      className='flex flex-col | items-center | w-full | p-4 gap-4 | use font round text-center | absolute dark:text-slate-200'>
        <small>RESET YOUR PASSWORD</small>
        <form
          method='POST'
          acceptCharset='UTF-8'
          className='flex flex-col | text-center text-slate-800 dark:text-slate-200'
          onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          }}
        >
          <forget.Field
            name='email'
            children={( field ) => (
              <>
              <label htmlFor="ForgetEmail" className='opacity-90 cursor-text'>We will send an email to <br /> reset your password</label>
              <input
                  type='email'
                  id='ForgetEmail'
                  placeholder='Email'
                  value={click.forget && !click.forgetSubmit ? field.state.value : ''}
                  onChange={e => field.handleChange(e.target.value)}
                  className='px-3 py-2 mt-4 | opacity-85 | focus:outline-slate-800 focus:border-slate-800 | border-b-slate-600 dark:border-b-neutral-600 border-b'
              />
              <p className='text-red-500 dark:text-red-400/90 dark:text-shadow-red-400 text-sm'>
                  {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                      ? field.state.meta.errors[0] 
                      : field.state.meta.errors[0]?.message || 'An error occurred')
                  }
              </p>
              </>
            )}
          />
          <Turnstile
            tabIndex={-1}
            action='recover'
            sitekey={import.meta.env.VITE_CLOUDFLARE_SITE_KEY_REGISTER as string}
            onVerify={(token) => {
              setCaptchaToken2(token)
            }}
            className='hidden'
          />
          <forget.Subscribe
            selector={(state) => [state.canSubmit, state.isValidating]}
            children={([canSubmit, isValidating]) => (  
              <input
                type='submit'
                onClick={forget.handleSubmit}
                disabled={!canSubmit || isValidating}
                value={`${!canSubmit ? 'SUBMITTING...' : 'SUBMIT'}`}
                className={`py-2 mt-4 | opacity-85 | cursor-pointer rounded-md | text-slate-100 tracking-wide font-medium ${!canSubmit ? 'bg-slate-400 dark:bg-neutral-400 text-slate-800' : 'bg-slate-950 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:active:bg-neutral-950 dark:hover:text-white/85 dark:active:text-white/60'}`}
              />
            )}
          />
        </form>
        {mutate.isError && <p className='text-red-500 dark:text-red-400/90 dark:text-shadow-red-400 text-sm'>
            {mutate.error.name} + {mutate.error.message}
        </p>}
        <button
          onClick={() => setClick('forget', false)}
          className='opacity-85 cursor-pointer'>
            Cancel
        </button>
      </motion.div>}
    </AnimatePresence>
    <AnimatePresence>
      {mutate.isSuccess && <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: click.forget ? 1 : 0 }}
      style={{ pointerEvents: click.forget ? 'auto' : 'none' }}
      className='flex flex-col | items-center | w-full | p-4 gap-4 | use font round text-center dark:text-white/90 | absolute'>
        <h4>The link was sent. <br /> Please check your email <br /> (⌐■_■)</h4>
        <button
          onClick={() => {
            {
              setClick('forget', false)
              setClick('forgetSubmit', false)
            }
          }}
          className='opacity-85 cursor-pointer mt-31'>
            Go back
        </button>
      </motion.div>}
    </AnimatePresence>
    </>
  )
}