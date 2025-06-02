import { PrismaClient } from "@prisma/client"

import { moods, hoursOfSleep, moodTags, quotes } from "@/lib/data/mood-data"

const prisma = new PrismaClient()

async function main() {
  await prisma.moodTag.createMany({
    data: moodTags.map((item) => ({
      name: item.name,
    })),
  })

  await prisma.mood.createMany({
    data: moods.map((item) => ({
      id: item.id,
      name: item.name,
      label: item.label,
      iconWhite: item.iconWhite,
      iconColor: item.iconColor,
    })),
  })

  await prisma.hoursOfSleep.createMany({
    data: hoursOfSleep.map((item) => ({
      id: item.id,
      name: item.name,
      label: item.label,
    })),
  })

  await prisma.quote.createMany({
    data: quotes.flatMap((item) =>
      item.quotes.map((q) => ({
        quote: q,
        moodId: item.mood,
      }))
    ),
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
