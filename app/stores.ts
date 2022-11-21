import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import cardsService from '@/services/cards.service'
import { ICard, ICardInput } from '@/interfaces/ICard'


interface CardState {
  cards: ICard[],
  updateCardsLocal: (newCards: ICard[]) => void,
  addOrUpdateCardLocal: (newItem: ICardInput, id?: string) => void,
  deleteCardLocal: (id: string) => void,

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
        addOrUpdateCardLocal: (newItem: ICardInput, id?: string) => {
          let updatedCards: ICard[];
          if (id) {
            updatedCards = cardsService.updateCardLocal(newItem, id)
          }
          else {
            updatedCards = cardsService.addCardLocal(newItem)
          }
          return set(() => ({
            cards: updatedCards
          }))
        },
        deleteCardLocal(id: string) {
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
