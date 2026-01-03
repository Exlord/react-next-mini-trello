'use client';

import { EditableText } from '@/shared/components/editable-text/EditableText';
import styles from './Board.module.scss';

interface Props {
  title: string;
  onUpdateTitle: (title: string) => void;
}

export function BoardHeader({ title, onUpdateTitle }: Props) {
  return (
    <header className={styles.header}>
      <EditableText
        value={title}
        as="h1"
        className={styles.title}
        inputClassName={styles.titleInput}
        onCommit={onUpdateTitle}
      />
    </header>
  );
}
