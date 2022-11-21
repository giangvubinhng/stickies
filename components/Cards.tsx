import type { NextPage } from 'next'
import Card from '@/components/Card';
import { ICard } from '@/interfaces/ICard';

interface props {
  cards: ICard[];
}
const Cards: NextPage<props> = ({ cards }) => {

  return (
    <div className="min-h-screen">
      <div className="p-2 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          return <Card card={card} key={card.id} />
        })}
      </div>
    </div>
  )
}

export default Cards;
