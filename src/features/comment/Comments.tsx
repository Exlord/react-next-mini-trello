'use client';

import { useState } from 'react';
import { Comment } from './Comment';
import styles from './Comments.module.scss';

interface Props {
  comments: { id: string; text: string }[];
  onAdd: (text: string) => void;
}

export function Comments({ comments, onAdd }: Props) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (!value.trim()) return;

    onAdd(value.trim());
    setValue('');
  };

  return (
    <div className={styles.comments}>
      <div className={styles.comments__list}>
        {comments.map((c) => (
          <Comment key={c.id} text={c.text} />
        ))}
      </div>

      <textarea
        className={styles.comments__textarea}
        placeholder="Write a comment..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button className={styles.comments__add} onClick={handleAdd}>
        Add Comment
      </button>
    </div>
  );
}
