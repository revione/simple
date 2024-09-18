"use client"

import { motion } from "framer-motion"

import Header from "./fragments/Header"

import { Information } from "./fragments/Information"
import Purchases from "./fragments/Purchases"
import ChartData from "./fragments/ChartData"
import DropDown from "./fragments/DropDown"
import { SocketsStatus } from "./fragments/SocketsStatus"
import { ButtonPanel } from "./fragments/ButtonPanel"
import { Options } from "./fragments/Options"
import { usePreset } from "./fragments/usePreset"

import { useActiveBuyer } from "./fragments/useActiveBuyer"

import { Market } from "./fragments/Options/fragments/Market"

import "./Trade.css"

const BeforeLoadTrade = () => {
  usePreset()
  return <Trade />
}

export default BeforeLoadTrade

const Trade = () => {
  useActiveBuyer()
  return (
    <div className={`trade flex flex-col gap-2 py-5 items-center px-10 w-full`}>
      <Header />
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 2, delay: 1 } }}
      >
        <div>
          <div className="flex items-center w-full">
            <DropDown label="Market">
              <Market />
              <ChartData />
            </DropDown>
          </div>

          <DropDown label="Information">
            <Options />
            <Information />
          </DropDown>

          <DropDown label="Trades">
            <Purchases />
          </DropDown>
        </div>

        <div>
          <SocketsStatus />
          <ButtonPanel />
        </div>
      </motion.div>
    </div>
  )
}
