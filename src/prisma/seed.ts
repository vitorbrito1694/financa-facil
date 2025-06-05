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
        name: "Btg",
        description: "Cartão de Crédito BTG",
        type: "CREDIT_CARD",
        userId: newUser[0].id,
      },
      {
        name: "Itaú",
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

  await prisma.category.createMany({
    data: [
      {
        name: "Alimentação",
        type: "EXPENSE",
        userId: newUser[0].id,
      },
      {
        name: "Transporte",
        type: "EXPENSE",
        userId: newUser[0].id,
      },
      {
        name: "Saúde",
        type: "EXPENSE",
        userId: newUser[0].id,
      },
      {
        name: "Outros",
        type: "EXPENSE",
        userId: newUser[0].id,
      },
      {
        name: "Salário",
        type: "INCOME",
        userId: newUser[0].id,
      },
      {
        name: "Dev",
        type: "INCOME",
        userId: newUser[0].id,
      },
      {
        name: "PLR/Férias",
        type: "INCOME",
        userId: newUser[0].id,
      },
      {
        name: "Outras",
        type: "INCOME",
        userId: newUser[0].id,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.account.createMany({
    data: [
      {
        name: "Carteira",
        type: "CASH",
        userId: newUser[0].id,
        balance: 0,
      },
      {
        name: "Conta Poupança",
        type: "SAVINGS_ACCOUNT",
        userId: newUser[0].id,
        balance: 0,
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
