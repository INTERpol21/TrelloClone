export interface ILabel {
  color: string;
  text: string;
}

export interface IComment {
  id: number;
  text: string;


}

export interface ITask {
  id: number;
  completed: boolean;
  text: string;
}

export interface ICard {
  id: number;
  title: string;
  labels: ILabel[];
  date: string;
  tasks: ITask[];
  desc?: string;
  messages:IComment[]
}

export interface IBoard {
  id: number;
  title: string;
  cards: ICard[];
}

