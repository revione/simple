"use server"

let attemptCounter = 0
const MAX_ATTEMPTS = 3

export async function checkWord(word: string) {
  const secretWord = process.env.SECRET_WORD

  if (word === secretWord) {
    attemptCounter = 0
    return { success: true }
  } else {
    attemptCounter += 1
    if (attemptCounter >= MAX_ATTEMPTS) {
      attemptCounter = 0
      return { success: false, redirect: true }
    }
    return { success: false, redirect: false }
  }
}
