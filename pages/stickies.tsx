import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next'
import Cards from '@/components/Cards';
import RightFloatingBtn from '@/components/RightFloatingBtn';
import { useCardStore } from '@/app/stores';
import { ICard, ICardInput } from '@/interfaces/ICard'
import AddCardModal from '@/components/AddCardModal';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import cardApiService from '@/services/api/cardApi.service';
import { ServerResponse } from '@/interfaces/api/IAPI';
import cardsService from '@/services/cards.service';
import AlertMessage from '@/components/AlertMessage';


interface props {
  result?: ServerResponse
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      props: {
      }
    }
  }
  else {
    const userEmail = session.user?.email
    const result = await cardApiService.findCardsByUserEmail(userEmail)

    return {
      props: {
        result
      }
    }
  }
}

const Stickies: NextPage<props> = ({ result }) => {
  const [currCards, setCurrCards] = useState<ICard[]>([])
  const [showModal, setShowModal] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    state: false,
    message: '',
    type: ''
  })
  const cards: ICard[] = useCardStore((state) => state.cards);

  function toggleMessage(message: string, type?: string) {

    setAlertMessage({ state: true, message: message, type: type || '' })
    setTimeout(() => {
      setAlertMessage({ state: false, message: '', type: '' })
    }, 5000)
  }

  const addCardAsync = async (task: ICardInput) => {
    const data = await cardsService.addCardAsync(task);
    if (data.success === true) {
      setCurrCards([...currCards, data.data])
      toggleMessage(data.message, 'info')
    }
    else {
      toggleMessage(data.message, 'error')
    }

  }

  const updateCardAsync = async (obj: any) => {
    const data = await cardsService.updateCardAsync(obj.card, obj.id);
    if (data.success === true) {
      const updatedCardList = currCards.map((card) => {
        if (card.id === data.data.id) {
          card = data.data
        }
        return card
      })
      setCurrCards(updatedCardList)
      toggleMessage(data.message, 'info')
    }
    else {
      toggleMessage(data.message, 'error')
    }


  }
  const deleteCardAsync = async (card_id: string) => {
    const data = await cardsService.deleteCardAsync(card_id);
    if (data.success === true) {
      setCurrCards(currCards.filter((e) => e.id !== data.data.id))
      toggleMessage(data.message, 'info')
    }
    else {
      toggleMessage(data.message, 'error')
    }

  }
  useEffect(
    () => {
      if (result?.success) {
        setCurrCards(result.data)
      }
      else {
        setCurrCards(cards)
      }
    }, [cards, result?.data, result?.success]
  )

  return (
    <div>
      {alertMessage.state && <AlertMessage type={alertMessage.type} message={alertMessage.message} />}
      <Cards cards={currCards} updateCardAsyncProp={updateCardAsync} handleCardDeleteAsync={deleteCardAsync} />
      {showModal && <AddCardModal setShowModal={(e) => setShowModal(e)} addCardAsync={addCardAsync} />}
      <RightFloatingBtn onClick={() => setShowModal(true)} />
    </div>
  )
}


export default Stickies;
