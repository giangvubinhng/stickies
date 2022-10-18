import type { NextPage } from 'next';
import {IoAddOutline} from 'react-icons/io5'
import { useCardStore } from '../app/stores';
import cardsService from '../services/cards.service';
import { useCallback } from 'react';

const RightFloatingBtn: NextPage = () => {
  const generateNewCard = useCallback(
    useCardStore((state) => state.updateCardsLocal),
    [])
  return (
    <div>
      <button onClick={() => generateNewCard(cardsService.addEmptyCardLocal())} title="Add Note"
        className="fixed z-90 bottom-10 right-8 bg-gray-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-gray-700 hover:drop-shadow-2xl duration-300"><IoAddOutline/></button>
    </div>)
}

export default RightFloatingBtn;
