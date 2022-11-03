import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import cardsService from '../services/cards.service'
import { ICard, ICardInput } from '../interfaces/ICard'


interface CardState {
  cards: ICard[],
  updateCardsLocal: (newCards: ICard[]) => void,
  addCardLocal: (newItem: ICardInput) => void,
  deleteCardLocal: (id: number) => void,

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
        addCardLocal: (newItem: ICardInput) => {
          const updatedCards = cardsService.addCardLocal(newItem)
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
      }),
      {
        name: cardsService.LOCAL_KEY_ITEM_NOTES,
        getStorage: () => localStorage
      }
    )
  )
)

export { useCardStore }
