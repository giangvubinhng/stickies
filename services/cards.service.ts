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

  // Get the current card list from local storage
  const currentCardList = getCardLocal();
  // Create a new card id 
  const newCardId = (currentCardList.length + 1).toString()

  // Create a new Card Object
  const mappedCard: ICard = { id: newCardId, list: [] };

  // Generate list of task correspond to the card
  const taskListWithId: ISingleList[] = newItem.list.map((e: ITaskInput, i: number) => {
    const anObj: ISingleList = {
      id: i.toString(),
      card_id: newCardId,
      title: e.title,
      description: e.description
    }
    return anObj

  })

  // Finalize the card and update the list
  mappedCard.header = newItem.header;
  mappedCard.list = taskListWithId
  const updatedCards = [...currentCardList, mappedCard]
  return updatedCards;
}

function deleteCardLocal(card_id: string): ICard[] {
  const cards = getCardLocal();
  const id: number = parseInt(card_id)
  if (id > 0) { // only splice array when item is found
    const index = id - 1;
    cards.splice(index, 1); // 2nd parameter means remove one item only
    for (let i = index; i < cards.length; i++) {
      cards[i].id = (parseInt(cards[i].id) - 1).toString()
    }
  }
  return cards;
}

function updateCardLocal(newItem: ICardInput, id: string): ICard[] {
  // Get the current card list from local storage
  const currentCardList = getCardLocal();
  // Get index from card id 
  const cardIndx = parseInt(id) - 1;


  // Generate new list of task correspond to the card
  const taskListWithId: ISingleList[] = newItem.list.map((e: ITaskInput, i: number) => {
    const anObj: ISingleList = {
      id: i.toString(),
      card_id: id,
      title: e.title,
      description: e.description
    }
    return anObj

  })

  // Finalize the card and update the list
  currentCardList[cardIndx].header = newItem.header;
  currentCardList[cardIndx].list = taskListWithId
  return currentCardList;

}

const cardsService = {
  LOCAL_KEY_ITEM_NOTES,
  getCardLocal,
  setCardLocal,
  addCardLocal,
  deleteCardLocal,
  updateCardLocal
}

export default cardsService;
