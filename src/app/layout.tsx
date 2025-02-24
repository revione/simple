import type { Metadata } from "next"
import { Inter } from "next/font/google"
// import "./globals.css"
import "../styles"

import { Provider } from "+redux/Provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rev Play",
  description: "Rev Play Zone"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
