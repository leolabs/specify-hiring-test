import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";

/**
 * Returns all color tokens as a JSON array
 */
const getColorToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const colorToken = await prisma.colorToken.findUnique({
      where: { id: req.query.tokenId as string },
    });

    if (!colorToken) {
      res.status(404).json({ message: "Color token not found" });
    } else {
      res.status(200).json({ colorToken });
    }
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
      await getColorToken(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
