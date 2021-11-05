const { PrismaClient } = require("@prisma/client");
const source = require("../seeds.json");

const prisma = new PrismaClient();

(async () => {
  console.log("Clearing the database...");

  // Remove all rows from the database
  await prisma.colorToken.deleteMany({});

  const transformedData = source.map((colorToken) => ({
    name: colorToken.name,
    colorRed: colorToken.value.r,
    colorGreen: colorToken.value.g,
    colorBlue: colorToken.value.b,
    colorAlpha: colorToken.value.a,
    meta: colorToken.meta,
  }));

  // Insert all rows from the seed file
  console.log("Inserting", transformedData.length, "tokens...");
  await prisma.colorToken.createMany({ data: transformedData });

  prisma.$disconnect();
  console.log("Done 🎉");
})();
