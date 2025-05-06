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
    url: "https://mood-tracker-darkstarxdd.vercel.app/",
    title: "Mood Tracker",

    description:
      "Check out Darkstar's solution for the Mood Tracking App challenge on Frontend Mentor",

    images: {
      url: "https://mood-tracker-darkstarxdd.vercel.app/og-img.jpeg",
      type: "image/jpeg",
      width: 1440,
      height: 756,
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
        className={`${redditSans.variable} font-reddit-sans bg-zinc-800 text-white`}
      >
        {children}
      </body>
    </html>
  )
}
