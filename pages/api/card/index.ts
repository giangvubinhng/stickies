import { NextApiRequest, NextApiResponse } from 'next'
import Methods from '@/enums/methods'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import cardApiService from '@/services/api/cardApi.service'
import { ServerResponse } from '@/interfaces/api/IAPI';
import { ICardInput } from '@/interfaces/ICard'



async function handleGet(user_email: string | undefined | null): Promise<ServerResponse> {
  return await cardApiService.findCardsByUserEmail(user_email);
}

async function handlePost(user_email: string | undefined | null, card: ICardInput) {
  return await cardApiService.create(user_email, card);

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  // If user is not authenticated
  if (!session) {
    res.status(401).json({ message: "You mus be logged in", success: false })
    return;
  }
  else {
    // get user's email
    const userEmail = session.user?.email
    // if it's a post request
    if (req.method === Methods.POST) {
      const result = await handlePost(userEmail, req.body)
      if (result.success) {
        return res.json(result)
      }
      else {
        return res.status(400).json(result)
      }

    }
    // if it's a get request
    else if (req.method === Methods.GET) {
      const result = await handleGet(userEmail)
      if (result.success) {
        return res.json(result)
      }
      else {
        return res.status(400).json(result)
      }

    }
    return res.status(400).json({success: false, message: "api not found"})
    
  }
}

