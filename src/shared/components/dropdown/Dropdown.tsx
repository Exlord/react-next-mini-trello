'use client';

import { ReactNode } from 'react';
import styles from './Dropdown.module.scss';
import { BackArrowIcon } from '@/shared/icons/BackArrowIcon';
import { CloseIcon } from '@/shared/icons/CloseIcon';

interface Props {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  children: ReactNode;
}

export function Dropdown({ title, onClose, onBack, children }: Props) {
  return (
    <div className={styles.dropdown}>
      <header className={styles.dropdown__header}>
        {onBack && (
          <button
            className="dropdown__back"
            onClick={onBack}
          >
            <BackArrowIcon />
          </button>
        )}
        <span>{title}</span>
        <button onClick={onClose}><CloseIcon /></button>
      </header>

      <div className={styles.dropdown__content}>{children}</div>
    </div>
  );
}
