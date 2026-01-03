import { useBoardStore } from '@/stores/board.store';

export function useCard(cardId: string) {
  const card = useBoardStore((state) => state.cards[cardId]);
  const commentIds = useBoardStore(
    (state) => state.cards[cardId].commentIds
  );

  const addComment = useBoardStore((state) => state.addComment);

  return {
    card,
    commentIds,
    addComment
  };
}
