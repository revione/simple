"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { logoutDeriv } from "sockets/buyer/sends"

import logOutIcon from "icons/logOut.svg"

export default function Header() {
  const router = useRouter()

  const logOut = () => {
    localStorage.removeItem("state")
    if (process.env.NODE_ENV === "production") logoutDeriv()
    router.refresh()
    router.push("/")
  }

  return (
    <motion.header
      className="flex w-full justify-between items-center gap-3 font-bold"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2,
          delay: 1
        }
      }}
    >
      <div className="text-xl">Rev Play</div>
      <button onClick={logOut} className="panel-button">
        <Image
          className="w-8 mr-1"
          src={logOutIcon}
          alt="log out"
          width={32}
          height={32}
        />
      </button>
    </motion.header>
  )
}
