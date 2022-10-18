import type { NextPage } from 'next';
import { useState } from 'react';
import { VscNewFile } from 'react-icons/vsc'

interface props {
  setShowModal: (show: boolean) => void;
}
const AddCardModal: NextPage<props> = ({ setShowModal }) => {
  const newTaskObj = { taskName: 'Task name', taskDesc: 'Description (optional)' }
  const [list, setList] = useState([newTaskObj])
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setShowModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3 sm:flex">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-gray-100 rounded-full">
                <button onClick={() => setList([...list, newTaskObj])}>
                  <VscNewFile />
                </button>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <input type={"text"} value="New Title" />
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                  You can add more tasks by clicking the add button on the left
                </p>
                {list.map((elem, ind) => {
                  return (<div className="w-full max-w-sm border-b-2 mt-2" key={ind}>
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2" id="inline-full-name" type="text" value={elem.taskName} />
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2" id="inline-full-name" type="text" value={elem.taskDesc} />
                  </div>)

                })}
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-gray-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddCardModal;
