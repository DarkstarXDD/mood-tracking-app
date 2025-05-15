import { PrismaClient } from "@prisma/client"

import { moodTags } from "@/data/mood-tags"

const prisma = new PrismaClient()

async function main() {
  await prisma.moodTag.createMany({
    data: moodTags.map((item) => ({
      name: item.name,
    })),
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
