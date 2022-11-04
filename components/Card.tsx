import type { NextPage } from 'next';
import { useState } from 'react'
import SingleList from './SingleList';
import { ICard, ICardInput } from '../interfaces/ICard';
import { useCardStore } from '../app/stores';
import AddCardModal from './AddCardModal';
import CardDropDownMenu from './CardDropDown';
interface props {
  card: ICard;

}
const Card: NextPage<props> = ({ card }) => {

  const handleCardDelete = useCardStore((state) => state.deleteCardLocal)
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <AddCardModal setShowModal={(e) => setShowModal(e)} currentCard={card as ICardInput} cardId={card.id} />}
      <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <>
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white hover:underline">
              {card.header}
            </h5>
            <CardDropDownMenu
              handleDeleteCard={() => handleCardDelete(card.id)}
              handleEditCard={() => setShowModal(!showModal)}
            />
          </>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {card.list.map((task, ind) => {
              return <SingleList task={task} key={task.id || ind} />
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
export default Card;
