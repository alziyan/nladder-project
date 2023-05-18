// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data.json";

type data = {
  values: [];
};
type option = {
  value: string;
  label: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const symbols: option[] = [];
  //ts-expect-error
  data.values.forEach((item) => {
    symbols.push({ value: item.displaySymbol, label: item.displaySymbol });
  });
  res.status(200).json({ symbols });
}
