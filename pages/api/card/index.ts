import { NextApiRequest, NextApiResponse } from 'next'
import Methods from '@/enums/methods'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === Methods.POST) {
    res.status(200).json({ name: 'John Doe' })
  }
  if (req.method === Methods.GET) {
    res.status(200).json({ name: 'Giang Nguyen' })
  }
}

