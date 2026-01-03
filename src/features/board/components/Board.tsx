'use client';

import { BoardHeader } from './BoardHeader';
import { BoardLists } from './BoardLists';
import { useBoard } from '../hooks/useBoard';
import styles from './Board.module.scss';
import type { ID } from '@/types/board.types';
import {
  DndContext,
  DragEndEvent,
  closestCenter, useSensors, useSensor, PointerSensor
} from '@dnd-kit/core';
import { useBoardStore } from '@/stores';

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
  const {
    reorderCards,
    moveCardBetweenLists
  } = useBoardStore();

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const activeListId = active.data.current?.listId;
    const overListId = over.data.current?.listId;

    if (!activeListId || !overListId) return;

    const sourceList = useBoardStore
      .getState()
      .lists[activeListId];

    const targetList = useBoardStore
      .getState()
      .lists[overListId];

    // @ts-ignore
    const activeIndex = sourceList.cardIds.indexOf(active.id);
    // @ts-ignore
    const overIndex = targetList.cardIds.indexOf(over.id);

    if (activeListId === overListId) {
      reorderCards(activeListId, activeIndex, overIndex);
    } else {
      moveCardBetweenLists(
        activeListId,
        overListId,
        activeIndex,
        overIndex
      );
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6 // pixels before drag activates
      }
    })
  );


  if (!board) {
    return <div className={styles.empty}>Board not found</div>;
  }

  return (
    <section className={styles.board}>
      <BoardHeader
        title={board.title}
        onUpdateTitle={(title) => updateBoardTitle(boardId, title)}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
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

      </DndContext>


    </section>
  );
}
