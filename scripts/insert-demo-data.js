const { PrismaClient } = require("@prisma/client");
const source = require("../seeds.json");

const prisma = new PrismaClient();

(async () => {
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
  await prisma.colorToken.createMany({ data: transformedData });

  prisma.$disconnect();
})();
