import {ICard} from '../interfaces/ICard';

const FakeCardAPI = (): ICard[] => {
  const fakecards: ICard[] = [
    {
      id: '1',
      header: "School Tasks",
      list: [
        {
          id: '1',
          card_id: '1',
          title: 'life in the built environment chapter 2',
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
          id: '1',
          card_id: '2',
          title: 'Company A',
          description: 'interview due'
        },
        {
          id: '2',
          card_id: '2',
          title: 'Company B',
          description: 'interview not due'
        },
      ]
    },
    {
      id: '2',
      header: "Random Task",
      list: [
        {
          id: '2',
          card_id: '2',
          description: 'Company B',
        },
        {
          id: '2',
          card_id: '2',
          description: 'Company B',
        },
      ]
    }, 

    {
      id: '2',
      header: "Random Task",
      list: [
        {
          id: '2',
          card_id: '2',
          description: 'Company B',
        },
        {
          id: '2',
          card_id: '2',
          description: 'Company B',
        },
      ]
    },

    {
      id: '2',
      header: "Random Task",
      list: [
        {
          id: '2',
          card_id: '2',
          description: 'Company B',
        },
        {
          id: '2',
          card_id: '2',
          description: 'Company B',
        },
      ]
    }
  ]
  return fakecards;
}

export {
  FakeCardAPI
}
