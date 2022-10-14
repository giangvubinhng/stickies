import create from 'zustand'
import cardsService from '../services/cards.service'
import { ICard } from '../interfaces/ICard'

// Template
interface BearState {
  bears: number
  increase: (by: number) => void

}
const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}))

interface CardState {
  cards: ICard[],
  updateCardsLocal: (newCards: ICard[]) => void


}

const useCardStore = create<CardState>((set) => ({
  cards: cardsService.getCardLocal(),
  updateCardsLocal: (newCards) => {
    return set(() => ({
      cards: newCards
    }))
  }

}))

export { useBearStore, useCardStore }
