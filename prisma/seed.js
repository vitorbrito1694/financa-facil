import { prisma } from "./client";

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "Vitor Brito", email: "vitoraraujo1694@gmail.com" },
      { name: "Raquel Brito", email: "quellcarvalho97@gmail.com" },
    ],
  });
}

main()
  .then(() => {
    console.log("Seed completo.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().then(() => process.exit(1));
  });
