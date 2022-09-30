import type { NextPage } from 'next';
import SingleList from './SingleList';
import { ICard } from '../interfaces/ICard';
import { FormEvent, useState } from 'react';
interface props {
  card: ICard;

}
const Card: NextPage<props> = ({ card }) => {

  const [editTitleMode, setEditTitleMode] = useState(false)
  const [currentHeader, setCurrentHeader] = useState(card.header)

  return (
    <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        {editTitleMode ? (<>
          <form onSubmit={() => setEditTitleMode(!editTitleMode)} >
            <input type="text" name="title" value={currentHeader} className="leading-none border w-full" onChange={(e: FormEvent<HTMLInputElement>) => setCurrentHeader((e.target as HTMLInputElement).value)} />
            <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Done
            </button>
          </form>
        </>) : (<>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white hover:underline" onClick={() => setEditTitleMode(!editTitleMode)}>
            {currentHeader}
          </h5>
          <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            Remove
          </button>
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
