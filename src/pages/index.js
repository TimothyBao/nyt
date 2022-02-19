import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div>nyt</div>
      <ul className={styles.list}>
        <li>Article 1</li>
        <li>Article 2</li>
      </ul>
      <div>MoreArticles</div>
    </div>
  );
}
