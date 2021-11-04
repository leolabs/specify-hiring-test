import { NextApiRequest, NextApiResponse } from "next";
import { parsers } from "../../../../util/parsers";
import prisma from "../../../../util/prisma";
import { dbToColorToken } from "../../../../util/schemas/colorToken";

/**
 * Exports all color tokens to a given format.
 * Downloads the file if you pass it a "download" param.
 */
const exportColorTokens = async (req: NextApiRequest, res: NextApiResponse) => {
  const parser = parsers[req.query.format as string];

  if (!parser) {
    res.status(400).json({
      message:
        "Missing or invalid type query parameter. Currently supported: " +
        Object.keys(parsers).join(", "),
    });
    return;
  }

  const dbColorTokens = await prisma.colorToken.findMany();
  const colorTokens = dbColorTokens.map(dbToColorToken);
  const parsed = parser.parse(colorTokens);

  if ("download" in req.query) {
    // This tells the browser to download the
    // file instead of showing its contents.
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${parser.fileName}"`
    );
  }

  res.setHeader("Content-Type", parser.mimeType).send(parsed);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await exportColorTokens(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
