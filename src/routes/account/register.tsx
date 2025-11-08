// Tanstack Form: https://www.youtube.com/watch?v=Pf1qn35bgjs
// Firebase: https://www.youtube.com/watch?v=re-T7nU0SHM
import { useForm } from '@tanstack/react-form'
import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { any, boolean, email, minLength, nonEmpty, object, pipe, regex, string, value } from 'valibot'
import { useState } from 'react'
import Turnstile from 'react-turnstile'
import { useStore } from 'zustand'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/supabase/supabase'
import { useCountryCodeStore } from "@/zustand/countryCode-slice"

type LogUp = {
  first: string;
  last: string;
  email: string;
  password: string;
  checked: boolean; 
  country: string
}

export const Route = createFileRoute('/account/register')({
  component: Register,
  beforeLoad({ context }) {
    const authentication = context.authentication
    if (authentication && typeof authentication.isLogged === 'function') {
      const { isLogged } = authentication
      if (isLogged()) throw redirect({ to: "/" })
    }
  }
})

function Register() {
  const countryCode = useStore(useCountryCodeStore, state => state.countryCode)
  const [captchaToken, setCaptchaToken] = useState<string | undefined>(undefined)

  const RegisterSchema = object({
    first: pipe(
      string(),
      nonEmpty('Please add your First name.'),
      regex(/^[A-Za-zÀ-ÿ\s'-]+$/, 'Invalid name format')
    ),
    last: string(),
    email: pipe(
      string(),
      nonEmpty('Please add your email.'),
      email('The email address is badly formatted.')
    ),
    password: pipe(
      string(),
      nonEmpty('Please add your password.'),
      minLength(6, 'Your password must have 6 characters or more.')
    ),
    checked: pipe(
      boolean(),
      value(true, 'Checkbox is required')
    ),
    country: any()
  })
  const form = useForm({
    defaultValues: {
      first: '',
      last: '',
      email: '',
      password: '',
      checked: false,
      country: countryCode,
    },
    validators: {
      onSubmitAsync: RegisterSchema
    },
    onSubmit: (props) => {
      registerMutation.mutateAsync(props.value)
    },
  })

  const registerMutation = useMutation(
    {
      mutationKey: ['register'],
      mutationFn: async (data: LogUp) => {
        await Promise.all([
          fetch('https://api-billowing-wildflower-2154.fly.dev/create-account', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          }),
          supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
              data: {
                first_name: data.first,
                last_name: data.last
              },
              captchaToken: captchaToken,
            },
          })
        ])
      },
    },
  )

  return (
    <main className='w-full h-[90dvh] lg:h-fit | flex flex-col | items-center | text-center | py-2 | text-slate-800/85 dark:text-neutral-200'>
      {!registerMutation.isSuccess && 
      <>
        <small>CREATE ACCOUNT</small>
        <form
          action="POST"
          className='w-3/4 max-w-xl | flex flex-col | items-center | mt-4'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <form.Field
            name="first"
            children={( field ) => (
              <>
                <label htmlFor="CustomerFirstName" className='sr-only'>First Name</label>
                <input
                  type='text'
                  id='CustomerFirstName'
                  placeholder='First name'
                  pattern='^[A-Za-z\s]+$'
                  autoCorrect='off'
                  autoFocus
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className='w-full p-2 py-2 | block | focus:outline-slate-800 focus:border-slate-800 dark:focus:outline-neutral-600 dark:focus:border-neutral-600 | border-b border-b-slate-200 dark:border-b-neutral-400'
                />
                <p className='text-red-500 dark:text-red-400/80 text-sm'>
                  {field.state.meta.errors.length > 0 && 
                    (typeof field.state.meta.errors[0] === 'string' 
                      ? field.state.meta.errors[0] 
                      : field.state.meta.errors[0]?.message || 'An error occurred')
                  }
                </p>
              </>
            )} />
          <form.Field
            name="last"
            children={(field) => (
              <>            
                <label htmlFor="CustomerLastName" className='sr-only'>Last Name</label>
                <input
                  type='text'
                  id='CustomerLastName'
                  placeholder='Last name'
                  pattern='^[A-Za-z\s]+$'
                  autoCorrect='off'
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className='w-full p-2 mt-4 | block | focus:outline-slate-800 focus:border-slate-800 dark:focus:outline-neutral-600 dark:focus:border-neutral-600 | border-b border-b-slate-200 dark:border-b-neutral-400'
                />
              </>
            )}
          />
          <form.Field
            name="email"
            children={(field) => (
              <>
                <label htmlFor="CustomerEmail" className='sr-only'>Email</label>
                <input
                  type='email'
                  id='CustomerEmail'
                  placeholder='Email'
                  autoCorrect='off'
                  autoCapitalize='off'
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className='w-full p-2 mt-4 | block | focus:outline-slate-800 focus:border-slate-800 dark:focus:outline-neutral-600 dark:focus:border-neutral-600 | border-b border-b-slate-200 dark:border-b-neutral-400'
                />
                <p className='text-red-500 dark:text-red-400/80 text-sm'>
                  {field.state.meta.errors.length > 0 && 
                    (typeof field.state.meta.errors[0] === 'string' 
                      ? field.state.meta.errors[0] 
                      : field.state.meta.errors[0]?.message || 'An error occurred')
                  }
                </p>
              </>
            )}
          />
          <form.Field
            name="password"
            validators={{
              onChangeAsyncDebounceMs: 400,
              onChangeAsync: ({ value: s }) =>
                s.length < 6 &&
                "Password must be at least 6 characters long"
            }}
            children={(field) => (
              <>
                <label htmlFor="CustomerPassword" className='sr-only'>Password</label>
                <input
                  type='password'
                  id='CustomerPassword'
                  placeholder='Password'
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className='w-full p-2 mt-4 | block | focus:outline-slate-800 focus:border-slate-800 dark:focus:outline-neutral-600 dark:focus:border-neutral-600 | border-b border-b-slate-200 dark:border-b-neutral-400'
                  />
                  <p className='text-red-500 dark:text-red-400/80 text-sm'>
                    {field.state.meta.errors.length > 0 && 
                      (() => {
                        const firstError = field.state.meta.errors[0];
                        if (typeof firstError === 'string') {
                          return firstError
                        } else if (firstError && 'message' in firstError) {
                          return firstError.message
                        }
                        return 'An error occurred'
                      })()
                    }
                  </p>
              </>
            )}
          />
          <Turnstile
            action='register'
            sitekey={import.meta.env.VITE_CLOUDFLARE_SITE_KEY_REGISTER as string}
            className='mt-1.5'
            onVerify={(token) => {
              setCaptchaToken(token)
            }}
          />
          <form.Field
            name="checked"
            children={(field) => (
              <>
              <label htmlFor="Policy" className='cursor-pointer w-full text-left | inline-flex | justify-start items-center | my-2 dialog:my-4 gap-2 | text-shadow-xl select2'>
                <input
                  id='Policy'
                  type='checkbox'
                  checked={field.state.value}
                  aria-checked={field.state.value}
                  onChange={e => field.handleChange(e.target.checked)}
                  className="py-2"
                />
                <span>
                  By click this checkbox, you agreed our <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" className='text-slate-600 dark:text-slate-200 decoration-2 underline-offset-2 underline shadow-2xs | dark:visited:text-slate-200 dark:visited:text-shadow-slate-200 visited:text-slate-900 visited:text-shadow-slate-900'>Terms & Condition</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className='text-slate-600 dark:text-slate-200 decoration-2 underline-offset-2 underline shadow-2xs | dark:visited:text-slate-200 dark:visited:text-shadow-slate-200 visited:text-slate-900 visited:text-shadow-slate-900'>Privacy Policy</a>
                </span>
              </label>
              <p className='text-red-500 dark:text-red-400/80 text-sm'>
                {field.state.meta.errors.length > 0 && 
                  (typeof field.state.meta.errors[0] === 'string' 
                    ? field.state.meta.errors[0] 
                    : field.state.meta.errors[0]?.message || 'An error occurred')
                }
              </p>
              </>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isValidating]}
            children={([canSubmit, isValidating]) => (
              <input
                type='submit'
                onClick={form.handleSubmit}
                disabled={!canSubmit || isValidating}
                value={`${!canSubmit || isValidating ? 'SUBMIT...' : 'CREATE'}`}
                className={`w-full py-2 mt-4 | block | cursor-pointer | rounded-md | text-slate-100 tracking-wide font-medium ${!canSubmit || isValidating ? 'bg-slate-400 dark:bg-neutral-400 text-slate-800 dark:text-neutral-800' : 'bg-slate-950 dark:bg-neutral-600'}`}
              />
            )}
          />
          {registerMutation.isError && <p className='text-red-500 dark:text-red-400/80 text-sm mt-4'>
            {registerMutation.error.name}: {registerMutation.error.message}
          </p>}
        </form>
      </>
      }
      {registerMutation.isSuccess && (
        <>
          <h2 className='text-xl pt-4'>Welcome, {form.state.values.first}</h2>
          <h3 className='mt-2 mb-4'>Have a nice day! ( ˘▽˘)っ♨</h3>
          <h4 className='mt-2'>Thank You for finishing signup form patiently.</h4>
          <h5 className='mb-4'>Before Sign in, <b><>please open the Verification email</></b> to use our service</h5>
        </>
      )}
      <Link to="/" className='mt-4'>Return to store</Link>
    </main>
  )
}
