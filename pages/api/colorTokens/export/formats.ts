import { NextApiRequest, NextApiResponse } from "next";
import { parsers } from "../../../../util/parsers";

/** Lists all supported parser formats and their metadata */
const listFormats = (req: NextApiRequest, res: NextApiResponse) => {
  const formats = Object.entries(parsers).map(([key, value]) => {
    const { parse, ...meta } = value;

    return {
      format: key,
      ...meta,
    };
  });

  res.status(200).json({
    formats,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      listFormats(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
