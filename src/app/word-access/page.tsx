"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { checkAccessWord } from "actions/checkWord"

const WordAccess = () => {
  const [word, setWord] = useState("")
  const [message, setMessage] = useState<{
    text: string
    type: "success" | "error"
  } | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const [attemptsLeft, setAttemptsLeft] = useState(3)
  const [redirectPath, setRedirectPath] = useState("/deriv") // URL por defecto

  useEffect(() => {
    // Guarda los parámetros de la URL al entrar a la página
    const nextPage = searchParams.get("next")
    if (nextPage) {
      setRedirectPath(`${nextPage}?${searchParams.toString()}`)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await checkAccessWord(word)

    if (response.success) {
      setMessage({ text: response.message, type: "success" })

      setTimeout(() => {
        router.push(redirectPath) // Redirige con los parámetros guardados
      }, 500)
    } else {
      if (attemptsLeft - 1 === 0) {
        setMessage({
          text: "Máximo de intentos alcanzado. Redirigiendo a inicio...",
          type: "error"
        })

        setTimeout(() => {
          router.replace("/") // Redirige a home sin los parámetros
        }, 1000)
      } else {
        setMessage({
          text: `${response.message} Intentos restantes: ${attemptsLeft - 1}`,
          type: "error"
        })
        setAttemptsLeft(prev => prev - 1) // Reduce los intentos
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 py-6">
      <h1 className="text-2xl font-semibold mb-4">
        Introduce la palabra de acceso
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={word}
          onChange={e => {
            setWord(e.target.value)
            setMessage(null)
          }}
          placeholder="Escribe la palabra..."
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Acceder
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 font-semibold ${message.type === "success" ? "text-green-500" : "text-red-500"}`}
        >
          {message.text}
        </p>
      )}
    </div>
  )
}

export default WordAccess
