"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { checkWord } from "actions/checkWord"

const AccessPage = () => {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const result = await checkWord(input)
    if (result.success) {
      router.push("/deriv" + window.location.search)
    } else {
      if (result.redirect) {
        setMessage("Too many attempts. Redirecting...")
        router.push("/")
      } else {
        setMessage("Incorrect word. Try again.")
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 py-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter the secret word"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
        />

        <button type="submit" className="call-to-action ">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  )
}

export default AccessPage
