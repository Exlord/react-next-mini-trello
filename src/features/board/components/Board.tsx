'use client';

import { BoardHeader } from './BoardHeader';
import { BoardLists } from './BoardLists';
import { useBoard } from '../hooks/useBoard';
import styles from '../styles/Board.module.scss';
import type { ID } from '@/types/board.types';

interface BoardProps {
  boardId: ID;
}

export function Board({ boardId }: BoardProps) {
  const { board, updateTitle } = useBoard(boardId);

  if (!board) {
    return <div className={styles.empty}>Board not found</div>;
  }

  return (
    <section className={styles.board}>
      <BoardHeader
        title={board.title}
        onUpdateTitle={(title) => updateTitle(boardId, title)}
      />
      <BoardLists boardId={boardId} />
    </section>
  );
}
