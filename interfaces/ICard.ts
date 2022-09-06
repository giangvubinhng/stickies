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
