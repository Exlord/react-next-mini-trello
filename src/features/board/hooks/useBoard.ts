import { useBoardStore } from '@/stores/board.store';

export function useBoard(boardId: string) {
  const board = useBoardStore((state) => state.boards[boardId]);
  const listIds = useBoardStore((state) => state.boards[boardId]?.listIds);
  const listsMap = useBoardStore((state) => state.lists);

  const updateTitle = useBoardStore((state) => state.updateBoardTitle);
  const reorderLists = useBoardStore((state) => state.reorderLists);

  return {
    board,
    listIds,
    listsMap,
    updateTitle,
    reorderLists,
  };
}
