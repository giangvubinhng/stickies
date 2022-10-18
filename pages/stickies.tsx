import type { NextPage } from 'next'
import Cards from '../components/Cards';
import RightFloatingBtn from '../components/RightFloatingBtn';
import { useCardStore } from '../app/stores';
import { useEffect, useState } from 'react';
import {ICard} from '../interfaces/ICard'
import AddCardModal from '../components/AddCardModal';

const Stickies: NextPage = () => {
  const [currCards, setCurrCards] = useState<ICard[]>([])
  const [showModal, setShowModal] = useState(false)
  const cards: ICard[] = useCardStore((state) => state.cards);
  useEffect(
    () => {
      setCurrCards(cards)
    }, [cards]
  )
  return (
    <div>
      <Cards cards={currCards}/>
      { showModal && <AddCardModal setShowModal={(e) => setShowModal(e)}/> }
      <RightFloatingBtn onClick={() => setShowModal(true)}/>
    </div>
  )
}

export default Stickies;
