'use client';

import { BoardHeader } from './BoardHeader';
import { BoardLists } from './BoardLists';
import { useBoard } from '../hooks/useBoard';
import styles from './Board.module.scss';
import type { ID } from '@/types/board.types';

interface BoardProps {
  boardId: ID;
}

export function Board({ boardId }: BoardProps) {
  const {
    board,
    listIds,
    listsMap,
    cardsMap,
    updateBoardTitle,
    updateListTitle,
    updateCardTitle,
    addList,
    addCard
  } = useBoard(boardId);

  if (!board) {
    return <div className={styles.empty}>Board not found</div>;
  }

  return (
    <section className={styles.board}>
      <BoardHeader
        title={board.title}
        onUpdateTitle={(title) => updateBoardTitle(boardId, title)}
      />
      <BoardLists
        boardId={boardId}
        listIds={listIds}
        listsMap={listsMap}
        cardsMap={cardsMap}
        onUpdateListTitle={updateListTitle}
        onUpdateCardTitle={updateCardTitle}
        onAddNewList={() => addList(board.id, 'New List')}
        onAddCard={addCard}
      />

    </section>
  );
}
