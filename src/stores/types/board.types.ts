export type ID = string;

export interface Board {
  id: ID;
  title: string;
  listIds: ID[];
}

export interface List {
  id: ID;
  boardId: ID;
  title: string;
  cardIds: ID[];
}

export interface Card {
  id: ID;
  listId: ID;
  title: string;
  commentIds: ID[];
}

export interface Comment {
  id: ID;
  cardId: ID;
  text: string;
}
