import create from 'zustand'
import {persist, devtools} from 'zustand/middleware'
import cardsService from '../services/cards.service'
import { ICard, ISingleList } from '../interfaces/ICard'


interface CardState {
  cards: ICard[],
  updateCardsLocal: (newCards: ICard[]) => void,
  addCardLocal: (newItem: ICard) => void,
  addEmptyCardLocal: () => void,
  deleteCardLocal: (id: number) => void,
  editCardLocal: (id: number, updatecard: ICard) => void,
  addTaskToCard: (card_id: string) => void

}


const useCardStore = create<CardState>()(
  devtools(
    persist(
      (set) => ({
        cards: [],
        updateCardsLocal: (newCards: ICard[]) => {
          return set(() => ({
            cards: newCards
          }))
        },
        addCardLocal: (newItem: ICard) => {
          const updatedCards = cardsService.addCardLocal(newItem)
          return set(() => ({
            cards: updatedCards
          }))
        },
        addEmptyCardLocal() {
          const updatedCards = cardsService.addEmptyCardLocal()
          return set(() => ({
            cards: updatedCards
          }))
        },
        deleteCardLocal(id: number) {
          const updatedCards = cardsService.deleteCardLocal(id)
          return set(() => ({
            cards: updatedCards
          }))
            
        },
        editCardLocal(id: number, updatecard: ICard) {
          const updatedCards = cardsService.editCardLocal(id, updatecard)
          return set(() => ({
            cards: updatedCards
          }))
        },
        addTaskToCard(card_id: string) {
          const updatedCards = cardsService.addTaskToCard(card_id);
          return set(() => ({
            cards: updatedCards
          }))
            
        },
      }),
      {
        name: cardsService.LOCAL_KEY_ITEM_NOTES,
        getStorage: () => localStorage
      }
    )
  )
)

export { useCardStore }
