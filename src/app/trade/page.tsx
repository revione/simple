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

import "./Trade.css"
import { Market } from "./fragments/Options/fragments/Market"

const AfterTrade = () => {
  usePreset()
  return <Trade />
}

export default AfterTrade

const Trade = () => {
  useActiveBuyer()
  return (
    <div className={`trade flex flex-col gap-2 my-5 items-center mx-10`}>
      <Header />
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 2,
            delay: 1,
          },
        }}
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
