import { useForm } from '@tanstack/react-form'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { minLength, nonEmpty, object, pipe, string } from 'valibot'
import { useEffect } from 'react'
import { useStore } from 'zustand'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/supabase/supabase'
import { useZustandStore } from '@/zustand/main'

export const Route = createLazyFileRoute('/account/update-password')({
  component: Forget
})

function Forget() {
  const navigate = useNavigate({ from: "/" })
  const name = useStore(useZustandStore, state => state.first_name)

  const ForgetSchema = object({
    password: pipe(
      string(),
      nonEmpty('Please add your password.'),
      minLength(6, 'Your password must have 6 characters or more.')
    ),
  })
  const form = useForm({
    defaultValues: {
      password: ''
    },
    validators: {
      onSubmitAsync: ForgetSchema
    },
    onSubmit(props) {
      supabase_password.mutate(props.value)
    }
  })

  const supabase_password = useMutation(
    {
      mutationKey: ['supabase_updating'],
      mutationFn: (data: { password: string }) => new Promise(() => {
        supabase.auth.onAuthStateChange((event, _session) => {
          if (event === "PASSWORD_RECOVERY") {
            supabase.auth.updateUser({
              password: data.password
            })
          }
        })
      })
    }
  )

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) return
      navigate({ to: "/" })
    })
    return () => data.subscription.unsubscribe()
  }, [])

  return (
    <main className='w-full h-fit | flex flex-col justify-center items-center | pt-4 pb-8 lg:pb-8 lg:pt-2 px-8 lg:px-44 | text-slate-600 dark:text-neutral-200'>
      {
        supabase_password.isSuccess && (
          <>
            <h2>Hey, {name}</h2>
            <h3 className='mt-1'>Next time, Please use your account carefully</h3>
            <h4 className='mt-3'>ヾ(￣□￣;)ﾉ</h4>
          </>
        )
      }
      {!supabase_password.isSuccess && (
      <>
        <small className='text-center text-[calc(8px+0.4vmin)] | w-full | mb-4'>RESET</small>
        <form
          action="POST"
          className='w-3/4 max-w-xl | flex flex-col | items-center | mt-4'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <form.Field
            name="password"
            validators={{
              onChangeAsyncDebounceMs: 400,
              onChangeAsync: ({ value }) =>
                value.length < 6 &&
                "Password must be at least 6 characters long"
            }}
            children={( field ) => (
              <>
                <label htmlFor='CustomForget' className='sr-only'>Password</label>
                <input
                  type='password'
                  id='CustomForget'
                  placeholder='Password'
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className='w-full p-2 py-2 | block | focus:outline-slate-800 focus:border-slate-800 | border-b border-b-slate-200 dark:border-b-neutral-800'
                />
                <p className='text-red-500 dark:text-red-400/80 dark:mt-4 text-sm'>
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
          <form.Subscribe
            selector={(state) => [state.canSubmit]}
            children={([canSubmit]) => (
              <input
                type='submit'
                onClick={form.handleSubmit}
                disabled={!canSubmit}
                value={'CHANGE'}
                className={`w-full py-2 mt-4 | block | cursor-pointer | rounded-md | text-slate-100 tracking-wide font-medium ${!canSubmit ? 'bg-slate-400 text-slate-800 dark:text-neutral-400/80 dark:bg-neutral-800' : 'bg-slate-950 dark:bg-neutral-950'}`}
              />
            )}
          />
        </form>
      </>
    )}
    </main>
  )
}
