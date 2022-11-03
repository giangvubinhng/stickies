import { ICard, ISingleList } from '../interfaces/ICard';
import localStorageService from './localStorage.service';

// Constants
const LOCAL_KEY_ITEM_NOTES = "stickieNoteItems"

function getCardLocal(): ICard[] {
  return localStorageService.getItem(LOCAL_KEY_ITEM_NOTES).state.cards || [];
}
function setCardLocal(newValues: ICard[]): void {
  localStorageService.setItem(LOCAL_KEY_ITEM_NOTES, newValues)
}
function addCardLocal(newItem: ICard): ICard[] {
  const cards = getCardLocal();
  const updatedCards = [...cards, newItem]
  return updatedCards;
}
function addEmptyCardLocal(): ICard[] {
  const newId = getCardLocal().length
  const emptyCard = 
    {
      id: newId.toString(),
      header: "new header",
      list: []
    }
  return addCardLocal(emptyCard)
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
function editCardLocal(id: number, updatedCard: ICard): ICard[] {
  const cards = getCardLocal();
  cards[id] = updatedCard
  return cards
}
function addTaskToCard(card_id: string){
  const cards = getCardLocal();
  const card = cards.length > 0 ? cards[parseInt(card_id)] : undefined
  if(card){
    const newId = card.list.length
    const emptyList: ISingleList = {
      id: newId.toString(),
      card_id: card.id,
      title: "New task",
      description: "task Description"
    }
    card.list.push(emptyList)
    return cards
  }

}

const cardsService = {
  LOCAL_KEY_ITEM_NOTES,
  getCardLocal,
  setCardLocal,
  addCardLocal,
  deleteCardLocal,
  editCardLocal,
  addEmptyCardLocal,
  addTaskToCard
}

export default cardsService;
