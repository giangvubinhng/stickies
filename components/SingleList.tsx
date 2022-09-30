import type { NextPage } from 'next';
import SingleListDropDownMenu from './SingleListDropDownMenu';
import { ISingleList } from '../interfaces/ICard'
import { useState } from 'react';

interface props {
  task: ISingleList;
}


const SingleList: NextPage<props> = ({ task }) => {

  const [isEdit, setIsEdit] = useState(false)

  const toggleEdit = () => {
    setIsEdit(!isEdit)
  }

  return (<>
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
        </div>
        <div className="flex-1 min-w-0">
          {isEdit ? (<>
            <form onSubmit={toggleEdit}>
              <input type={'text'} name='title' className='border'/>
              <input type={'text'} name='info' className='border' />
              <button>Done</button>
            </form>
          </>) :
            (<>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {task.title || ''}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {task.description || ''}
              </p>
            </>)
          }
        </div>
        {
          isEdit ? (
            null
          ) : (
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              <SingleListDropDownMenu
                handleEdit={toggleEdit}
                handleMark={() => { }}
                handleDelete={() => { }}
                handleDuplicate={() => { }} />
            </div>
          )
        }
</div>
    </li>
  </>)

}
export default SingleList;
