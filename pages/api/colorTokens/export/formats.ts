import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "../../../../types/api";
import { Parser, parsers } from "../../../../util/parsers";

export type ParserFormat = Omit<Parser, "parse"> & { format: string };

export interface FormatList {
  formats: ParserFormat[];
}

/** Lists all supported parser formats and their metadata */
const listFormats = (req: NextApiRequest, res: ApiResponse<FormatList>) => {
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
