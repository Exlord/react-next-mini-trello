'use client';

import { useMemo } from 'react';
import { List } from '@/features/list/List';
import styles from './BoardList.module.scss';
import {
  DndContext,
  closestCenter,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import { useBoardStore } from '@/stores';

interface BoardListProps {
  boardId:string;
  listIds: string[];
  listsMap: Record<
    string,
    {
      id: string;
      title: string;
      cardIds: string[];
    }
  >;

  cardsMap: Record<
    string,
    {
      id: string;
      title: string;
    }
  >;

  onUpdateListTitle: (listId: string, title: string) => void;
  onUpdateCardTitle: (cardId: string, title: string) => void;
  onAddNewList: () => void;
  onAddCard: (listId: string, title: string) => string;
}

export function BoardLists({
                             boardId,
                             listIds,
                             listsMap,
                             cardsMap,
                             onUpdateListTitle,
                             onUpdateCardTitle,
                             onAddNewList,
                             onAddCard
                           }: BoardListProps) {
  const lists = useMemo(() => {
    return listIds.map((id) => listsMap[id]);
  }, [listIds, listsMap]);
  const reorderLists = useBoardStore(
    (state) => state.reorderLists
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = listIds.indexOf(active.id as string);
    const newIndex = listIds.indexOf(over.id as string);

    reorderLists(
      boardId,
      arrayMove(listIds, oldIndex, newIndex)
    );
  };

  return (

    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={listIds}
        strategy={horizontalListSortingStrategy}
      >
        <div className={styles.boardLists}>
          {lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              title={list.title}
              cardIds={list.cardIds}
              cardsMap={cardsMap}
              onUpdateTitle={onUpdateListTitle}
              onUpdateCardTitle={onUpdateCardTitle}
              onAddCard={onAddCard}
            />
          ))}

          <section className={styles.addListBtnWrapper}>
            <button
              className={styles.addList}
              onClick={onAddNewList}
            >
              + Add another list
            </button>
          </section>
        </div>
      </SortableContext>
    </DndContext>

  );
}
