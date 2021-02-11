import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Layout from '../components/layout'

import { Magic } from 'magic-sdk'

const Login = () => {
  useUser({ redirectTo: '/course', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value,
    }

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
      })
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/course')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <Layout>
      <div className="login">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col space-y-2">
            <span>E-mail address</span>
            <input
              className="max-w-xs border p-1 rounded focus:no-outline focus:ring focus:ring-indigo-300"
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              required
            />
            <span className=" text-sm text-gray-500">
              It must be the e-mail address used during the purchase.
            </span>
          </label>

          <div className="submit">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>

          {errorMsg && <p className=" text-red-600">{errorMsg}</p>}
        </form>
      </div>
    </Layout>
  )
}

export default Login
