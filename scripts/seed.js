const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'shihabulislam.ugv@gmail.com' },
    update: { password: hashedPassword },
    create: {
      email: 'shihabulislam.ugv@gmail.com',
      password: hashedPassword,
    },
  })
  
  console.log({ user1, user2 })
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
