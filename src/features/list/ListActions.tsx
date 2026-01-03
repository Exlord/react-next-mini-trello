'use client';

import { useState } from 'react';
import { Dropdown } from '@/shared/components/dropdown/Dropdown';
import styles from './ListActions.module.scss';

type Mode = 'actions' | 'delete-list' | 'delete-cards';

interface Props {
  onDeleteList: () => void;
  onClearCards: () => void;
  onClose: () => void;
}

export function ListActions({
                              onDeleteList,
                              onClearCards,
                              onClose
                            }: Props) {
  const [mode, setMode] = useState<Mode>('actions');

  if (mode === 'delete-list') {
    return (
      <Dropdown title="Delete List?" onClose={onClose} onBack={() => setMode('actions')}>
        <div className={styles.dropdown__warning__wrapper}>
          <p className="dropdown__warning">
            All actions will be removed from the activity feed and you
            won’t be able to re-open the list. There is no undo.
          </p>

          <button
            className={styles.btn__danger}
            onClick={() => {
              onDeleteList();
              onClose();
            }}
          >
            Delete list
          </button>
        </div>
      </Dropdown>
    );
  }

  if (mode === 'delete-cards') {
    return (
      <Dropdown title="Delete All Cards?" onClose={onClose} onBack={() => setMode('actions')}>
        <div className={styles.dropdown__warning__wrapper}>
          <p className="dropdown__warning">
            This will remove all the cards in this list from the board.
          </p>

          <button
            className={styles.btn__danger}
            onClick={() => {
              onClearCards();
              onClose();
            }}
          >
            Delete all
          </button>
        </div>
      </Dropdown>
    );
  }

  return (
    <Dropdown title="Actions List" onClose={onClose}>
      <button onClick={() => setMode('delete-cards')} className={styles.dropdown__item}>
        Delete all cards
      </button>

      <button
        onClick={() => setMode('delete-list')}
        className={styles.dropdown__item}
      >
        Delete list
      </button>
    </Dropdown>
  );
}
