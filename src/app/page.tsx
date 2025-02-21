"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

import { useRouter } from "next/navigation"

const Home = () => {
  const router = useRouter()

  const login = () => {
    if (
      process.env.NEXT_PUBLIC_DERIV &&
      process.env.NODE_ENV === "development"
    ) {
      router.replace(process.env.NEXT_PUBLIC_DERIV)
    } else {
      alert("was")
      // setTimeout(() => {
      //   window.location.replace(
      //     `${process.env.NEXT_PUBLIC_OAT}${process.env.NEXT_PUBLIC_APP_ID}`
      //   )
      // }, 1000)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("state")
    }
  }, [])

  return (
    <motion.div
      className="flex flex-col min-h-[100vh] w-full justify-between mx-5 h-20"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2,
          delay: 0.5
        }
      }}
    >
      <header className="flex w-full justify-between h-20 items-center">
        <div>Rev Play</div>
        <div className="">
          <a href="https://deriv.com/">
            <Image
              className="w-16 h-16"
              src="/brands/deriv.svg"
              width="16"
              height="16"
              alt="deriv"
            />
          </a>
        </div>
      </header>

      <div className="flex gap-5 justify-center">
        <button className="call-to-action" onClick={login}>
          Log in
        </button>
      </div>

      <footer className="flex flex-col gap-4 h-60 items-center justify-end pb-10">
        <div>Rev Play</div>
      </footer>
    </motion.div>
  )
}

export default Home
