import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Board, List, Card, Comment, ID } from '@/stores/types/board.types';

interface BoardState {
  boards: Record<ID, Board>;
  lists: Record<ID, List>;
  cards: Record<ID, Card>;
  comments: Record<ID, Comment>;

  /* Board */
  createBoard: (title: string) => ID;
  updateBoardTitle: (boardId: ID, title: string) => void;

  /* List */
  addList: (boardId: ID, title: string) => ID;

  /* Card */
  addCard: (listId: ID, title: string) => ID;

  /* Comment */
  addComment: (cardId: ID, text: string) => ID;
}

export const useBoardStore = create<BoardState>((set) => ({
  boards: {},
  lists: {},
  cards: {},
  comments: {},

  /* ---------- Board ---------- */
  createBoard: (title) => {
    const id = nanoid();

    set((state) => ({
      boards: {
        ...state.boards,
        [id]: { id, title, listIds: [] },
      },
    }));

    return id;
  },

  updateBoardTitle: (boardId, title) =>
    set((state) => ({
      boards: {
        ...state.boards,
        [boardId]: {
          ...state.boards[boardId],
          title,
        },
      },
    })),

  /* ---------- List ---------- */
  addList: (boardId, title) => {
    const id = nanoid();

    set((state) => ({
      lists: {
        ...state.lists,
        [id]: { id, boardId, title, cardIds: [] },
      },
      boards: {
        ...state.boards,
        [boardId]: {
          ...state.boards[boardId],
          listIds: [...state.boards[boardId].listIds, id],
        },
      },
    }));

    return id;
  },

  /* ---------- Card ---------- */
  addCard: (listId, title) => {
    const id = nanoid();

    set((state) => ({
      cards: {
        ...state.cards,
        [id]: { id, listId, title, commentIds: [] },
      },
      lists: {
        ...state.lists,
        [listId]: {
          ...state.lists[listId],
          cardIds: [...state.lists[listId].cardIds, id],
        },
      },
    }));

    return id;
  },

  /* ---------- Comment ---------- */
  addComment: (cardId, text) => {
    const id = nanoid();

    set((state) => ({
      comments: {
        ...state.comments,
        [id]: { id, cardId, text },
      },
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          commentIds: [...state.cards[cardId].commentIds, id],
        },
      },
    }));

    return id;
  },
}));
