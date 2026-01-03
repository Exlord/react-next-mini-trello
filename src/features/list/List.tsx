'use client';

import { useMemo } from 'react';
import { EditableText } from '@/shared/components/editable-text/EditableText';
import { Card } from '@/features/card/Card';
import styles from './List.module.scss';

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
  const cards = useMemo(() => {
    return cardIds.map((id) => cardsMap[id]);
  }, [cardIds, cardsMap]);

  return (
    <section className={styles.list}>
      {/* ===== Header ===== */}
      <header className={styles.header}>
        <EditableText
          value={title}
          as="h3"
          className={styles.title}
          inputClassName={styles.titleInput}
          onCommit={(value) => onUpdateTitle(id, value)}
        />
      </header>

      {/* ===== Cards ===== */}
      <div className={styles.cards}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            onUpdateTitle={onUpdateCardTitle}
          />
        ))}
      </div>

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
