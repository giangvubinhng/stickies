import type { NextPage } from 'next';
import SingleList from './SingleList';
import {ICard} from '../interfaces/ICard';
interface props{
  card: ICard;
  
}
const Card: NextPage<props> = ({card}) => {
  return (
    <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        {card.header}
        </h5>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          Remove
        </a>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {card.list.map((task) => {
            return <SingleList task={task} key={task.id}/>
          })}
        </ul>
      </div>
    </div>
  )
}
export default Card;
