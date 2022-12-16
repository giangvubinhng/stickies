import type { NextPage } from 'next';
import { useState } from 'react';
import { VscNewFile } from 'react-icons/vsc'
import { TiDelete } from 'react-icons/ti'
import { useSession } from "next-auth/react"

import { useCardStore } from '@/app/stores'
import { ICardInput } from '@/interfaces/ICard'

interface props {
  setShowModal: (show: boolean) => void;
  currentCard?: ICardInput;
  cardId?: string
  addCardAsync?: (task: ICardInput) => void;
  updateCardAsync?: ({ }) => void;
}


const AddCardModal: NextPage<props> = ({ setShowModal, currentCard, cardId, addCardAsync, updateCardAsync }) => {

  const { status } = useSession()

  // Initial AddFunc from CardStore
  const addOrUpdateCard = useCardStore((state) => state.addOrUpdateCardLocal)

  // Initialize TaskInput
  const [task, setTask] = useState<ICardInput>(currentCard || { header: '', tasks: new Array() })

  // handle when the add new task button is clicked
  const handleAddTask = () => {
    task.tasks.push({ title: '', description: '' })
    setTask({ ...task })
  }

  const handleRemoveSingleTask = (ind: number) => {
    if (ind > -1) { // only splice array when item is found
      task.tasks.splice(ind, 1); // 2nd parameter means remove one item only
      setTask({ ...task })
    }
  }

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (target.name === "header") {
      setTask({ ...task, header: target.value })
    }
    else if (target.name == "title") {
      const key = (target.parentNode as HTMLElement).getAttribute("data-key")
      if (key) {
        task.tasks[parseInt(key)].title = target.value
        setTask({ ...task })
      }
    }
    else if (target.name == "description") {
      const key = (target.parentNode as HTMLElement).getAttribute("data-key")
      if (key) {
        task.tasks[parseInt(key)].description = target.value
        setTask({ ...task })
      }
    }

  }

  const handleSubmitAsync = () => {
    if (cardId && updateCardAsync) {
      updateCardAsync({ card: task, id: cardId })
    }
    else if (addCardAsync) {
      addCardAsync(task)
    }
  }


  // Handle when user clicks submit
  const handleSubmitLocal = () => {
    if (cardId) {
      addOrUpdateCard(task, cardId)
    }
    else {
      addOrUpdateCard(task)
    }
  }

  const handleSubmit = () => {
    if (status === "authenticated") {
      handleSubmitAsync()
    }
    else {
      handleSubmitLocal()
    }
    handleCancel()
  }

  // Handle when user clicks cancel
  const handleCancel = () => {
    setTask({ header: '', tasks: new Array() })
    setShowModal(false)
  }
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={handleCancel}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3 sm:flex">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-gray-100 rounded-full">
                <button onClick={handleAddTask}>
                  <VscNewFile />
                </button>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <input type={"text"} name="header" value={task.header} onChange={handleInputChange} placeholder="Header" />
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                  You can add more tasks by clicking the add button on the left
                </p>
                {task.tasks.map((elem: any, ind: number) => {
                  return (<div className="w-full max-w-sm border-b-2 mt-2" key={ind} data-key={ind}>
                    <button onClick={() => handleRemoveSingleTask(ind)}><TiDelete /></button>
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2" id={"title" + ind} name="title" type="text" value={elem.title} onChange={handleInputChange} placeholder="Task Name" />
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2" id={"description" + ind} type="text" name="description" value={elem.description} onChange={handleInputChange} placeholder="Description (optional)" />
                  </div>)

                })}
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-gray-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={handleCancel}
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
