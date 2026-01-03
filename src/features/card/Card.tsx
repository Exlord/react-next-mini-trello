'use client';

import { EditableText } from '@/shared/components/editable-text/EditableText';
import styles from './Card.module.scss';
import { useMemo, useState } from 'react';
import { Modal } from '@/shared/components/modal/Modal';
import { useCard } from '@/features/card/hooks/useCard';
import { Comments } from '@/features/comment/Comments';
import { useBoardStore } from '@/stores';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ID } from '@/types/board.types';
import { isInteractiveElement } from '@/shared/utils/drag';

interface Comment {
  id: string;
  text: string;
}

interface CardProps {
  listId:ID;
  id: string;
  title: string;
  onUpdateTitle: (cardId: string, title: string) => void;
}

export function Card({
  listId,
                       id,
                       title,
                       onUpdateTitle
                     }: CardProps) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    data: { type: 'card',listId }
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const [open, setOpen] = useState(false);
  const { card, commentIds, addComment } = useCard(id);
  const commentsMap = useBoardStore((state) => state.comments);
  const comments = useMemo(
    () => commentIds.map((id) => commentsMap[id]),
    [commentIds, commentsMap]
  );
  const guardedListeners = {
    ...listeners,
    onPointerDown(e: React.PointerEvent) {
      if (isInteractiveElement(e.target as HTMLElement)) {
        return;
      }
      listeners?.onPointerDown?.(e);
    }
  };

  return (
    <div className={styles.card} ref={setNodeRef} style={style} {...attributes} {...guardedListeners}>
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
