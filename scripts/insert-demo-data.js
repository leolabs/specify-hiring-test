const { PrismaClient } = require("@prisma/client");
const source = require("../seeds.json");

const prisma = new PrismaClient();

(async () => {
  console.log("Clearing the database...");

  // Remove all rows from the database
  await prisma.colorToken.deleteMany({});

  // Insert all rows from the seed file
  console.log("Inserting", source.length, "tokens...");
  await prisma.colorToken.createMany({ data: source });

  prisma.$disconnect();
  console.log("Done 🎉");
})();
