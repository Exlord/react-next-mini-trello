'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './EditableText.module.scss';

interface EditableTextProps {
  value: string;
  onCommit: (value: string) => void;

  placeholder?: string;
  className?: string;

  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  inputClassName?: string;
  disabled?: boolean;
}

export function EditableText({
                               value,
                               onCommit,
                               placeholder = 'Untitled',
                               className = 'editable-text-el',
                               inputClassName,
                               as = 'span',
                               disabled = false,
                             }: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const inputRef = useRef<HTMLInputElement>(null);
  const Tag = as;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  useEffect(() => {
    if (!editing) {
      setDraft(value);
    }
  }, [value, editing]);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) {
      onCommit(trimmed);
    }
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (editing && !disabled) {
    return (
      <input
        ref={inputRef}
        value={draft}
        placeholder={placeholder}
        className={`${styles.input} ${inputClassName ?? ''}`}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') cancel();
        }}
      />
    );
  }

  return (
    <Tag
      className={`${styles.text} ${className ?? ''}`}
      onClick={() => !disabled && setEditing(true)}
    >
      {value || placeholder}
    </Tag>
  );
}
