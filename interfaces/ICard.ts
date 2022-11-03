export interface ICard{
  id: string;
  header?: string;
  list: ISingleList[];

}

export interface ISingleList{
  id: string;
  card_id: string;
  title?: string;
  description?: string;
}

export interface ITaskInput {
  title: string;
  description?: string;
}
export interface ICardInput {
  header: string;
  list: ITaskInput[]
}
