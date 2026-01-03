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

export interface BoardState {
  boards: Record<ID, Board>;
  lists: Record<ID, List>;
  cards: Record<ID, Card>;
  comments: Record<ID, Comment>;

  /* Board */
  createBoard: (title: string) => ID;
  updateBoardTitle: (boardId: ID, title: string) => void;
  deleteBoard: (boardId: ID) => void;

  /* List */
  addList: (boardId: ID, title: string) => ID;
  updateListTitle: (listId: ID, title: string) => void;
  deleteList: (listId: ID) => void;

  /* Card */
  addCard: (listId: ID, title: string) => ID;
  updateCardTitle: (cardId: ID, title: string) => void;
  deleteCard: (cardId: ID) => void;

  /* Comment */
  addComment: (cardId: ID, text: string) => ID;
  updateCommentText: (commentId: ID, text: string) => void;
  deleteComment: (commentId: ID) => void;

  /* Reordering */
  reorderLists: (boardId: ID,  listIds: string[]) => void;
// board.store.ts
  reorderCards: (
    listId: string,
    activeIndex: number,
    overIndex: number
  ) => void;

  moveCardBetweenLists: (
    sourceListId: string,
    targetListId: string,
    activeIndex: number,
    overIndex: number
  ) => void;

  ensureBoardExists: (defaultTitle: string) => string;
  clearListCards: (listId: ID) => void;
}
