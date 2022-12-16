// Response from server ---------
export interface ICard{
  id: string;
  header?: string;
  tasks: ISingleList[];

}

export interface ISingleList{
  id: string;
  cardId: string;
  title?: string;
  description?: string;
}

// Input request ------
export interface ITaskInput {
  title: string;
  description?: string;
}

export interface ICardInput {
  header: string;
  tasks: ITaskInput[]
}
