import { ICard, ISingleList, ICardInput, ITaskInput } from '../interfaces/ICard';
import localStorageService from './localStorage.service';

// Constants
const LOCAL_KEY_ITEM_NOTES = "stickieNoteItems"

function getCardLocal(): ICard[] {
  return localStorageService.getItem(LOCAL_KEY_ITEM_NOTES).state.cards || [];
}
function setCardLocal(newValues: ICard[]): void {
  localStorageService.setItem(LOCAL_KEY_ITEM_NOTES, newValues)
}
function addCardLocal(newItem: ICardInput): ICard[] {
  const cards = getCardLocal();
  const newCardId = (cards.length + 1).toString()

  const mappedCard: ICard = { id: newCardId, list: [] };

  const taskListWithId: ISingleList[] = newItem.list.map((e: ITaskInput, i: number) => {
    const anObj: ISingleList = {
      id: i.toString(),
      card_id: newCardId,
      title: e.title,
      description: e.description
    }
    return anObj

  })

  mappedCard.header = newItem.header;
  mappedCard.list = taskListWithId
  const updatedCards = [...cards, mappedCard]
  return updatedCards;
}
function deleteCardLocal(id: number): ICard[] {
  const cards = getCardLocal();
  if (id > 0) { // only splice array when item is found
    const index = id - 1;
    cards.splice(index, 1); // 2nd parameter means remove one item only
    for (let i = index; i < cards.length; i++) {
      cards[i].id = (parseInt(cards[i].id) - 1).toString()
    }
  }
  return cards;
}

const cardsService = {
  LOCAL_KEY_ITEM_NOTES,
  getCardLocal,
  setCardLocal,
  addCardLocal,
  deleteCardLocal,
}

export default cardsService;
