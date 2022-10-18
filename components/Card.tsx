import type { NextPage } from 'next';
import { useCallback } from 'react';
import SingleList from './SingleList';
import { ICard } from '../interfaces/ICard';
import { useCardStore } from '../app/stores';
import CardDropDownMenu from './CardDropDown';
interface props {
  card: ICard;

}
const Card: NextPage<props> = ({ card }) => {

  const handleCardDelete = useCallback(useCardStore((state) => state.deleteCardLocal), [])
  const handleAddTask = useCallback(useCardStore((state) => state.addTaskToCard), [])

  return (
    <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white hover:underline">
            {card.header}
          </h5>
          <CardDropDownMenu
            handleAddTask={() => handleAddTask(card.id)}
            handleDeleteCard={() => handleCardDelete(parseInt(card.id))} />
        </>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {card.list.map((task) => {
            return <SingleList task={task} key={task.id} />
          })}
        </ul>
      </div>
    </div>
  )
}
export default Card;
