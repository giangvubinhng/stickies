import type { NextPage } from 'next'
import Card from '@/components/Card';
import { ICard } from '@/interfaces/ICard';

interface props {
  cards: ICard[];
  updateCardAsyncProp?: ({ }) => void;

}
const Cards: NextPage<props> = ({ cards, updateCardAsyncProp }) => {

  const handleUpdateCardAsync = (obj: any) => {
    if (updateCardAsyncProp){
      updateCardAsyncProp(obj)
    }
  }
  return (
    <div className="min-h-screen">
      <div className="p-2 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          return <Card card={card} key={card.id} updateCardAsyncProp={handleUpdateCardAsync} />
        })}
      </div>
    </div>
  )
}

export default Cards;
