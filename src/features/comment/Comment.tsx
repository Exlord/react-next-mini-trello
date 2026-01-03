import styles from './Comment.module.scss';
interface Props {
  text: string;
}

export function Comment({ text }: Props) {
  return <div className={styles.comment}>{text}</div>;
}
