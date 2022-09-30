import {ICard} from '../interfaces/ICard';
import localStorageService from './localStorage.service';

// Constants
const LOCAL_KEY_ITEM_NOTES = "stickieNoteItems"
const FakeCardAPI = (): ICard[] => {
  const fakecards: ICard[] = [
    {
      id: '1',
      header: "School Tasks",
      list: [
        {
          id: '1',
          card_id: '1',
          title: 'life in the built environment chapter 2 and the text is actually long',
          description: 'homework due'
        },
        {
          id: '2',
          card_id: '1',
          title: 'CS 3144',
          description: 'homework not due'
        },
      ]
    },
    {
      id: '2',
      header: "Job Tasks",
      list: [
        {
          id: '3',
          card_id: '2',
          title: 'Company A',
          description: 'interview due'
        },
        {
          id: '4',
          card_id: '2',
          title: 'Company B',
          description: 'interview not due'
        },
      ]
    },
    {
      id: '3',
      header: "Random Task",
      list: [
        {
          id: '5',
          card_id: '3',
          description: 'Company B',
        },
        {
          id: '6',
          card_id: '3',
          description: 'Company B',
        },
      ]
    }, 

    {
      id: '4',
      header: "Random Task",
      list: [
        {
          id: '7',
          card_id: '2',
          description: 'Company B',
        },
        {
          id: '8',
          card_id: '2',
          description: 'Company B',
        },
      ]
    },

    {
      id: '5',
      header: "Random Task",
      list: [
        {
          id: '9',
          card_id: '2',
          description: 'Company B',
        },
        {
          id: '10',
          card_id: '2',
          description: 'Company B',
        },
      ]
    }
  ]
  return fakecards;
}
function getCardLocal(): ICard[]{
  return localStorageService.getItem(LOCAL_KEY_ITEM_NOTES);
}
function setCardLocal(newValues: ICard[]): void{
  localStorageService.setItem(LOCAL_KEY_ITEM_NOTES, newValues)
}


export {
  FakeCardAPI,
  getCardLocal,
  setCardLocal
}
