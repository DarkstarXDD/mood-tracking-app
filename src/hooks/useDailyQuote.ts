import { useContext } from "react"

import { DailyQuoteContext } from "@/components/home/HomePage"

export default function useDailyQuote() {
  const context = useContext(DailyQuoteContext)
  if (!context) {
    throw new Error(
      "useDailyQuote must be used within a DailyQuoteContext.Provider"
    )
  }
  return context
}
