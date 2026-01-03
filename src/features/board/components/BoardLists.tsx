'use client';

import { useMemo } from 'react';
import { List } from '@/features/list/List';
import styles from './BoardList.module.scss';

interface BoardListProps {
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

  return (
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
  );
}
