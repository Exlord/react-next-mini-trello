'use client';

import { Board } from '@/features/board/components/Board';
import { useBoardStore } from '@/stores';
// import { useBoardStore } from '@/stores';
// import { useShallow } from 'zustand/shallow';

export default function Dashboard() {
  const boardId = useBoardStore((s) => s.ensureBoardExists('My Board'));

  return <Board boardId={boardId} />;
}
