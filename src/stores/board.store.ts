import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Board, List, Card, Comment, ID } from '@/stores/types/board.types';
import { reorder } from '@/shared/utils/array';

interface BoardState {
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
  reorderLists: (boardId: ID, fromIndex: number, toIndex: number) => void;
  reorderCards: (listId: ID, fromIndex: number, toIndex: number) => void;
  moveCard: (
    cardId: ID,
    fromListId: ID,
    toListId: ID,
    toIndex: number
  ) => void;

}

export const useBoardStore = create<BoardState>((set, get) => ({
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

  deleteBoard: (boardId) => {
    const { boards, lists, cards, comments } = get();
    const board = boards[boardId];

    if (!board) return;

    const listIds = board.listIds;
    const cardIds = listIds.flatMap((id) => lists[id]?.cardIds ?? []);
    const commentIds = cardIds.flatMap((id) => cards[id]?.commentIds ?? []);

    set(() => {
      const newBoards = { ...boards };
      const newLists = { ...lists };
      const newCards = { ...cards };
      const newComments = { ...comments };

      delete newBoards[boardId];
      listIds.forEach((id) => delete newLists[id]);
      cardIds.forEach((id) => delete newCards[id]);
      commentIds.forEach((id) => delete newComments[id]);

      return {
        boards: newBoards,
        lists: newLists,
        cards: newCards,
        comments: newComments,
      };
    });
  },

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

  updateListTitle: (listId, title) =>
    set((state) => ({
      lists: {
        ...state.lists,
        [listId]: {
          ...state.lists[listId],
          title,
        },
      },
    })),

  deleteList: (listId) => {
    const { lists, cards, comments, boards } = get();
    const list = lists[listId];

    if (!list) return;

    const cardIds = list.cardIds;
    const commentIds = cardIds.flatMap((id) => cards[id]?.commentIds ?? []);

    set(() => {
      const newLists = { ...lists };
      const newCards = { ...cards };
      const newComments = { ...comments };
      const newBoards = { ...boards };

      delete newLists[listId];
      cardIds.forEach((id) => delete newCards[id]);
      commentIds.forEach((id) => delete newComments[id]);

      newBoards[list.boardId] = {
        ...newBoards[list.boardId],
        listIds: newBoards[list.boardId].listIds.filter((id) => id !== listId),
      };

      return {
        lists: newLists,
        cards: newCards,
        comments: newComments,
        boards: newBoards,
      };
    });
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

  updateCardTitle: (cardId, title) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          title,
        },
      },
    })),

  deleteCard: (cardId) => {
    const { cards, lists, comments } = get();
    const card = cards[cardId];

    if (!card) return;

    set(() => {
      const newCards = { ...cards };
      const newComments = { ...comments };
      const newLists = { ...lists };

      card.commentIds.forEach((id) => delete newComments[id]);
      delete newCards[cardId];

      newLists[card.listId] = {
        ...newLists[card.listId],
        cardIds: newLists[card.listId].cardIds.filter((id) => id !== cardId),
      };

      return {
        cards: newCards,
        comments: newComments,
        lists: newLists,
      };
    });
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

  updateCommentText: (commentId, text) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [commentId]: {
          ...state.comments[commentId],
          text,
        },
      },
    })),

  deleteComment: (commentId) => {
    const { comments, cards } = get();
    const comment = comments[commentId];

    if (!comment) return;

    set(() => {
      const newComments = { ...comments };
      const newCards = { ...cards };

      delete newComments[commentId];

      newCards[comment.cardId] = {
        ...newCards[comment.cardId],
        commentIds: newCards[comment.cardId].commentIds.filter(
          (id) => id !== commentId
        ),
      };

      return {
        comments: newComments,
        cards: newCards,
      };
    });
  },

  /* ---------- Reordering ---------- */

  reorderLists: (boardId, fromIndex, toIndex) =>
    set((state) => {
      const board = state.boards[boardId];
      if (!board) return {};

      return {
        boards: {
          ...state.boards,
          [boardId]: {
            ...board,
            listIds: reorder(board.listIds, fromIndex, toIndex),
          },
        },
      };
    }),

  reorderCards: (listId, fromIndex, toIndex) =>
    set((state) => {
      const list = state.lists[listId];
      if (!list) return {};

      return {
        lists: {
          ...state.lists,
          [listId]: {
            ...list,
            cardIds: reorder(list.cardIds, fromIndex, toIndex),
          },
        },
      };
    }),

  moveCard: (cardId, fromListId, toListId, toIndex) =>
    set((state) => {
      const card = state.cards[cardId];
      if (!card) return {};

      const fromList = state.lists[fromListId];
      const toList = state.lists[toListId];

      if (!fromList || !toList) return {};

      const newFromIds = fromList.cardIds.filter((id) => id !== cardId);
      const newToIds = [...toList.cardIds];
      newToIds.splice(toIndex, 0, cardId);

      return {
        cards: {
          ...state.cards,
          [cardId]: {
            ...card,
            listId: toListId,
          },
        },
        lists: {
          ...state.lists,
          [fromListId]: {
            ...fromList,
            cardIds: newFromIds,
          },
          [toListId]: {
            ...toList,
            cardIds: newToIds,
          },
        },
      };
    }),

}));
