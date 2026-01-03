'use client';

import { EditableText } from '@/shared/components/editable-text/EditableText';
import styles from './Card.module.scss';
import { useMemo, useState } from 'react';
import { Modal } from '@/shared/components/modal/Modal';
import { useCard } from '@/features/card/hooks/useCard';
import { Comments } from '@/features/comment/Comments';
import { useBoardStore } from '@/stores';

interface Comment {
  id: string;
  text: string;
}

interface CardProps {
  id: string;
  title: string;
  onUpdateTitle: (cardId: string, title: string) => void;
}

export function Card({
                       id,
                       title,
                       onUpdateTitle
                     }: CardProps) {

  const [open, setOpen] = useState(false);
  const { card, commentIds, addComment } = useCard(id);
  const commentsMap = useBoardStore((state) => state.comments);
  const comments = useMemo(
    () => commentIds.map((id) => commentsMap[id]),
    [commentIds, commentsMap]
  );

  return (
    <div className={styles.card}>
      <EditableText value={card.title} onCommit={(value: string) => onUpdateTitle(id, value)} />

      <div className={styles.commentBtnWrapper}>
        <button className={styles.commentsBtn} onClick={() => setOpen(true)}>
          Comments ({comments.length})
        </button>
      </div>

      {open && (
        <Modal
          title={`Comments for "${card.title}"`}
          onClose={() => setOpen(false)}
        >
          <Comments
            comments={comments}
            onAdd={(text) => addComment(id, text)}
          />
        </Modal>
      )}
    </div>
  );
}
