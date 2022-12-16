import { Card, PrismaClient, Task } from '@prisma/client';
import { ServerResponse } from '@/interfaces/api/IAPI'
import { ICard, ICardInput, ISingleList } from '@/interfaces/ICard';

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
      return await findCardsByUserId(user_id)
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
        userId: user_id
      }
    })
    const convertedCards: ICard[] = [];

    for (const card of cards) {
      const tasksList = await prisma.task.findMany({
        where: {
          cardId: card.id
        }
      })
      const convertedCard = mapToServerResponse(card, tasksList)
      convertedCards.push(convertedCard)

    }
    return { data: convertedCards, success: true, message: 'Cards fetched successfully' }
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

async function create(user_email: string | null | undefined, original_card: ICardInput) {
  if (user_email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: user_email
        }
      })
      if (user && user.id) {
        const card = {
          header: original_card.header,
          userId: user.id
        }
        const cardResult = await prisma.card.create({
          data: card
        })

        const tasksList: any = original_card.tasks.map((x) => {
          return { cardId: cardResult.id, title: x.title, description: x.description }
        })

        await prisma.task.createMany({
          data: tasksList
        })

        const tasksResult = await prisma.task.findMany({
          where: {
            cardId: cardResult.id
          }
        })

        const result = mapToServerResponse(cardResult, tasksResult)

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

async function edit(req_card: ICard, card_id: string) {
  
  try{

    // update card
    const updatedCard = await prisma.card.update({
      where: {
        id: card_id
      },
      data: {
        header: req_card.header
      }
    })

    //create task_id_list
    const taskIdList: string[] = []
    req_card.tasks.forEach((item) => {

      if (item.id) {
        taskIdList.push(item.id)
      }

    })

    // get all tasks belong to card
    const tasksFromDb = await prisma.task.findMany({
      where: {
        cardId: req_card.id

      }
    })

    // Delete the ones not in the taskIdList
    const toBeDeletedTasks = tasksFromDb.filter(i => !taskIdList.includes(i.id))
    for (const task of toBeDeletedTasks) {
      await prisma.task.delete({
        where: {
          id: task.id
        }
      })
    }
    // edit or add the rest
    for (const obj of req_card.tasks) {
      await prisma.task.upsert({
        create: {
          cardId: req_card.id,
          title: obj.title,
          description: obj.description
        },
        update: {
          cardId: req_card.id,
          title: obj.title,
          description: obj.description
        },
        where: {
          id: obj.id ? obj.id : '-1nonexist'
        }
      })

    }

    // get all tasks belong to card
    const updatedTasks = await prisma.task.findMany({
      where: {
        cardId: req_card.id
      }
    })

    const data = mapToServerResponse(updatedCard, updatedTasks);

    return {data: data, success: true, message: "Card updated successfully"};

  }
  catch(e: unknown){
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

function mapToServerResponse(card: Card, tasks: Task[]): ICard {
  const convertedTask: ISingleList[] = tasks.map((e) => {
    return {
      id: e.id,
      cardId: card.id,
      title: e.title === null ? undefined : e.title,
      description: e.description === null ? undefined : e.description
    }
  })

  return {
    id: card.id,
    header: card.header === null ? undefined : card.header,
    tasks: convertedTask
  }
}


const cardApiService = {
  findCardsByUserEmail,
  findCardById,
  findCardsByUserId,
  create,
  edit
}



export default cardApiService
