import type { NextPage } from 'next'
import Card from '../components/Card';
import { ICard } from '../interfaces/ICard';

interface props {
  cards: ICard[];
}
const Cards: NextPage<props> = ({ cards }) => {

  return (
    <div className="min-h-screen flex justify-center">
      <div className="p-2 grid grid-cols-4 gap-4">
        {cards.map((card) => {
          return <Card card={card} key={card.id} />
        })}
      </div>
    </div>
  )
}

export default Cards;
