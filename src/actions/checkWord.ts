"use server"

import { cookies } from "next/headers"

const MAX_ATTEMPTS = 3
const ACCESS_WORD = process.env.SECRET_WORD

export async function checkAccessWord(
  word: string
): Promise<{ success: boolean; message: string }> {
  const cookiesStore = cookies()
  let attemptsLeft =
    Number(cookiesStore.get("attemptsLeft")?.value) || MAX_ATTEMPTS

  if (attemptsLeft <= 0) {
    return {
      success: false,
      message: "Máximo de intentos alcanzado. Redirigiendo a inicio..."
    }
  }

  if (word.toLowerCase() === ACCESS_WORD) {
    cookiesStore.set("attemptsLeft", MAX_ATTEMPTS.toString()) // Restablecer intentos si acierta
    return { success: true, message: "Acceso concedido. Redirigiendo..." }
  } else {
    attemptsLeft -= 1
    cookiesStore.set("attemptsLeft", attemptsLeft.toString()) // Guardar intentos en cookies

    if (attemptsLeft === 0) {
      return {
        success: false,
        message: "Máximo de intentos alcanzado. Redirigiendo a inicio..."
      }
    }

    return {
      success: false,
      message: `Palabra incorrecta. Intentos restantes: ${attemptsLeft}`
    }
  }
}
