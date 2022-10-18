import type { NextPage } from 'next';
import { useCallback } from 'react';
import SingleList from './SingleList';
import { ICard } from '../interfaces/ICard';
import { FormEvent, useEffect, useState } from 'react';
import { useCardStore } from '../app/stores';
import CardDropDownMenu from './CardDropDown';
interface props {
  card: ICard;

}
const Card: NextPage<props> = ({ card }) => {

  const handleCardDelete = useCallback(useCardStore((state) => state.deleteCardLocal), [])
  const handleAddTask = useCallback(useCardStore((state) => state.addTaskToCard), [])
  const [editTitleMode, setEditTitleMode] = useState(false)
  const [currentHeader, setCurrentHeader] = useState('')
  useEffect(() => {
    setCurrentHeader(card.header || '')
  }, [card])

  return (
    <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        {editTitleMode ? (<>
          <form onSubmit={() => setEditTitleMode(!editTitleMode)} >
            <input type="text" name="title" value={currentHeader} className="border w-4/5" onChange={(e: FormEvent<HTMLInputElement>) => setCurrentHeader((e.target as HTMLInputElement).value)} />
            <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Done
            </button>
          </form>
        </>) : (<>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white hover:underline" onClick={() => setEditTitleMode(!editTitleMode)}>
            {currentHeader}
          </h5>
          <CardDropDownMenu 
            handleAddTask={() => handleAddTask(card.id)} 
            handleDeleteCard={() => handleCardDelete(parseInt(card.id))}/>
        </>)}
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
