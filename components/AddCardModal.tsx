import type { NextPage } from 'next';
import { useState } from 'react';
import { VscNewFile } from 'react-icons/vsc'

import { useCardStore } from '../app/stores'
import { ICard, ISingleList } from '../interfaces/ICard'

interface props {
  setShowModal: (show: boolean) => void;
}
interface ITaskInput {
  title: string;
  description?: string;
}
interface ICardInput {
  header: string;
  list: ITaskInput[]
}


const AddCardModal: NextPage<props> = ({ setShowModal }) => {

  const cardList = useCardStore((state) => state.cards)
  const addCardToStore = useCardStore((state) => state.addCardLocal)

  const [task, setTask] = useState<ICardInput>({ header: '', list: new Array() })

  const handleAddTask = () => {
    task.list.push({ title: '', description: '' })
    setTask({ ...task })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (target.name === "header") {
      setTask({ ...task, header: target.value })
    }
    else if (target.name == "title") {
      const key = (target.parentNode as HTMLElement).getAttribute("data-key")
      if (key) {
        task.list[parseInt(key)].title = target.value
        setTask({ ...task })
      }
    }
    else if (target.name == "description") {
      const key = (target.parentNode as HTMLElement).getAttribute("data-key")
      if (key) {
        task.list[parseInt(key)].description = target.value
        setTask({ ...task })
      }
    }

  }

  const handleSubmit = () => {

    const newCardId = (cardList.length + 1).toString()
    const mappedCard: ICard = { id: newCardId, list: [] };
    const tempCard = task

    const cardListWithId: ISingleList[] = tempCard.list.map((e: ITaskInput, i: number) => {
      const anObj: ISingleList = {
        id: i.toString(),
        card_id: newCardId,
        title: e.title,
        description: e.description
      }
      return anObj

    })

    mappedCard.header = tempCard.header;
    mappedCard.list = cardListWithId
    addCardToStore(mappedCard)

    setTask({ header: '', list: new Array() })
    setShowModal(false)
  }

  const handleCancel = () => {
    setTask({ header: '', list: new Array() })
    setShowModal(false)
  }
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
                <button onClick={handleAddTask}>
                  <VscNewFile />
                </button>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <input type={"text"} name="header" value={task.header} onChange={handleInputChange} placeholder="Header" />
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                  You can add more tasks by clicking the add button on the left
                </p>
                {task.list.map((elem: any, ind: number) => {
                  return (<div className="w-full max-w-sm border-b-2 mt-2" key={ind} data-key={ind}>
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
