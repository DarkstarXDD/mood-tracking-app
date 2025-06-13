import { Reddit_Sans } from "next/font/google"

import "./globals.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mood Tracker",
  description:
    "Check out Darkstar's solution for the Mood Tracking App challenge on Frontend Mentor",

  authors: {
    name: "Darkstar",
    url: "https://github.com/DarkstarXDD",
  },

  openGraph: {
    type: "website",
    url: "https://mood-tracker-darkstar.vercel.app/",
    title: "Mood Tracker",

    description:
      "Check out Darkstar's solution for the Mood Tracking App challenge on Frontend Mentor",

    images: {
      url: "https://mood-tracker-darkstar.vercel.app/og-img.jpeg",
      type: "image/jpeg",
      width: 1200,
      height: 630,
    },
  },
}

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-reddit-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${redditSans.variable} font-reddit-sans from-gradient-start to-gradient-end flex min-h-dvh flex-col items-center justify-center bg-linear-to-b from-75% bg-no-repeat px-4 py-8 md:px-8 md:py-10`}
      >
        {children}
      </body>
    </html>
  )
}
