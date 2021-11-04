import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";

/**
 * Creates a new token in the database and returns it as a JSON object
 */
const createColorToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const createdColorToken = await prisma.colorToken.create({
      data: req.body,
    });
    res.status(200).json({ colorToken: createdColorToken });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * Returns all color tokens as a JSON array
 */
const listColorTokens = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const colorTokens = await prisma.colorToken.findMany();
    res.status(200).json({ colorTokens });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await listColorTokens(req, res);
      break;
    case "POST":
      await createColorToken(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
