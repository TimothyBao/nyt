import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div>NYT</div>
      <ul className={styles.list}>
        <li>
          article 1
        </li>
        <li>
          article 2
        </li>
      </ul>
      <div>more articles</div>
    </div>
  );
}
