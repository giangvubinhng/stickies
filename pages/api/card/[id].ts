import type { NextApiRequest, NextApiResponse } from 'next'
import Methods from '@/enums/methods'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import cardApiService from '@/services/api/cardApi.service'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  // If user is not authenticated
  if (!session) {
    res.status(401).json({ message: "You mus be logged in", success: false })
    return;
  }

  else {
    if (req.method === Methods.PUT || req.method === Methods.POST) {
      const result = await cardApiService.edit(req.body, req.query.id as string)
      console.log(result)
      return res.json(result)
    }
  }
  return res.status(400).json({ success: false, message: "api not found" })
}
