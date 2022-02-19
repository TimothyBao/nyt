import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <p>Deployed on https://timothybao.github.io/nyt/</p>
      {props.children}
    </div>
  );
}

export default BasicLayout;
