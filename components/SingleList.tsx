import type { NextPage } from 'next';
import { ISingleList } from '@/interfaces/ICard'

interface props {
  task: ISingleList;
}


const SingleList: NextPage<props> = ({ task }) => {

  return (<>
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
        </div>
        <div className="flex-1 min-w-0">
          <>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {task.title || ''}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 break-words whitespace-pre-wrap">
              {task.description || ''}
            </p>
          </>
        </div>
        {/*<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"> 
        <SingleListDropDownMenu
            handleEdit={toggleEdit}
            handleMark={() => { }}
            handleDelete={() => { }}
            handleDuplicate={() => { }} />
        </div> */}
      </div>
    </li>
  </>)

}
export default SingleList;
