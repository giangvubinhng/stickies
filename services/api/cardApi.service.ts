import { PrismaClient } from '@prisma/client';
import { ServerResponse } from '@/interfaces/api/IAPI'
import { ICardInput } from '@/interfaces/ICard';

const prisma = new PrismaClient()

async function findCardsByUserEmail(user_email: string | null | undefined): Promise<ServerResponse> {
  if (user_email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: user_email
        }
      })
      const user_id = user?.id
      return findCardsByUserId(user_id)
    }
    catch (e: unknown) {
      if (e instanceof Error) {
        return {
          message: `An error occurred: ${e.message}`,
          success: false
        }
      }
      else {
        return {
          message: `An unexpected error occurred`,
          success: false
        }
      }
    }
  }
  else {
    return {
      message: `User's email does not exist`,
      success: false
    }

  }
}

async function findCardById(card_id: string) {
  try {
    const card = await prisma.card.findUnique({
      where: {
        id: card_id
      }
    })
    return { data: card, success: true, message: 'Card fetched successfully' }
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      return {
        message: `An error occurred: ${e.message}`,
        success: false
      }
    }
    else {
      return {
        message: `An unexpected error occurred`,
        success: false
      }
    }
  }

}

async function findCardsByUserId(user_id?: string) {
  if (!user_id) {
    return {
      message: `No user id found`,
      success: false
    }
  }
  try {
    const cards = await prisma.card.findMany({
      where: {
        id: user_id
      }
    })
    return { data: cards, success: true, message: 'Cards fetched successfully' }
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      return {
        message: `An error occurred: ${e.message}`,
        success: false
      }
    }
    else {
      return {
        message: `An unexpected error occurred`,
        success: false
      }
    }
  }
}

async function create(user_email: string | null | undefined, card: ICardInput) {
  if (user_email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: user_email
        }
      })
      if (user && user.id) {
        const result = prisma.card.create({
          data: {
            ...card,
            userId: user.id
          }
        })
        return {
          data: result,
          message: `Data created successfully`,
          success: true
        }

      }
      return {
        message: `No user id found`,
        success: false
      }

    }
    catch (e: unknown) {
      if (e instanceof Error) {
        return {
          message: `An error occurred: ${e.message}`,
          success: false
        }
      }
      else {
        return {
          message: `An unexpected error occurred`,
          success: false
        }
      }
    }

  }
  else {
    return {
      message: `User's email does not exist`,
      success: false
    }

  }

}

const cardApiService = {
  findCardsByUserEmail,
  findCardById,
  findCardsByUserId,
  create
}



export default cardApiService
