"use client"

import { useRouter } from "next/navigation";
import useRequest from "../hooks/useRequest"
import { useState } from "react";
import Icons from "../components/Icons";
import useAuth from '../hooks/useAuth'

export default function Home() {
  const router = useRouter();

  const auth = useAuth();
  const request = useRequest();

  const [error, setError] = useState({
    status: false,
    message: ""
  })
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading ] = useState(false)

  const userLogin = async() => {
    setLoading(true)
    try {
      await auth.login(input.email,input.password)
      setLoading(loading)
    } catch (error) {
      console.log(error);
      setError({
        status:true,
        message: error.message
      })

    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={(event) => {
                    setInput({
                      email: event.target.value,
                      password: input.password
                    });
                  }}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6 px-1.5 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-black hover:text-neutral-900">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={input.password}
                  onChange={(event) => {
                    setInput({
                      email: input.email,
                      password: event.target.value
                    });
                  }}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 px-1.5 font-medium"
                />
              </div>
            </div>

            <div>
              {error.status ? <span className="text-sm text-center text-red-600 font-bold">
                {error.message}
              </span> : <span></span>}
              <button
                onClick={userLogin}
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {loading ? <div className="animate-spin">
                  <Icons.loader className="w-5 h-5 fill-white"/>
                </div>: <span>Sign In</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
