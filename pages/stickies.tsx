import type { NextPage } from 'next'
import Cards from '../components/Cards';
import RightFloatingBtn from '../components/RightFloatingBtn';
import { useCardStore } from '../app/stores';
import { useEffect, useState } from 'react';
import {ICard} from '../interfaces/ICard'

const Stickies = () => {
  const [currCards, setCurrCards] = useState<ICard[]>([])
  const cards: ICard[] = useCardStore((state) => state.cards);
  useEffect(
    () => {
      setCurrCards(cards)
    }, [cards]
  )
  return (
    <div>
      <Cards cards={currCards}/>
      <RightFloatingBtn/>
    </div>)
}

export default Stickies;
