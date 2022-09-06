import type { NextPage } from 'next'
import Card from '../components/Card';
import { ICard } from '../interfaces/ICard';

interface props {
  cards: ICard[];
}
const Cards: NextPage<props> = ({ cards }) => {

  return (<div className="p-2 grid grid-cols-3 gap-3">
    {cards.map((card) => {
      return <Card card={card} key={card.id} />
    })}

  </div>)
}

export default Cards;
