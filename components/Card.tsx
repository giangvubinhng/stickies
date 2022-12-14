import type { NextPage } from 'next';
import { useState } from 'react'
import SingleList from './SingleList';
import { ICard, ICardInput } from '@/interfaces/ICard';
import { useCardStore } from '@/app/stores';
import AddCardModal from './AddCardModal';
import CardDropDownMenu from './CardDropDown';
import { useSession } from "next-auth/react"
interface props {
  card: ICard;
  updateCardAsyncProp?: ({ }) => void;
  handleCardDeleteAsync: (card_id: string) => void;
}
const Card: NextPage<props> = ({ card, updateCardAsyncProp, handleCardDeleteAsync }) => {

  const handleCardDeleteLocal = useCardStore((state) => state.deleteCardLocal)
  const { status } = useSession()
  const [showModal, setShowModal] = useState(false);
  const updateCardAsync = (obj: any) => {
    if (updateCardAsyncProp) {
      updateCardAsyncProp(obj)
    }
  }
  const handleCardDelete = () => {
    if (status === "authenticated") {
      handleCardDeleteAsync(card.id)
    }
    else {
      handleCardDeleteLocal(card.id)
    }
  }


  return (
    <>
      {showModal && <AddCardModal setShowModal={(e) => setShowModal(e)} currentCard={card as ICardInput} cardId={card.id} updateCardAsync={updateCardAsync} />}
      <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <>
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white hover:underline">
              {card.header}
            </h5>
            <CardDropDownMenu
              handleDeleteCard={() => handleCardDelete()}
              handleEditCard={() => setShowModal(!showModal)}
            />
          </>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {card.tasks.map((task, ind) => {
              return <SingleList task={task} key={task.id || ind} />
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
export default Card;
