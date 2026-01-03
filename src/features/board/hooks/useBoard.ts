'use client';

import { useBoardStore } from '@/stores/board.store';

export function useBoard(boardId: string) {
  // ===== Stable state slices (NO derivation) =====
  const board = useBoardStore((state) => state.boards[boardId]);

  const listIds = useBoardStore(
    (state) => state.boards[boardId]?.listIds
  );

  const listsMap = useBoardStore((state) => state.lists);
  const cardsMap = useBoardStore((state) => state.cards);
  const commentsMap = useBoardStore((state) => state.comments);

  // ===== Actions (stable references) =====
  const updateBoardTitle = useBoardStore(
    (state) => state.updateBoardTitle
  );

  const updateListTitle = useBoardStore(
    (state) => state.updateListTitle
  );

  const updateCardTitle = useBoardStore(
    (state) => state.updateCardTitle
  );

  const updateCommentText = useBoardStore(
    (state) => state.updateCommentText
  );
  const deleteComment = useBoardStore(
    (state) => state.deleteComment
  );

  const reorderLists = useBoardStore(
    (state) => state.reorderLists
  );

  const reorderCards = useBoardStore(
    (state) => state.reorderCards
  );

  const addList = useBoardStore((state) => state.addList);
  const addCard = useBoardStore((state) => state.addCard);

  return {
    board,
    listIds,
    listsMap,
    cardsMap,
    commentsMap,

    updateBoardTitle,
    updateListTitle,
    updateCardTitle,
    updateCommentText,

    reorderLists,
    reorderCards,

    addList,
    addCard,

    deleteComment
  };
}
