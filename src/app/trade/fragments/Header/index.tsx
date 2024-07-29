import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { logoutDeriv } from "sockets/buyer/sends"

import logOutIcon from "icons/logOut.svg"

export default () => {
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem("state")
    if (import.meta.env.PROD) logoutDeriv()
    navigate(0)
    navigate("/", { replace: true })
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
        <img className="w-8 mr-1" src={logOutIcon} alt="log out" />
      </button>
    </motion.header>
  )
}
