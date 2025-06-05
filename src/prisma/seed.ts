import { prisma } from "../lib/prisma.js";

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "Vitor Brito", email: "vitoraraujo1694@gmail.com" },
      { name: "Raquel Brito", email: "quellcarvalho97@gmail.com" },
    ],
    skipDuplicates: true,
  });

  const newUser = await prisma.user.findMany();

  await prisma.paymentMethod.createMany({
    data: [
      {
        name: "BTG",
        description: "Cartão de Crédito BTG",
        type: "CREDIT_CARD",
        userId: newUser[0].id,
      },
      {
        name: "ITAÚ",
        description: "Cartão de Crédito Itaú",
        type: "CREDIT_CARD",
        userId: newUser[0].id,
      },
      {
        name: "Débito",
        type: "DEBIT_CARD",
        userId: newUser[0].id,
      },
      {
        name: "Pix",
        type: "PIX",
        userId: newUser[0].id,
      },
    ],
    skipDuplicates: true,
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
