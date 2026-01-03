'use client';

import { useMemo, useState } from 'react';
import { EditableText } from '@/shared/components/editable-text/EditableText';
import { Card } from '@/features/card/Card';
import styles from './List.module.scss';
import { useBoardStore } from '@/stores';
import { ListActions } from '@/features/list/ListActions';
import { ThreeDotsIcon } from '@/shared/icons/ThreeDotsIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { isInteractiveElement } from '@/shared/utils/drag';

interface CardModel {
  id: string;
  title: string;
}

interface ListProps {
  id: string;
  title: string;
  cardIds: string[];
  cardsMap: Record<string, CardModel>;

  onUpdateTitle: (listId: string, title: string) => void;
  onUpdateCardTitle: (cardId: string, title: string) => void;
  onAddCard: (listId: string, title: string) => string;
}

export function List({
                       id,
                       title,
                       cardIds,
                       cardsMap,
                       onUpdateTitle,
                       onUpdateCardTitle,
                       onAddCard
                     }: ListProps) {

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const [open, setOpen] = useState(false);
  const cards = useMemo(() => {
    return cardIds.map((id) => cardsMap[id]);
  }, [cardIds, cardsMap]);
  const deleteList = useBoardStore((state) => state.deleteList);
  const clearListCards = useBoardStore(
    (state) => state.clearListCards
  );
  const guardedListeners = {
    ...listeners,
    onPointerDown(e: React.PointerEvent) {
      if (isInteractiveElement(e.target as HTMLElement)) return;
      listeners?.onPointerDown?.(e);
    }
  };

  return (




    <section className={styles.list} ref={setNodeRef}
             style={style}>
      {/* ===== Header ===== */}
      <header className={styles.header}
              {...attributes}
              {...guardedListeners}
              aria-label="Drag list">
        <EditableText
          value={title}
          as="h3"
          className={styles.title}
          inputClassName={styles.titleInput}
          onCommit={(value) => onUpdateTitle(id, value)}
        />

        <div className={styles.list__menu__wrapper}>
          <button
            className="list__menu"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
          >
            <ThreeDotsIcon />
          </button>

          {open && (
            <ListActions
              onClose={() => setOpen(false)}
              onDeleteList={() => deleteList(id)}
              onClearCards={() => clearListCards(id)}
            />
          )}
        </div>
      </header>

      {/* ===== Cards ===== */}
      <SortableContext
        items={cardIds}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.cards}>
          {cards.map((card) => (
            <Card
              listId={id}
              key={card.id}
              id={card.id}
              title={card.title}
              onUpdateTitle={onUpdateCardTitle}
            />
          ))}
        </div>
      </SortableContext>


      {/* ===== Add Card ===== */}
      <footer className={styles.footer}>
        <button
          className={styles.addCard}
          onClick={() => onAddCard(id, 'New Card')}
        >
          + Add a card
        </button>
      </footer>
    </section>
  );
}
