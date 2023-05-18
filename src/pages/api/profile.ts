// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const token = process.env.token;
type Data = {
  name: string;
};
async function getDataFromApi(symbol: string) {
  const queryParams = new URLSearchParams({
    symbol,
    token: token ? token : "",
  });

  const url = `https://finnhub.io/api/v1/stock/profile2?${queryParams}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let data;
  if (req.query && req.query.symbol && typeof req.query.symbol == "string") {
    data = await getDataFromApi(req.query.symbol);
    if (typeof data == "object") {
      res.status(200).json(data);
    }
  }
}
