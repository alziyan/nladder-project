// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const token = process.env.token;
type Data = {
  name: string;
};
async function getDataFromApi(symbol: string) {
  const queryParams = new URLSearchParams({
    symbol: symbol,
    token: token ? token : "",
  });
  const res = await fetch(`https://finnhub.io/api/v1/quote?${queryParams}`);

  const json = await res.json();
  return json;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let data;
  console.log("type", typeof req.query.symbol);
  if (req.query && req.query.symbol && typeof req.query.symbol == "string") {
    data = await getDataFromApi(req.query.symbol);
    if (typeof data == "object") {
      res.status(200).json(data);
    }
  }
}
