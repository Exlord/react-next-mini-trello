'use client';

import styles from "@/app/page.module.scss";
import Dashboard from '@/features/dashboard/components/Dashboard';

export default function Home() {
  return (
    <div className={styles.root}>
      <Dashboard />
    </div>
  );
}
